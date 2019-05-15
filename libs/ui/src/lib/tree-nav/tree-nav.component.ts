import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material';

/**
 * Json node data with nested structure. Each node has a title, an icon and optionally a list children
 *
 * @export
 * @interface NavItem
 */
export interface NavItem {
  title: string;
  icon?: string;
  link?: any[] | string;
  children?: NavItem[];
  expanded?: boolean;
}

/**
 * Navigation tree
 *
 * @example
 *   <campus-nav-tree [treeNav]="myNavigationTree|async"></campus-nav-tree>
 * @example
 *
 * @export
 * @class TreeNavComponent
 */
@Component({
  selector: 'campus-tree-nav',
  templateUrl: './tree-nav.component.html',
  styleUrls: ['./tree-nav.component.scss']
})
export class TreeNavComponent {
  /**
   * Current tree nav
   *
   * @private
   * @type {NavItem[]}
   * @memberof TreeNavComponent
   */
  private _treeNav: NavItem[];

  @Input()
  set treeNav(treeNav: NavItem[]) {
    this._treeNav = treeNav;
    this.updateTreeNav();
  }

  @Output() navItemChanged = new EventEmitter<NavItem>();

  /**
   * Datasource for CdkTree from Angular Material CDK
   *
   * @type {MatTreeNestedDataSource<NavItem>}
   * @memberof TreeNavComponent
   */
  nestedDataSource: MatTreeNestedDataSource<NavItem>;
  /**
   * Nested tree control for CdkTree from Angular Material CDK
   *
   * @type {NestedTreeControl<NavItem>}
   * @memberof TreeNavComponent
   */
  nestedTreeControl: NestedTreeControl<NavItem>;

  constructor() {
    this.nestedDataSource = new MatTreeNestedDataSource();
    this.nestedTreeControl = new NestedTreeControl<NavItem>(this.getChildren);
  }

  public toggleNode(node: NavItem) {
    this.navItemChanged.emit({ ...node, expanded: !node.expanded });
  }

  /**
   * Function that should return true if the nested node template should be used for the provided index and node data
   * https://material.angular.io/cdk/tree/api#CdkTreeNodeDef
   *
   * @param {number} _
   * @param {NavItem} nodeData
   * @returns {boolean}
   * @memberof TreeNavComponent
   */
  hasChildren = (_: number, nodeData: NavItem): boolean =>
    nodeData.children && nodeData.children.length > 0;

  /**
   * Get children of selected node
   *
   * @private
   * @param {NavItem} node
   * @returns {NavItem[]}
   * @memberof TreeNavComponent
   */
  private getChildren = (node: NavItem): NavItem[] => node.children;

  /**
   * Update tree to current state
   *
   * @private
   * @returns {void}
   * @memberof TreeNavComponent
   */
  private updateTreeNav(): void {
    this.nestedDataSource.data = this._treeNav;
    this.nestedTreeControl.dataNodes = this._treeNav;

    this.setExpanded(this.nestedTreeControl.dataNodes);
  }

  /**
   * Open tree nodes where 'expanded' property is true
   *
   * @private
   * @param {NavItem[]} nodes
   * @returns {void}
   * @memberof TreeNavComponent
   */
  private setExpanded(nodes: NavItem[]): void {
    if (!nodes) {
      return;
    }
    nodes.forEach(node => {
      if (node.expanded) {
        this.nestedTreeControl.expand(node);
      }
      this.setExpanded(node.children);
    });
  }
}
