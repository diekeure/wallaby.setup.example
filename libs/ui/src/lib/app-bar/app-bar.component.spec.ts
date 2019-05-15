import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppBarComponent } from './app-bar.component';

@Component({
  template: `
    <campus-app-bar>
      <h2 bar__left>|links1|</h2> <p bar__left>|links2|</p>
      <div bar__center>|midden1|</div> <div bar__center>|midden2|</div>
      <div bar__center>|midden3|</div> <div bar__right>|rechts1|</div>
      <div bar__right>|rechts2|</div> <div bar__right>|rechts3|</div>
      <div bar__right>|rechts4|</div> <div>|geen attribute|</div>
    </campus-app-bar>
  `
})
class AppBarHostComponent {}

describe('BasicAppBarComponent', () => {
  let component: AppBarComponent;
  let fixture: ComponentFixture<AppBarComponent>;

  let hostComponent: AppBarHostComponent;
  let hostFixture: ComponentFixture<AppBarHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppBarComponent, AppBarHostComponent]
    });
  }));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(AppBarHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();

    fixture = TestBed.createComponent(AppBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain 2 items in the left section', () => {
    const hostSectionDE = hostFixture.debugElement.query(
      By.css('.ui-app-bar__section--align-start')
    );
    const hostSectionChildren = hostSectionDE.queryAll(By.all());
    const childrenInSectionAmount = hostSectionChildren.length;

    expect(childrenInSectionAmount).toBe(3);
  });

  it('should contain 3 items in the center section', () => {
    const hostSectionDE = hostFixture.debugElement.query(
      By.css('.ui-app-bar__section--align-center')
    );
    const hostSectionChildren = hostSectionDE.queryAll(By.all());
    const childrenInSectionAmount = hostSectionChildren.length;

    expect(childrenInSectionAmount).toBe(3);
  });

  it('should contain 4 items in the right section', () => {
    const hostSectionDE = hostFixture.debugElement.query(
      By.css('.ui-app-bar__section--align-end')
    );
    const hostSectionChildren = hostSectionDE.queryAll(By.all());
    const childrenInSectionAmount = hostSectionChildren.length;

    expect(childrenInSectionAmount).toBe(4);
  });
});
