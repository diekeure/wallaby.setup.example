/*
 * Generate strongly-typed deep property path in typescript. Access deep property by a path.
 * Shameless copy / adaptation from:
 * https://github.com/Taras-Tymchiy/ts-object-path/blob/5bbb38427edf99e29ac66264e50dd427143618bb/test/ts-object-path.test.ts
 */
import { ObjectPathService } from './object-path.service';
import { ObjectPathServiceInterface } from './object-path.service.interface';

interface ITest {
  one: number;
  two?: string;
  three?: INestedTest;
  four?: INestedTest[];
}

interface INestedTest {
  firrst: number;
  second?: string;
}

describe('ObjectPath', () => {
  const objectPath: ObjectPathServiceInterface = new ObjectPathService();

  describe('createProxy test', () => {
    it('Creates proxy', () => {
      const p = objectPath.createProxy<ITest>();
      expect(p).toBeTruthy();
    });
  });

  describe('getPath test', () => {
    it('Creates proxy with empty path', () => {
      const p = objectPath.createProxy<ITest>();
      expect(objectPath.getPath(p)).toEqual([]);
    });
    it('Gets path from proxy', () => {
      const p = objectPath.createProxy<ITest>();
      expect(objectPath.getPath(p.one)).toEqual(['one']);
      expect(objectPath.getPath(p.three.second)).toEqual(['three', 'second']);
      expect(objectPath.getPath(p.four[4].second)).toEqual([
        'four',
        4,
        'second'
      ]);
    });
    it('Get undefined', () => {
      expect(objectPath.getPath({})).toBeUndefined();
    });
  });

  describe('getValue test', () => {
    it('Works with proxy', () => {
      const p = objectPath.createProxy<ITest>();
      const o: ITest = { one: 4 };
      const v = objectPath.get(o, p.one);
      expect(v).toEqual(o.one);
    });
    it('Works with callback', () => {
      const v = objectPath.get({ one: 4 }, p => p.one);
      expect(v).toEqual(4);
    });
    it('Works with deep props', () => {
      let o: ITest;
      expect(
        objectPath.get<ITest, number>(o, p => p.three.firrst)
      ).toBeUndefined();

      o = { one: 5, three: { firrst: 4 } };
      expect(objectPath.get<ITest, number>(o, p => p.three.firrst)).toEqual(
        o.three.firrst
      );
    });
    it('Works with arrays', () => {
      const o: ITest = { one: 5, four: [null, { firrst: 4 }] };
      expect(
        objectPath.get<ITest, number>(o, p => p.four[0].firrst)
      ).toBeUndefined();
      expect(objectPath.get<ITest, number>(o, p => p.four[1].firrst)).toEqual(
        4
      );
    });
    it('Works with symbols', () => {
      const symb = Symbol('test');
      const o = { regularProp: { [symb]: 333 } };
      const v = objectPath.get(o, p => p.regularProp[symb]);
      expect(v).toEqual(333);
    });
    it('returns default value', () => {
      const o: ITest = { one: 4 };
      const v = objectPath.get(o, p => p.three.second, 'default' as string);
      expect(v).toEqual('default');
    });
  });

  describe('setValue test', () => {
    it('Works with proxy', () => {
      const p = objectPath.createProxy<ITest>();
      const o: ITest = { one: 4 };
      objectPath.set(o, p.one, 333 as number);
      expect(o.one).toEqual(333);
    });
    it('Works with callback', () => {
      const o: ITest = { one: 4 };
      objectPath.set(o, p => p.one, 333 as number);
      expect(o.one).toEqual(333);
    });
    it('Works with deep props', () => {
      const o: ITest = { one: 5, three: { firrst: 4 } };
      objectPath.set(o, p => p.three.firrst, 777 as number);
      expect(o.three.firrst).toEqual(777);
    });
    it('Works with arrays', () => {
      const o: ITest = { one: 5, four: [null, { firrst: 4 }] };
      objectPath.set(o, p => p.four[1].firrst, 666 as number);
      expect(o.four[1].firrst).toEqual(666);
    });

    it('Works with symbols', () => {
      const symb = Symbol('test');
      const o = { regularProp: { [symb]: 333 } };
      objectPath.set(o, p => p.regularProp[symb], 555 as number);
      expect(o.regularProp[symb]).toEqual(555);
    });

    it('Creates nested objects', () => {
      const o: ITest = { one: 5 };
      objectPath.set(o, p => p.three.firrst, 777 as number);
      expect(o.three.firrst).toEqual(777);
    });
    it('Creates nested arrays', () => {
      const o: ITest = { one: 5 };
      objectPath.set(o, p => p.four[1].firrst, 666 as number);
      expect(o.four[1].firrst).toEqual(666);
      expect(o.four.length).toBe(2);
    });
  });
});
