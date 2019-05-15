import { HumanDateTimePipe } from './human-date-time.pipe';

describe('HumanDateTimePipe', () => {
  const baseDateTime = 1540375469127;
  const baseDate = new Date(baseDateTime);

  it('create an instance', () => {
    const pipe = new HumanDateTimePipe();
    expect(pipe).toBeTruthy();
  });

  it('should show the text for less than a minute', () => {
    const date: Date = new Date();
    const pipe = new HumanDateTimePipe();
    expect(pipe.transform(date)).toBe(HumanDateTimePipe.just);
  });

  it('should show the text for 4 minutes ago', () => {
    const minutes = 4;
    const date: Date = new Date();
    date.setMilliseconds(date.getMilliseconds() - 1000 * 60 * minutes);
    const pipe = new HumanDateTimePipe();
    expect(pipe.transform(date)).toBe(
      minutes.toString() + ' ' + HumanDateTimePipe.minutes
    );
  });

  it('should show the text for 1 minute ago', () => {
    const minutes = 1;
    const date: Date = new Date();
    date.setMilliseconds(date.getMilliseconds() - 1000 * 60 * minutes);
    const pipe = new HumanDateTimePipe();
    expect(pipe.transform(date)).toBe(
      minutes.toString() + ' ' + HumanDateTimePipe.singleMinute
    );
  });

  it('should show the text for 4 hours ago', () => {
    const hours = 4;
    const date: Date = new Date();
    date.setMilliseconds(date.getMilliseconds() - 1000 * 60 * 60 * hours);
    const pipe = new HumanDateTimePipe();
    expect(pipe.transform(date)).toBe(
      hours.toString() + ' ' + HumanDateTimePipe.hours
    );
  });

  it('should show the text for 1 hour ago', () => {
    const hours = 1;
    const date: Date = new Date();
    date.setMilliseconds(date.getMilliseconds() - 1000 * 60 * 60 * hours);
    const pipe = new HumanDateTimePipe();
    expect(pipe.transform(date)).toBe(
      hours.toString() + ' ' + HumanDateTimePipe.singleHour
    );
  });

  it('should show the text for 23 hours ago', () => {
    const hours = 23;
    const date: Date = new Date();
    date.setMilliseconds(date.getMilliseconds() - 1000 * 60 * 60 * hours);
    const pipe = new HumanDateTimePipe();
    expect(pipe.transform(date)).toBe(
      hours.toString() + ' ' + HumanDateTimePipe.hours
    );
  });

  it('should not show the hours text when its exactly 24 hours ago', () => {
    const hours = 24;
    const date: Date = new Date();
    date.setMilliseconds(date.getMilliseconds() - 1000 * 60 * 60 * hours);
    const pipe = new HumanDateTimePipe();
    expect(pipe.transform(date)).not.toBe(
      hours.toString() + ' ' + HumanDateTimePipe.hours
    );
  });

  it('should show the text for 1 day ago', () => {
    const hours = 25;
    //Wednesday 24/10/2018
    const date: Date = new Date(baseDateTime);
    date.setMilliseconds(date.getMilliseconds() - 1000 * 60 * 60 * hours);
    const pipe = new HumanDateTimePipe();
    jest.spyOn(pipe, 'getDate').mockReturnValue(baseDate);
    expect(pipe.transform(date)).toBe(HumanDateTimePipe.weekdays[2]);
  });

  it('should show the text for 2 day ago', () => {
    const hours = 24 * 2 + 1;
    //Wednesday 24/10/2018
    const date: Date = new Date(baseDateTime);
    date.setMilliseconds(date.getMilliseconds() - 1000 * 60 * 60 * hours);
    const pipe = new HumanDateTimePipe();
    jest.spyOn(pipe, 'getDate').mockReturnValue(baseDate);
    expect(pipe.transform(date)).toBe(HumanDateTimePipe.weekdays[1]);
  });

  it('should show the text for 3 day ago', () => {
    const hours = 24 * 3 + 1;
    //Wednesday 24/10/2018
    const date: Date = new Date(baseDateTime);
    date.setMilliseconds(date.getMilliseconds() - 1000 * 60 * 60 * hours);
    const pipe = new HumanDateTimePipe();
    jest.spyOn(pipe, 'getDate').mockReturnValue(baseDate);
    expect(pipe.transform(date)).toBe(HumanDateTimePipe.weekdays[0]);
  });

  it('should show the text for 4 day ago', () => {
    const hours = 24 * 4 + 1;
    //Wednesday 24/10/2018
    const date: Date = new Date(baseDateTime);
    date.setMilliseconds(date.getMilliseconds() - 1000 * 60 * 60 * hours);
    const pipe = new HumanDateTimePipe();
    jest.spyOn(pipe, 'getDate').mockReturnValue(baseDate);
    expect(pipe.transform(date)).toBe(HumanDateTimePipe.weekdays[6]);
  });

  it('should show the text for 5 day ago', () => {
    const hours = 24 * 5 + 1;
    //Wednesday 24/10/2018
    const date: Date = new Date(baseDateTime);
    date.setMilliseconds(date.getMilliseconds() - 1000 * 60 * 60 * hours);
    const pipe = new HumanDateTimePipe();
    jest.spyOn(pipe, 'getDate').mockReturnValue(baseDate);
    expect(pipe.transform(date)).toBe(HumanDateTimePipe.weekdays[5]);
  });

  it('should show the text for 6 day ago', () => {
    const hours = 24 * 6 + 1;
    //Wednesday 24/10/2018
    const date: Date = new Date(baseDateTime);
    date.setMilliseconds(date.getMilliseconds() - 1000 * 60 * 60 * hours);
    const pipe = new HumanDateTimePipe();
    jest.spyOn(pipe, 'getDate').mockReturnValue(baseDate);
    expect(pipe.transform(date)).toBe(HumanDateTimePipe.weekdays[4]);
  });

  it('should show the text for dateformat', () => {
    const hours = 24 * 99 + 1;
    //Wednesday 24/10/2018
    const date: Date = new Date(baseDateTime);
    date.setMilliseconds(date.getMilliseconds() - 1000 * 60 * 60 * hours);
    const pipe = new HumanDateTimePipe();
    jest.spyOn(pipe, 'getDate').mockReturnValue(baseDate);
    expect(pipe.transform(date)).toBe('17/7/2018');
  });

  it('should return an empty string when null date', () => {
    const pipe = new HumanDateTimePipe();
    expect(pipe.transform(null)).toBe('');
  });

  it('should return an empty string when undefined date', () => {
    const pipe = new HumanDateTimePipe();
    expect(pipe.transform(undefined)).toBe('');
  });
});
