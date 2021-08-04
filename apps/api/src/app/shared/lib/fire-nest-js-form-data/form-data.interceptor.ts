import { CallHandler, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { FormDataInterceptor } from 'nestjs-form-data/dist/interceptors/FormData.interceptor';
import { FormDataInterceptorConfig } from 'nestjs-form-data/dist/interfaces';
import { checkConfig } from 'nestjs-form-data/dist/helpers/check-config';
import { GLOBAL_CONFIG_INJECT_TOKEN } from 'nestjs-form-data/dist/config/global-config-inject-token.config';
import { is } from 'type-is';
import { tap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { FORM_DATA_REQUEST_METADATA_KEY } from 'nestjs-form-data';
import { FireFormReader } from './form-reader';

@Injectable()
export class FireFormDataInterceptor extends FormDataInterceptor {

  constructor(
    @Inject(GLOBAL_CONFIG_INJECT_TOKEN) private _globalConfig: FormDataInterceptorConfig
  ) {
    super(_globalConfig)
  }

  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    /** if the request is not multipart, skip **/
    if (!is(req, ['multipart'])) return next.handle();

    /** merge global config with method level config **/
    const config: FormDataInterceptorConfig = checkConfig(
      this.reflector.get(FORM_DATA_REQUEST_METADATA_KEY, context.getHandler()) || {},
      this._globalConfig,
    );

    const formReader = new FireFormReader(req, config);

    try {
      req.body = await formReader.handle();
      return next.handle().pipe(tap(res => {
        if (config.autoDeleteFile)
          formReader.deleteFiles();
      }));
    } catch (err) {
      if (config.autoDeleteFile)
        formReader.deleteFiles();

      if (err.status && err.response) {
        res.status(err.status);
        return of(err.response);
      }

      return throwError(err);
    }
  }
}