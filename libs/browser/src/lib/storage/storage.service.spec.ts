import { TestBed } from '@angular/core/testing';
import { BROWSER_STORAGE, StorageService } from './storage.service';
import { StorageServiceInterface } from './storage.service.interface';

let data: any;
let service: StorageServiceInterface;
const windowStorage = {
  getItem: key => {
    return data[key];
  },
  setItem: (key, value) => {
    data[key] = value;
  },
  removeItem: key => {
    delete data[key];
  },
  clear: () => {
    data = {};
  }
};

describe('StorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StorageService,
        {
          provide: BROWSER_STORAGE,
          useValue: windowStorage
        }
      ]
    });
    data = { foo: 'bar' };
    service = TestBed.get(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a value', () => {
    expect(service.get('foo')).toBe('bar');
  });

  it('should set a value', () => {
    service.set('foo', '');
    expect(service.get('foo')).toBe('');
  });

  it('should remove a value', () => {
    service.set('test', 'baz');
    expect(service.get('test')).toBe('baz');
    service.remove('test');
    expect(service.get('test')).toBeUndefined();
  });

  it('should clear a values', () => {
    service.clear();
    expect(Object.keys(data).length).toBe(0);
  });
});
