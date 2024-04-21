import { supabase } from './supabase';

const profileTable = supabase.auth;

const userTable = supabase.from('profiles');

export const getCurrentUser = async (userId) => {
  try {
    const { data, status } = await userTable.select('*').eq('id', userId);
    if (status === 200) return data;
  } catch (error) {
    console.log('error', error.message);
  }
};

export const updateUserData = async (
  name,
  avatarUrl,
  gmail,
  country,
  phone
) => {
  try {
    /**
     * @param name
     * @param avatarUrl
     * @param gmail
     * @param country
     * @param phone
     */
    const { data } = await profileTable.updateUser({
      username: name,
      avatarUrl: avatarUrl,
      gmail: gmail,
      country: country,
      phone: phone,
    });

    return data ? data : null;
  } catch (error) {
    console.log(error.message);
  }
};
