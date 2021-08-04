import { FormDataInterceptorConfig } from 'nestjs-form-data/dist/interfaces';
import { FormReader } from 'nestjs-form-data/dist/classes/FormReader';

export class FireFormReader extends FormReader {
  constructor(protected req: any, protected config: FormDataInterceptorConfig) {
    super(req, config);
    req?.rawBody && this.busboy.end(req.rawBody);
  }
}