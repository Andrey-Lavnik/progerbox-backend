export enum LanguageTag {
  RU = 'ru',
  EN = 'en',
}

export enum UserRole {
  REGULAR = 'regular',
  ADMIN = 'admin',
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}
