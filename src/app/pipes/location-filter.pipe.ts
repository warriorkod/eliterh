import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../models/post';

@Pipe({
  name: 'locationFilter'
})
export class LocationFilterPipe implements PipeTransform {

  transform(items: Post[], region: string): Post[] {
    if(!items) return [];
    if(!region) return items;
    return items.filter ((it:Post) => {
        return (it.lieu === region);
    });
  }

}
