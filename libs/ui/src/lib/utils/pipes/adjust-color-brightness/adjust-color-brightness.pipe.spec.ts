import { AdjustColorBrightnessPipe } from './adjust-color-brightness.pipe';

describe('AdjustColorBrightnessPipe', () => {
  it('create an instance', () => {
    const pipe = new AdjustColorBrightnessPipe();
    expect(pipe).toBeTruthy();
  });

  it('adds white', () => {
    const pipe = new AdjustColorBrightnessPipe();
    const color: string = pipe.transform('FF0066', 20);
    expect(color).toBe('FF147A');
  });

  it('adds black', () => {
    const pipe = new AdjustColorBrightnessPipe();
    const color: string = pipe.transform('FF147A', -20);
    expect(color).toBe('EB0066');
  });

  it('returns with pound', () => {
    const pipe = new AdjustColorBrightnessPipe();
    const color: string = pipe.transform('#FF147A', -20);
    expect(color).toBe('#EB0066');
  });
});
