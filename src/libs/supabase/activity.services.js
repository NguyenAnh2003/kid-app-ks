import { appTables } from './supabase';
import { supabase } from './supabase';

const activitiesTable = supabase.from(appTables.ACTIVITIES);
export const createActivity = async (childId, appName, packageName, timeUsed, dateUsed) => {
  try {
    console.log('Processing activity:', {
      childId,
      appName,
      packageName,
      timeUsed,
      dateUsed,
    });

    // Ensure timeUsed is a valid number
    const validTimeUsed = Number(timeUsed);
    if (isNaN(validTimeUsed)) {
      console.error('Invalid timeUsed:', timeUsed);
      return null;
    }

    // Ensure dateUsed is in the correct format
    const validDateUsed = new Date(dateUsed).toISOString().split('T')[0];
    if (!validDateUsed) {
      console.error('Invalid dateUsed:', dateUsed);
      return null;
    }

    // Check if the activity already exists
    const { data: existingData, error: selectError } = await activitiesTable
      .select('id, timeUsed')
      .eq('childId', childId)
      .eq('appName', appName)
      .single();

    if (selectError && selectError.code !== 'PGRST116') { // PGRST116 means no rows returned
      console.error('Error fetching existing activity:', selectError.message);
      return null;
    }

    if (existingData) {
      // If the activity exists, update the timeUsed
      const updatedTimeUsed = validTimeUsed;

      const { data: updateData, error: updateError, status: updateStatus } = await activitiesTable
        .update({ timeUsed: updatedTimeUsed })
        .eq('id', existingData.id);

      if (updateError) {
        console.error('Error updating activity:', updateError.message);
        return null;
      }

      console.log('Update successful:', updateData);
      return updateData;
    } else {
      // If the activity does not exist, insert a new record
      const { data: insertData, error: insertError, status: insertStatus } = await activitiesTable.insert({
        childId,
        appName,
        packageName,
        timeUsed: validTimeUsed,
        dateUsed: validDateUsed,
      });

      if (insertError) {
        console.error('Error inserting activity:', insertError.message);
        return null;
      }

      console.log('Insert successful:', insertData);
      return insertData;
    }
  } catch (error) {
    console.error('Unexpected error:', error.message);
    return null;
  }
};
export const getAllActivities = async (childId) => {
  /** get all acts with childId
   * @param childId
   */
  try {
    const { data, status } = await activitiesTable
      .select()
      .eq('childId', childId);

    if (status === 200) return data;
  } catch (error) {
    console.log(error.message);
  }
};
