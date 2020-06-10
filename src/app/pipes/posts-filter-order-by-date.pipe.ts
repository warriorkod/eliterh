import {Pipe, PipeTransform} from '@angular/core';
import {Post} from '../models/post';

@Pipe({
  name: 'postsFilterOrderByDate'
})
export class PostsFilterOrderByDatePipe implements PipeTransform {

  transform(item: Post[]): Post[] {
    return item.sort((a: Post, b: Post) => {
      return new Date(b.dateCreate).getTime() - new Date(a.dateCreate).getTime();
    });
  }

}
