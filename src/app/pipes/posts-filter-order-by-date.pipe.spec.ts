import { PostsFilterOrderByDatePipe } from './posts-filter-order-by-date.pipe';

describe('PostsFilterOrderByDatePipe', () => {
  it('create an instance', () => {
    const pipe = new PostsFilterOrderByDatePipe();
    expect(pipe).toBeTruthy();
  });
});
