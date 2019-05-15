import { TestBed } from '@angular/core/testing';
import { MapObjectConversionService } from './map-object-conversion.service';

describe('MapObjectConversionService', () => {
  let mapObjectConversionService: MapObjectConversionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapObjectConversionService]
    });

    mapObjectConversionService = TestBed.get(MapObjectConversionService);
  });

  it('should be created', () => {
    expect(mapObjectConversionService).toBeTruthy();
  });
  describe('mapToObject', () => {
    it('should return an empty object if undefined is passed', () => {
      const map = undefined;
      expect(mapObjectConversionService.mapToObject(map)).toEqual({});
    });
    it('should return an object if the map type is string', () => {
      const map = new Map<string, number>([
        ['one', 23],
        ['two', 838],
        ['three', 847]
      ]);
      expect(mapObjectConversionService.mapToObject(map)).toEqual({
        one: 23,
        two: 838,
        three: 847
      });
    });
    it('should return an object if the map type is number', () => {
      const map = new Map<number, number>([[1, 23], [2, 838], [3, 847]]);
      const obj = mapObjectConversionService.mapToObject(map);
      expect(obj).toEqual({
        1: 23,
        2: 838,
        3: 847
      });
    });
    it('should convert value to object if the value is a map', () => {
      const map = new Map<string, Map<string, string>>([
        [
          'one',
          new Map([['some', 'value for some'], ['foo', 'value for foo']])
        ],
        ['two', new Map([['bar', 'value for bar']])],
        [
          'three',
          new Map([
            ['foobar', 'value for foobar'],
            ['other', 'value for other']
          ])
        ]
      ]);
      expect(mapObjectConversionService.mapToObject(map)).toEqual({
        one: {
          some: 'value for some',
          foo: 'value for foo'
        },
        two: { bar: 'value for bar' },
        three: { foobar: 'value for foobar', other: 'value for other' }
      });
    });
  });
  describe('objectToMap', () => {
    it('should return an empty map if undefined is passed', () => {
      const obj: { [key: string]: number } = undefined;
      expect(mapObjectConversionService.objectToMap(obj)).toEqual(
        new Map<string, number>()
      );
    });
    it('should convert a string object to a map', () => {
      const obj: { [key: string]: number } = {
        one: 23,
        two: 838,
        three: 847
      };
      expect(mapObjectConversionService.objectToMap(obj)).toEqual(
        new Map<string, number>([['one', 23], ['two', 838], ['three', 847]])
      );
    });
    it('should convert a number object to a map', () => {
      const obj: { [key: number]: number } = {
        1: 23,
        2: 838,
        3: 847
      };
      expect(mapObjectConversionService.objectToMap(obj, true)).toEqual(
        new Map<number, number>([[1, 23], [2, 838], [3, 847]])
      );
    });
    it('should convert a string object to a map<string, any> if force is false', () => {
      const obj: { [key: number]: number } = {
        1: 23,
        2: 838,
        3: 847
      };
      expect(mapObjectConversionService.objectToMap(obj, false)).toEqual(
        new Map<string, number>([['1', 23], ['2', 838], ['3', 847]])
      );
    });
    it('should convert a multilevel string and number object to a map<string, Map<number, number>>', () => {
      const obj: { [key: number]: { [key: string]: number } } = {
        1: { one: 23 },
        2: { two: 838 },
        3: { three: 847 }
      };
      expect(
        mapObjectConversionService.objectToMap(obj, true, true, false)
      ).toEqual(
        new Map<number, Map<string, number>>([
          [1, new Map<string, number>([['one', 23]])],
          [2, new Map<string, number>([['two', 838]])],
          [3, new Map<string, number>([['three', 847]])]
        ])
      );
    });
  });
});
