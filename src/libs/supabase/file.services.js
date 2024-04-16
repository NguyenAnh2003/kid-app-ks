import { appStorage } from './supabase';

export const uploadImage = async (file) => {
  /** 
   * @param file - used for uploading file to bucket
   */
  try {
    const { data } = await appStorage.upload('public', file);
    if (data) return data;
  } catch (error) {
    console.log(error.message);
  }
};
