const isProduction = process.env.NODE_ENV === "production";

export const apiUrl = isProduction
  ? process.env.API_URL_PROD
  : process.env.API_URL_LOCAL;
