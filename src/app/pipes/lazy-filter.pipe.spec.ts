import {LazyFilterPipe} from './lazy-filter.pipe';
import {SessionService} from '../services';
import {inject} from '@angular/core/testing';

describe('LazyFilterPipe', () => {
  it('create an instance', () => {
    inject([SessionService], (apiService: SessionService) => {
      const pipe = new LazyFilterPipe(apiService);
      expect(pipe).toBeTruthy();
    });
  });
});
