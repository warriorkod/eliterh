import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../models/post';

@Pipe({
  name: 'postsFilterByTittre'
})
export class PostsFilterByTittrePipe implements PipeTransform {

  transform(items: [], structure: string): any {
    if (!items) { return []; }
    if (!structure) { return items; }
    structure = structure.toLowerCase();
    return items.filter ((it: Post) => {
        return (it.structure_name.toLowerCase().includes(structure));
    });
  }

}
