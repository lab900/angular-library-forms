import { Lab900FormField } from './lab900-form-field.type';

export interface Lab900FormConfig<
  R = any,
  T extends string | number = string,
  DATE = Date
> {
  title?: string;
  fields: Lab900FormField<R, T, DATE>[];
  readonly?: boolean;
}
