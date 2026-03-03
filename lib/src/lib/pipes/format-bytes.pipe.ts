import { Pipe, PipeTransform } from '@angular/core';
import { formatBytes } from '../utils/image.utils';

@Pipe({
  name: 'formatBytes',
})
export class FormatBytesPipe implements PipeTransform {
  transform(value: number | undefined, decimals = 2): unknown {
    return formatBytes(value ?? 0, decimals);
  }
}
