import { TruncateStringPipe } from './truncate-string.pipe';

describe('TruncateStringPipe', () => {
  it('create an instance', () => {
    const pipe = new TruncateStringPipe();
    expect(pipe).toBeTruthy();
  });

  it('should limit text length to three characters', () => {
    const date: Date = new Date();
    const pipe = new TruncateStringPipe();
    const output = pipe.transform(
      'this string will be truncated to three chars',
      '…',
      3
    );
    expect(output).toBe('thi…');
  });

  it('should not limit text length', () => {
    const date: Date = new Date();
    const pipe = new TruncateStringPipe();
    const output = pipe.transform('this string will not be truncated', '...');
    expect(output).toBe('this string will not be truncated');
  });

  it('should limit text length to 5 and place a single . character', () => {
    const date: Date = new Date();
    const pipe = new TruncateStringPipe();
    const output = pipe.transform('this string will not be truncated', '.', 5);
    expect(output).toBe('this .');
  });
});
