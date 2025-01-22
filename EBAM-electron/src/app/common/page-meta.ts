import { MetaDefinition } from '@angular/platform-browser';

export type ExtendedMetaDefinition = { shouldNotTranslate?: boolean} &  MetaDefinition;

export interface PageMeta {
  title?: {
    value: string,
    shouldNotTranslate?: boolean
  };
  tags?: ExtendedMetaDefinition[];
}
