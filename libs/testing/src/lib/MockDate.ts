export class MockDate {
  private _Date: DateConstructor;
  private _mockDate: Date;

  public returnRealDate(): void {
    global.Date = this._Date;
  }

  get mockDate() {
    return this._mockDate;
  }

  set mockDate(mockDate: Date) {
    this.overrideDate(mockDate);
  }

  constructor(mockDate: Date = new Date()) {
    this._Date = Date;
    this.overrideDate(mockDate);
  }

  private overrideDate(mockDate: Date): void {
    this._mockDate = mockDate;
    // @ts-ignore
    global.Date = jest.fn(() => mockDate);
    global.Date.UTC = this._Date.UTC;
    global.Date.parse = this._Date.parse;
    // @ts-ignore
    global.Date.now = jest.fn(() => mockDate.getTime());
  }
}
