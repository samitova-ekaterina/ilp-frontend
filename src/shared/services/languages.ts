import { useQuery } from '@tanstack/react-query';
import type { FindAllResponse, LanguageResponse } from '../models/api';
import type { Language } from '../models/language';
import { request } from './request';

function toLanguage(item: LanguageResponse): Language {
  // The API description does not mark these fields as required yet, so their presence is checked here.
  if (item.code === undefined || item.name === undefined) {
    throw new Error('The server sent a language without its code or its name.');
  }
  return { code: item.code, name: item.name };
}

async function fetchLanguages(): Promise<Language[]> {
  const items = await request<FindAllResponse>('/api/v1/languages');
  return items.map(toLanguage);
}

export function useLanguages() {
  return useQuery({
    queryKey: ['languages'],
    queryFn: fetchLanguages,
    staleTime: Infinity,
    throwOnError: false,
  });
}
