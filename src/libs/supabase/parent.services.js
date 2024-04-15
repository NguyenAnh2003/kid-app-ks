import { supabase } from './supabase';

const profileTable = supabase.auth;

export const getCurrentUser = async () => {
  try {
    const {
      data: { user },
    } = await profileTable.getUser();
    return user ? user : null;
  } catch (error) {
    console.log(error.message);
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
