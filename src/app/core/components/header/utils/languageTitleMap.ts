import { ILang } from '../../../services/lang.service';

export interface ILangTitleItem {
  short: string;
  long: string;
}

type ILangTitleMap = {
  [key in ILang]: ILangTitleItem;
};

export const langTitleMap: ILangTitleMap = {
  en: {
    short: 'En',
    long: 'English',
  },
  ru: {
    short: 'Ru',
    long: 'Русский',
  },
};
