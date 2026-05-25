import { supabase } from "./supabaseClient";

const TOKEN_STORAGE_KEY = "auth_token";

export function getAuthToken() {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function setAuthToken(token: string) {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

export function clearAuthToken() {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

type AuthResponse = {
  success: boolean;
  message?: string;
  token?: string | null;
  data?: unknown;
};

export async function signup(payload: {
  fullName: string;
  email: string;
  password: string;
  phoneNumber?: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      data: {
        full_name: payload.fullName,
        phone_number: payload.phoneNumber,
      },
    },
  });

  if (error) throw new Error(error.message);

  const token = data.session?.access_token || null;
  return { success: true, token, data };
}

export async function login(payload: { email: string; password: string }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: payload.email,
    password: payload.password,
  });

  if (error) throw new Error(error.message);

  const token = data.session?.access_token || null;
  return { success: true, token, data };
}

export function extractToken(response: AuthResponse) {
  return response.token || null;
}
