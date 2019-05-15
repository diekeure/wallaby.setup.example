import { Injectable } from '@angular/core';

@Injectable()
export class MapObjectConversionService {
  public mapToObject<
    KeyType extends string | number,
    ValueType,
    SecondLevelType
  >(
    map: Map<KeyType, ValueType>
  ): KeyType extends string
    ? {
        [key: string]: ValueType extends Map<string, SecondLevelType>
          ? { [key: string]: SecondLevelType }
          : ValueType extends Map<number, SecondLevelType>
          ? { [key: number]: SecondLevelType }
          : ValueType;
      }
    : {
        [key: number]: ValueType extends Map<string, SecondLevelType>
          ? { [key: string]: SecondLevelType }
          : ValueType extends Map<number, SecondLevelType>
          ? { [key: number]: SecondLevelType }
          : ValueType;
      } {
    return Array.from(map || new Map()).reduce(
      (
        obj: KeyType extends string
          ? { [key: string]: ValueType }
          : { [key: number]: ValueType },
        [key, value]: [string | number, ValueType]
      ) => {
        obj[key] = value instanceof Map ? this.mapToObject(value) : value;
        return obj;
      },
      {}
    ) as KeyType extends string
      ? {
          [key: string]: ValueType extends Map<string, SecondLevelType>
            ? { [key: string]: SecondLevelType }
            : ValueType extends Map<number, SecondLevelType>
            ? { [key: number]: SecondLevelType }
            : ValueType;
        }
      : {
          [key: number]: ValueType extends Map<string, SecondLevelType>
            ? { [key: string]: SecondLevelType }
            : ValueType extends Map<number, SecondLevelType>
            ? { [key: number]: SecondLevelType }
            : ValueType;
        };
  }

  objectToMap<
    KeyType extends string | number,
    ValueType,
    ForceNumberBooleanType extends boolean,
    ConvertSecondLevelBooleanType extends boolean,
    SecondLevelForceNumberType extends boolean,
    SecondLevelValueType
  >(
    obj: KeyType extends string
      ? { [key: string]: ValueType }
      : { [key: number]: ValueType },
    forceToNumberType?: ForceNumberBooleanType,
    convertSecondLevel?: ConvertSecondLevelBooleanType,
    forceSecondLevel?: SecondLevelForceNumberType
  ): Map<
    ForceNumberBooleanType extends true ? number : string,
    ConvertSecondLevelBooleanType extends true
      ? SecondLevelForceNumberType extends true
        ? Map<number, SecondLevelValueType>
        : Map<string, SecondLevelValueType>
      : ValueType
  > {
    const map = new Map<
      ForceNumberBooleanType extends true ? number : string,
      ConvertSecondLevelBooleanType extends true
        ? SecondLevelForceNumberType extends true
          ? Map<number, SecondLevelValueType>
          : Map<string, SecondLevelValueType>
        : ValueType
    >();
    Object.keys(obj || {}).forEach(key => {
      map.set(
        this.stringNumberConverter<typeof forceToNumberType>(
          key,
          forceToNumberType
        ),
        convertSecondLevel
          ? this.objectToMap(obj[key], forceSecondLevel)
          : obj[key]
      );
    });
    return map;
  }

  private stringNumberConverter<ToNumberBooleanType extends boolean>(
    value: string,
    toNumber: ToNumberBooleanType
  ): ToNumberBooleanType extends true ? number : string {
    return (toNumber
      ? parseInt(value, 10)
      : value) as ToNumberBooleanType extends true ? number : string;
  }
}
