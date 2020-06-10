import {Pipe, PipeTransform} from '@angular/core';
import {Post} from '../models/post';

@Pipe({
  name: 'secteurFilter'
})
export class SecteurFilterPipe implements PipeTransform {

  transform(items: Post[], secteur: string): Post[] {
    if (!items) {
      return [];
    }
    if (!secteur) {
      return items;
    }
    return items.filter((it: Post) => {
      return (it.secteur === secteur);
    });
  }

}
