import { CdkTreeModule } from '@angular/cdk/tree';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatIconRegistry } from '@angular/material';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockMatIconRegistry } from '@campus/testing';
import { NavItem, TreeNavComponent } from './tree-nav.component';

describe('TreeNavComponent', () => {
  let component: TreeNavComponent;
  let fixture: ComponentFixture<TreeNavComponent>;

  let treeDE: DebugElement;
  let treeNodesDE: DebugElement[];

  let mockData: {
    nav: NavItem[];
  };

  const createNode = (children?: NavItem[], icon?: boolean, link?: boolean) => {
    const node: NavItem = {
      title: 'title'
    };
    if (icon !== false) {
      node.icon = 'iconClass';
    }
    if (link !== false) {
      node.link = 'route';
    }
    if (children) {
      node.children = children;
    }
    return node;
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, CdkTreeModule, MatIconModule],
      declarations: [TreeNavComponent],
      providers: [{ provide: MatIconRegistry, useClass: MockMatIconRegistry }]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeNavComponent);
    component = fixture.componentInstance;

    mockData = {
      nav: [
        createNode(),
        createNode([createNode([createNode()]), createNode(), createNode()]),
        createNode(null, false, false),
        createNode(null, true, false)
      ]
    };

    component.treeNav = mockData.nav;

    fixture.detectChanges();

    treeDE = fixture.debugElement.query(By.css('cdk-tree'));
    treeNodesDE = treeDE.children;

    // spy on router methods so no actual navigating occurs
    const router = TestBed.get(Router) as Router;
    spyOn(router, 'navigate');
    spyOn(router, 'navigateByUrl');
    spyOn(router, 'initialNavigation');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show icon on first node', () => {
    const node = treeNodesDE[0];

    expect(node.query(By.css('mat-icon'))).toBeTruthy();
  });

  it('should set classname for icon', () => {
    const node = treeNodesDE[0];
    expect(
      node.query(By.css('mat-icon')).attributes['ng-reflect-svg-icon']
    ).toBe('iconClass');
  });

  it('should not show icon on third node', () => {
    const node = treeNodesDE[2];
    expect(node.query(By.css('mat-icon'))).toBeFalsy();
  });

  it('should have three children on second node', () => {
    const node = treeNodesDE[1];

    const childNodes = node.query(By.css('ul')).children;
    expect(childNodes.length).toBe(3);
  });

  it('should have a nested child on second node', () => {
    const node = treeNodesDE[1];

    const childNode = node.query(By.css('ul')).children[0];
    const childNodes = childNode.query(By.css('ul')).children;
    expect(childNodes.length).toBe(1);
  });

  it('should show arrow icon when node has children', () => {
    const node = treeNodesDE[1];
    expect(
      node.query(By.css('mat-icon.ui-tree-nav__node__arrow'))
    ).toBeTruthy();
  });

  it('should not show arrow icon when node has no children', () => {
    const node = treeNodesDE[0];
    expect(node.query(By.css('mat-icon.ui-tree-nav__node__arrow'))).toBeFalsy();
  });

  it('should add link property as href', () => {
    const node = treeNodesDE[0];
    expect(node.query(By.css('a')).nativeElement.getAttribute('href')).toBe(
      '/route'
    );
  });

  it('should set href property to current url when no link is set', () => {
    const node = treeNodesDE[3];
    expect(node.query(By.css('a')).nativeElement.getAttribute('href')).toBe(
      '/'
    );
  });

  it('should open the second node', () => {
    const node = treeNodesDE[1];
    const nodeIcon = node.children[0].query(
      By.css('mat-icon.ui-tree-nav__node__arrow')
    );

    // check if default state is closed
    expect(nodeIcon.attributes['ng-reflect-svg-icon']).toBe('expand-more');
    expect(
      node.query(By.css('li')).classes['ui-tree-nav__node--closed']
    ).toBeTruthy();

    // expand node
    const newNav = mockData.nav.slice();
    newNav[1].expanded = true;
    // apply updated nav
    component.treeNav = newNav;
    fixture.detectChanges();

    expect(nodeIcon.attributes['ng-reflect-svg-icon']).toBe('expand-less');
    expect(
      node.query(By.css('li')).classes['ui-tree-nav__node--closed']
    ).toBeFalsy();
  });

  // no tests for click handler because that is triggered through the "cdkTreeNodeToggle" Angular Material directive
  // -> had to add click event handler to update data

  it('should emit navItemChanged when a navItem link is clicked', () => {
    const node = treeNodesDE[1];
    const navItemLink = node.query(By.css('a'));
    const navItem = component.nestedDataSource.data[1];
    component.navItemChanged.emit = jest.fn();

    navItemLink.nativeElement.click();

    expect(component.navItemChanged.emit).toHaveBeenCalled();
    expect(component.navItemChanged.emit).toHaveBeenCalledTimes(1);
    expect(component.navItemChanged.emit).toHaveBeenCalledWith({
      ...navItem,
      expanded: true
    });
  });
});
