import { PostsFilterByTypePipe } from './posts-filter-by-type.pipe';

describe('PostsFilterByTypePipe', () => {
  it('create an instance', () => {
    const pipe = new PostsFilterByTypePipe();
    expect(pipe).toBeTruthy();
  });
});
