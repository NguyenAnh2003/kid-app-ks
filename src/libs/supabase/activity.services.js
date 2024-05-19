import { appTables } from './supabase';
import { supabase } from './supabase';

const activitiesTable = supabase.from(appTables.ACTIVITIES);
export const createActivity = async (childId, appName, packageName, timeUsed, dateUsed) => {
  try {
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

    // Convert usage time (seconds) to a timestamp

    const { data, error, status } = await activitiesTable.insert({
      childId,
      appName,
      packageName,
      timeUsed: validTimeUsed, // Converted to timestamp
      dateUsed: validDateUsed,
    });

    if (error) {
      console.error('Error inserting activity:', error.message);
      return null;
    }

    if (status !== 200) {
      console.warn('Unexpected status code:', status);
    }

    console.log('Insert successful:', data);
    return data;
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
export const updateActivity = async(id, timeUsed) => {
  try {
    const { data, status } = await activitiesTable.update({ timeUsed }).eq('id', id);
    console.log("update oke")
    return data;
  } catch (error) {
    console.error('Error updating activity:', error.message);
  }
};

