import { async, TestBed } from '@angular/core/testing';
import { PagesBundlesModule } from './pages-bundles.module';

describe('PagesBundlesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PagesBundlesModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PagesBundlesModule).toBeDefined();
  });
});
