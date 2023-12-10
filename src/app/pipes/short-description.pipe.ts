import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortDescription',
  standalone: true
})
export class ShortDescriptionPipe implements PipeTransform {

  transform(description: string): string {
    return description.length > 25 ? `${description.slice(0,25)}...` : description
  }

}
