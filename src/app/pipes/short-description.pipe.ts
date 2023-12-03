import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortDescription',
  standalone: true
})
export class ShortDescriptionPipe implements PipeTransform {

  transform(description: string): string {
    return description.length > 30 ? `${description.slice(0,30)}...` : description
  }

}
