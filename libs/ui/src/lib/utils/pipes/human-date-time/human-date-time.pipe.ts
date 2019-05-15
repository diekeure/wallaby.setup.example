import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'humanDateTime'
})
export class HumanDateTimePipe implements PipeTransform {
  /**
   * this text should be shown when time is less than a minute ago.
   *
   * @static
   * @memberof HumanDateTimePipe
   */
  static just = 'zonet';

  /**
   * this text should be shown when time is less than an hour ago.
   *
   * @static
   * @memberof HumanDateTimePipe
   */
  static minutes = 'minuten geleden';

  /**
   * this text should be shown when time is more or equal to minute and less than 2 minutes ago.
   *
   * @static
   * @memberof HumanDateTimePipe
   */
  static singleMinute = 'minuut geleden';

  /**
   * this text should be shown when time is less than a day ago.
   *
   * @static
   * @memberof HumanDateTimePipe
   */
  static hours = 'uren geleden';

  /**
   * this text should be shown when time is more or equal to an hour and less than 2 hours ago.
   *
   * @static
   * @memberof HumanDateTimePipe
   */
  static singleHour = 'uur geleden';

  /**
   * list of day strings shown ordered by javascripts weekdays
   *
   * @static
   * @type {String[]}
   * @memberof HumanDateTimePipe
   */
  static weekdays: String[] = [
    'Zondag',
    'Maandag',
    'Dinsdag',
    'Woensdag',
    'Donderdag',
    'Vrijdag',
    'Zaterdag'
  ];

  /**
   * amount seconds in a minute
   *
   * @private
   * @memberof HumanDateTimePipe
   */
  private minuteInSeconds = 60;

  /**
   * seconds in an hour
   *
   * @private
   * @memberof HumanDateTimePipe
   */
  private hourInSeconds = this.minuteInSeconds * 60;

  /**
   * seconds in a day
   *
   * @private
   * @memberof HumanDateTimePipe
   */
  private dayInSeconds = this.hourInSeconds * 24;

  /**
   * seconds in 7 days
   *
   * @private
   * @memberof HumanDateTimePipe
   */
  private weekInSeconds = this.dayInSeconds * 7;

  getDate(): Date {
    return new Date();
  }

  /**
   * takes a date object and transforms it to a human readable string
   * returns empty string when date is undefined or null
   *
   * @param {Date} value
   * @param {String} [args]
   * @returns {String}
   * @memberof HumanDateTimePipe
   */
  transform(value: Date, args?: String): String {
    if (value) {
      if (!(value instanceof Date)) {
        value = new Date(value);
      }
      const currentDate: Date = this.getDate();
      const valueInSeconds: number = Math.round(value.getTime() / 1000);
      const differenceInSeconds: number =
        Math.round(currentDate.getTime() / 1000) - valueInSeconds;

      switch (true) {
        case differenceInSeconds < this.minuteInSeconds:
          return HumanDateTimePipe.just;
        case differenceInSeconds < this.hourInSeconds:
          const minutes: number = Math.floor(
            differenceInSeconds / this.minuteInSeconds
          );
          return `${minutes} ${
            minutes > 1
              ? HumanDateTimePipe.minutes
              : HumanDateTimePipe.singleMinute
          }`;
        case differenceInSeconds < this.dayInSeconds:
          const hours: number = Math.floor(
            differenceInSeconds / this.hourInSeconds
          );
          return `${hours} ${
            hours > 1 ? HumanDateTimePipe.hours : HumanDateTimePipe.singleHour
          }`;
        case differenceInSeconds < this.weekInSeconds:
          const daysBack: number = Math.floor(
            differenceInSeconds / this.dayInSeconds
          );
          let actualDay: number = currentDate.getDay() - daysBack;
          if (actualDay < 0) {
            actualDay = HumanDateTimePipe.weekdays.length - Math.abs(actualDay);
          }
          return HumanDateTimePipe.weekdays[actualDay];
        default:
          // for some reason getting a localized date string is not working in tests
          // in an ideal world we could use value.toLocaleDateString('nl-BE') then again in a ideal world Javascript wouldnt exist either
          const day = value.getDate();
          const month = value.getMonth() + 1;
          const year = value.getFullYear();
          return day + '/' + month + '/' + year;
      }
    }
    return '';
  }
}
