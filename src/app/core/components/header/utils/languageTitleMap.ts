import { Lang } from '../../../services/lang.service';

export interface LangTitleItem {
  short: string;
  long: string;
}

type LangTitleMap = {
  [key in Lang]: LangTitleItem;
};

export const langTitleMap: LangTitleMap = {
  en: {
    short: 'En',
    long: 'English',
  },
  ru: {
    short: 'Ru',
    long: 'Русский',
  },
};
