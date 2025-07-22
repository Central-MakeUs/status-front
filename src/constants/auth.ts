export const URL_SCHEME = import.meta.env.DEV
  ? 'exp://127.0.0.1:8081/--/'
  : 'statusapp://';

export const GOOGLE_ENDPOINT = 'https://accounts.google.com/o/oauth2/v2/auth';
export const GOOGLE_SCOPES = {
  EMAIL: 'https://www.googleapis.com/auth/userinfo.email',
  PROFILE: 'https://www.googleapis.com/auth/userinfo.profile',
} as const;
export const GOOGLE_RESPONSE_TYPE = 'code';
export const GOOGLE_REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
