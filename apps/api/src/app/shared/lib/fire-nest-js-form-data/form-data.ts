import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import { FireFormDataInterceptor } from './form-data.interceptor';

export const FORM_DATA_REQUEST_METADATA_KEY: Symbol = Symbol();

export function FormDataRequest() {
  return applyDecorators(
    SetMetadata(FORM_DATA_REQUEST_METADATA_KEY, undefined),
    UseInterceptors(FireFormDataInterceptor),
  );
}