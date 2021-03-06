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
      const date = new Date(it.dateVal).toDateString();
      const dateNow = new Date().toDateString();
      switch (type) {
        case 'en-cours':
          return new Date(date).getTime() >= new Date(dateNow).getTime() &&
            it.structureName.toLowerCase().includes(structure ? structure : '');
          break;
        case 'archives':
          return new Date(date).getTime() < new Date(dateNow).getTime() &&
            it.structureName.toLowerCase().includes(structure ? structure : '');
          break;
        default:
          return it.structureName.toLowerCase().includes(structure ? structure : '');
          break;
      }
    });
  }

}
