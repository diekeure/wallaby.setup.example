import { JoinPipe } from './join.pipe';

describe('JoinPipe', () => {
  let input;

  beforeEach(() => {
    input = [
      {
        prop: 'a'
      },
      {
        prop: 'b'
      },
      {
        prop: 'c'
      }
    ];
  });

  it('can be created', () => {
    const pipe = new JoinPipe();
    expect(pipe).toBeTruthy();
  });

  it('succesfully transforms using default delimiter', () => {
    const pipe = new JoinPipe();

    expect(pipe.transform(input, 'prop')).toBe('a, b, c');
  });

  it('succesfully transforms using custom delimiter', () => {
    const pipe = new JoinPipe();

    expect(pipe.transform(input, 'prop', ' | ')).toBe('a | b | c');
  });
});
