import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { By } from '@angular/platform-browser';
import { WINDOW } from '../window/window';
import { IframeComponent } from './iframe.component';

describe('IframeComponent', () => {
  let component: IframeComponent;
  let fixture: ComponentFixture<IframeComponent>;
  let callback;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IframeComponent],
      providers: [
        {
          provide: WINDOW,
          useValue: {
            addEventListener: function(event, cb) {
              callback = cb;
            }
          }
        },
        {
          provide: MatDialogRef,
          useValue: {
            close: jest.fn()
          }
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            url: 'http://www.google.be'
          }
        }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should allow a url on the iframe other than the current', () => {
    const iframe = fixture.debugElement.query(By.css('iframe'));
    expect(iframe.nativeElement.attributes.src.value).toEqual(
      'http://www.google.be'
    );
  });

  it('should close the dialogRef when postMessage close', () => {
    callback({ data: 'close' });
    expect(TestBed.get(MatDialogRef).close).toHaveBeenCalled();
  });
});
