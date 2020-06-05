import {Pipe, PipeTransform} from '@angular/core';
import {Post} from '../models/post';

@Pipe({
  name: 'postsFilterByType'
})
export class PostsFilterByTypePipe implements PipeTransform {

  transform(items: Post[], type: string, structure?: string): Post[] {
    if (!items) {
      return [];
    }
    if (!type && !structure) {
      return items;
    }
    return items.filter((it: Post) => {
      const date = new Date(it.date_val).toDateString();
      const dateNow = new Date().toDateString();
      console.log(new Date(date).getTime());
      console.log(new Date(dateNow).getTime());
      switch (type) {
        case 'en-cours':
          return new Date(date).getTime() >= new Date(dateNow).getTime() &&
            it.structure_name.toLowerCase().includes(structure ? structure : '');
          break;
        case 'archives':
          return new Date(date).getTime() < new Date(dateNow).getTime() &&
            it.structure_name.toLowerCase().includes(structure ? structure : '');
          break;
        default:
          return it.structure_name.toLowerCase().includes(structure ? structure : '');
          break;
      }
    });
  }

}
