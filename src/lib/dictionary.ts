export type Locale = 'kk' | 'ru';

const dictionaries = {
  kk: () => import('@/dictionaries/kk.json').then((module) => module.default),
  ru: () => import('@/dictionaries/ru.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
