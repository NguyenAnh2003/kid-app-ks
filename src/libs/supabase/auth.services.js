import { supabase } from './supabase';

export const loginEmail = async (email, password) => {
  /** login with gmail
   * @param gmail
   * @param password
   */
  try {
    const { data } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    /** return session (access token, refresh token) */
    return data ? data : null;
  } catch (error) {
    console.log(error);
  }
};

export const registerEmail = async (email, password) => {
  /** register
   * @param email
   * @param password
   */
  try {
    const { data } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: 'https://example.com/welcome',
      },
    });

    /** return session && user */
    return data ? data : null;
  } catch (error) {
    console.log(error.message);
  }
};