import { supabase } from './supabase';

export const loginEmail = async (email, password) => {
  /** login with gmail
   * @param gmail
   * @param password
   */
  try {
    const {
      error,
      data: { session, user },
    } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    /** return session (access token, refresh token) */
    if (session && user) {
      const responseData = { session, user };
      return responseData;
    }
  } catch (error) {
    console.log(error);
  }
};

/** register */

/** logout */
