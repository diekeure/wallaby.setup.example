import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, HAMMER_LOADER } from '@angular/platform-browser';
import { ListFormat } from '../list-view/enums/list-format.enum';
import { UiModule } from '../ui.module';
import { FolderComponent } from './folder.component';

describe('FolderComponent', () => {
  let component: FolderComponent;
  let fixture: ComponentFixture<FolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiModule],
      providers: [
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => {})
        }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a grid class', () => {
    component.listFormat = ListFormat.GRID;
    fixture.detectChanges();
    fixture.nativeElement.classList.contains('ui-folder--grid');
  });

  it('should have a line class', () => {
    component.listFormat = ListFormat.LINE;
    fixture.detectChanges();
    fixture.nativeElement.classList.contains('ui-folder--line');
  });

  it('should show exclamation mark', () => {
    component.showEmptyError = true;
    component.itemCount = '0';
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('ui-folder__badge-number--error'))
    ).toBeDefined();
  });

  it('should not show exclamation mark', () => {
    component.showEmptyError = false;
    component.itemCount = '0';
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('ui-folder__badge-number--error'))
    ).toBeNull();
  });

  it('should show a spinner', () => {
    component.progress = 50;
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('mat-progress-spinner'))
    ).toBeDefined();
  });

  it('should not show a spinner', () => {
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('mat-progress-spinner'))
    ).toBeNull();
  });
});
