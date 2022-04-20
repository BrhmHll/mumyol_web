import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutString'
})
export class CutStringPipe implements PipeTransform {

  transform(value: string, maxLen: number): string {
    return value.substring(0, maxLen) + (value.length > maxLen ? "..." : "");
  }

}
