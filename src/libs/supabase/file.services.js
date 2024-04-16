import { appStorage } from './supabase';

export const uploadImage = async (file) => {
  try {
    const { data } = await appStorage.upload('public', file);
    if (data) return data;
  } catch (error) {
    console.log(error.message);
  }
};
