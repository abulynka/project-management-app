type ILocale = 'en' | 'ru';

type ILocales = ['en', 'ru'];

const LOCALES: ILocales = ['en', 'ru'];

interface IEnvironment {
  production: boolean;
  locales: ILocales;
  defaultLocale: ILocale;
}

export const environment: IEnvironment = {
  production: true,
  locales: LOCALES,
  defaultLocale: 'en',
};

export const apiRoot: string = 'http://localhost:4200/api';
export const TOKEN_KEY: string = 'auth-token';
export const USER_KEY: string = 'auth-user';
