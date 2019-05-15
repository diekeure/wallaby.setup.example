import { PersonInitialsPipe } from './person-initials.pipe';

describe('PersonInitialsPipe', () => {
  it('create an instance', () => {
    const pipe = new PersonInitialsPipe();
    expect(pipe).toBeTruthy();
  });
});
