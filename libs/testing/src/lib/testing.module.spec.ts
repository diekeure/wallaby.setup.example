import { async, TestBed } from '@angular/core/testing';
import { TestingModule } from './testing.module';

describe('SharedModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule]
    });
  }));

  it('should create', () => {
    expect(TestingModule).toBeDefined();
  });
});
