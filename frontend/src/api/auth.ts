import { apiRequest } from "./http";

const TOKEN_STORAGE_KEY = "auth_token";
const USER_DATA_STORAGE_KEY = "auth_user_data";

export type AuthUser = {
  id?: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  role?: string;
};

export function getAuthToken() {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function setAuthToken(token: string) {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

export function clearAuthToken() {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

export function getUserData(): AuthUser | null {
  const stored = localStorage.getItem(USER_DATA_STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
}

export function setUserData(user: AuthUser) {
  localStorage.setItem(USER_DATA_STORAGE_KEY, JSON.stringify(user));
}

export function clearUserData() {
  localStorage.removeItem(USER_DATA_STORAGE_KEY);
}

type AuthUserData = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  role?: string;
  token?: string;
};

type AuthResponse = {
  success: boolean;
  message?: string;
  token?: string | null; // sometimes top-level
  data: AuthUserData;
};

export async function signup(payload: {
  fullName: string;
  email: string;
  password: string;
  phoneNumber?: string;
}) {
  return apiRequest<AuthResponse>("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({
      fullName: payload.fullName,
      email: payload.email,
      password: payload.password,
      confirmPassword: payload.password,
      phoneNumber: payload.phoneNumber,
    }),
  });
}

export async function login(payload: { email: string; password: string }) {
  return apiRequest<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function extractToken(response: AuthResponse) {
  return response.token || response.data.token || null;
}

export function extractUserData(response: AuthResponse): AuthUser | null {
  const { data } = response;
  
  // Extract user data from nested data object
  const user: AuthUser = {
    id: data.id,
    fullName: data.fullName,
    email: data.email,
    phoneNumber: data.phoneNumber,
    role: data.role,
  };

  // Only return if we have at least fullName and email
  if (user.fullName && user.email) {
    return user;
  }
  
  return null;
}
