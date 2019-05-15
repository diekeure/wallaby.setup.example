import { TestBed } from '@angular/core/testing';
import { FilterService } from './filter.service';
import { FilterServiceInterface } from './filter.service.interface';

describe('FilterService', () => {
  let filterService: FilterServiceInterface;
  const mockData = {
    list: [
      {
        text: 'foo',
        numeric: 1,
        date: new Date(2000, 1, 2, 3, 4), // 2 feb 2000 3u04
        nested: {
          text: 'bar'
        }
      },
      {
        text: 'bar',
        numeric: 2,
        date: new Date(2000, 1, 2, 5, 6), // 2 feb 2000 5u06
        nested: {
          text: 'foo'
        }
      },
      {
        text: 'Foobar',
        numeric: 23,
        date: new Date(2000, 4, 3, 2, 1), // 4 apr 2000 2u01
        nested: {
          text: 'foobar'
        }
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterService]
    });

    filterService = TestBed.get(FilterService);
  });

  it('should be created', () => {
    expect(filterService).toBeTruthy();
  });

  it('should filter by text property', () => {
    const result = filterService.filter(mockData.list, { text: 'foo' });
    expect(result.length).toBe(2);
    expect(result[0]).toBe(mockData.list[0]);
    expect(result[1]).toBe(mockData.list[2]);
  });

  it('should filter by nested text property', () => {
    const result = filterService.filter(mockData.list, {
      nested: { text: 'foo' }
    });
    expect(result.length).toBe(2);
    expect(result[0]).toBe(mockData.list[1]);
    expect(result[1]).toBe(mockData.list[2]);
  });

  it('should filter by case sensitive text property', () => {
    const result = filterService.filter(mockData.list, { text: 'foo' }, false);
    expect(result.length).toBe(1);
    expect(result[0]).toBe(mockData.list[0]);
  });

  it('should filter by numeric property', () => {
    const result = filterService.filter(mockData.list, { numeric: 2 });
    expect(result.length).toBe(1);
    expect(result[0]).toBe(mockData.list[1]);
  });

  it('should filter by date property', () => {
    const result = filterService.filter(mockData.list, {
      date: new Date(2000, 1, 2)
    });
    expect(result.length).toBe(2);
    expect(result[0]).toBe(mockData.list[0]);
    expect(result[1]).toBe(mockData.list[1]);
  });

  it('should filter by combined date and nested text property', () => {
    const result = filterService.filter(mockData.list, {
      nested: { text: 'foo' },
      date: new Date(2000, 1, 2)
    });
    expect(result.length).toBe(1);
    expect(result[0]).toBe(mockData.list[1]);
  });
});
