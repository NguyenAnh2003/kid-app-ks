import { appTables } from './supabase';
import { supabase } from './supabase';

const notifyTable = supabase.from(appTables.NOTIFICATIONS);

export const createNotification = async (
  parentId,
  childId,
  description,
  date
) => {
  /** create notification */
  try {
    /**
     * @param parentId
     * @param childId
     * @param description
     * @param date
     */
    const { data, status } = await notifyTable.insert({
      parentId,
      childId,
      description,
      date,
    });
    if (status === 200) return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllNotfications = async (parentId) => {
  /** get notification */
  try {
    /** @param parentId - get all notifications with parentId*/
    const { data, status } = await notifyTable
      .select()
      .eq('parentId', parentId);
    if (status === 200) return data;
  } catch (error) {
    console.log(error.message);
  }
};
