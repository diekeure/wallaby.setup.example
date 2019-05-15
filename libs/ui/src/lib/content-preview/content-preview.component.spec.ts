import { CommonModule } from '@angular/common';
import { Component, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UiModule } from '../../lib/ui.module';
import { ContentPreviewComponent } from './content-preview.component';

@Component({
  selector: 'campus-test-container',
  template: `
    <campus-content-preview preview>
      <campus-file-extension type></campus-file-extension>
      <div icon class="polpo-presentatie"></div>
      <div badge *ngFor="let badge of ['badge1', 'badge2']"> {{ badge }} </div>
    </campus-content-preview>
  `
})
export class TestContainerComponent {}

@NgModule({
  imports: [CommonModule, UiModule],
  exports: [TestContainerComponent],
  declarations: [TestContainerComponent]
})
export class TestModule {}

describe('ContentPreviewComponent', () => {
  let component: ContentPreviewComponent;
  let fixture: ComponentFixture<ContentPreviewComponent>;
  let testContainerFixture: ComponentFixture<TestContainerComponent>;
  let testContainerComponent: TestContainerComponent;
  let innerComponent: ContentPreviewComponent;

  let mockData: {
    titleText: string;
    description: string;
    contentPreview?: string;
    methods?: string[];
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentPreviewComponent);
    component = fixture.componentInstance;

    mockData = {
      titleText: 'the-title',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    };

    component.titleText = mockData.titleText;
    component.description = mockData.description;

    fixture.detectChanges();

    testContainerFixture = TestBed.createComponent(TestContainerComponent);
    testContainerComponent = testContainerFixture.componentInstance;
    innerComponent = <ContentPreviewComponent>(
      testContainerFixture.debugElement.query(By.css('campus-content-preview'))
        .componentInstance
    );
    testContainerFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show the title', () => {
    const title = fixture.debugElement.query(
      By.css('.ui_content-preview__product__details__title')
    ).nativeElement.textContent;
    expect(title).toContain(mockData.titleText);
  });
  it('should show the description', () => {
    const title = fixture.debugElement.query(
      By.css('.ui_content-preview__product__details__description')
    ).nativeElement.textContent;
    expect(title).toContain(mockData.description);
  });
  it('should show the productTypeIcon', () => {
    const productTypeIcon = testContainerFixture.debugElement.query(
      By.css('[icon]')
    );
    expect(productTypeIcon).toBeTruthy();
  });
  it('should show the fileExtentionIcon', () => {
    const fileExtentionIcon = testContainerFixture.debugElement.query(
      By.css('[type]')
    );
    expect(fileExtentionIcon).toBeTruthy();
  });
  it('should not show methods image if no methods were given', () => {
    const method = fixture.debugElement.query(
      By.css('.ui_content-preview__methods')
    );
    expect(method).toBeFalsy();
  });
  it('should show the methods if these are given', () => {
    const methods = testContainerFixture.debugElement.queryAll(
      By.css('[badge]')
    );
    expect(methods.length).toBe(2);
  });
  it('should not show contentPreview if none was given', () => {
    const preview = fixture.debugElement.query(
      By.css('.ui_content-preview__preview')
    );
    expect(preview).toBeFalsy();
  });
  it('should not show contentPreview if none was given', () => {
    component.preview =
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    fixture.detectChanges();
    const preview = fixture.debugElement.query(
      By.css('.ui_content-preview__preview')
    );
    expect(preview).toBeTruthy();
  });
});
