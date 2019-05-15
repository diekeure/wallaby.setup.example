import { RemovePrefixStringPipe } from './remove-prefix-string.pipe';

describe('RemovePrefixString', () => {
  it('create an instance', () => {
    const pipe = new RemovePrefixStringPipe();
    expect(pipe).toBeTruthy();
  });

  it("doesn't change the string", () => {
    const pipe = new RemovePrefixStringPipe();
    const color: string = pipe.transform('no-prefix-present', 'polpo-');
    expect(color).toBe('no-prefix-present');
  });

  it("doesn't change the string when prefix in the middle", () => {
    const pipe = new RemovePrefixStringPipe();
    const color: string = pipe.transform('no-polpo-prefix-at-start', 'polpo-');
    expect(color).toBe('no-polpo-prefix-at-start');
  });

  it('replaces prefix', () => {
    const pipe = new RemovePrefixStringPipe();
    const color: string = pipe.transform('polpo-yes-prefix', 'polpo-');
    expect(color).toBe('yes-prefix');
  });
});
