import { supabase } from './supabase';

export const loginEmail = async (email, password) => {
  /** login with gmail
   * @param gmail
   * @param password
   */
  try {
    const { error, data } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    /** return session (access token, refresh token) */
    return data ? data : null;
  } catch (error) {
    console.log(error);
  }
};

/** register */

/** logout */
