import { LayoutModule } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkTreeModule } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatTooltipModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { UtilsModule } from '@campus/utils';
import { AppBarComponent } from './app-bar/app-bar.component';
import { BannerComponent } from './banner/banner.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ButtonComponent } from './button/button.component';
import { BorderDirective } from './button/directives/button-border.directive';
import { CircleDirective } from './button/directives/button-circle.directive';
import { DangerDirective } from './button/directives/button-danger.directive';
import { DisabledDirective } from './button/directives/button-disabled.directive';
import { LargeDirective } from './button/directives/button-large.directive';
import { PrimaryDirective } from './button/directives/button-primary.directive';
import { RoundedCornersDirective } from './button/directives/button-rounded-corners.directive';
import { WarningDirective } from './button/directives/button-warning.directive';
import { CollapsibleSheetComponent } from './collapsible-sheet/collapsible-sheet.component';
import { ConfirmableSelectComponent } from './confirmable-select/confirmable-select.component';
import { ContentPreviewComponent } from './content-preview/content-preview.component';
import { ContentThumbnailComponent } from './content-thumbnail/content-thumbnail.component';
import { DropAreaComponent } from './drop-area/drop-area.component';
import { DropdownMenuItemComponent } from './dropdown-menu-item/dropdown-menu-item.component';
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';
import { EditableInlineTagListComponent } from './editable-inline-tag-list/editable-inline-tag-list.component';
import { FileExtensionComponent } from './file-extension/file-extension.component';
import { FilterTextInputComponent } from './filter-text-input/filter-text-input.component';
import { FolderDetailsDirective } from './folder/directives/folder-details.directive';
import { FolderComponent } from './folder/folder.component';
import { InfoPanelComponent } from './info-panel/info-panel.component';
import {
  ListViewComponent,
  ListViewItemDirective
} from './list-view/list-view.component';
import { ManageCollectionComponent } from './manage-collection/manage-collection.component';
import { CollectionManagerService } from './manage-collection/services/collection-manager.service';
import { COLLECTION_MANAGER_SERVICE_TOKEN } from './manage-collection/services/collection-manager.service.interface';
import { DropdownDirective } from './notification/directives/notification-dropdown.directive';
import { NotificationComponent } from './notification/notification.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PersonBadgeComponent } from './person-badge/person-badge.component';
import { PersonInitialsPipe } from './person-badge/pipes/person-initials.pipe';
import { PersonSummaryComponent } from './person-summary-component/person-summary.component';
import { ShellBodyDirective } from './shell/directives/shell-body.directive';
import { ShellLeftDirective } from './shell/directives/shell-left.directive';
import { ShellLogoDirective } from './shell/directives/shell-logo.directive';
import { ShellTopDirective } from './shell/directives/shell-top.directive';
import { ShellComponent } from './shell/shell.component';
import { SideSheetBodyDirective } from './side-sheet/directives/side-sheet-body.directive';
import { SideSheetHeaderDirective } from './side-sheet/directives/side-sheet-header.directive';
import { SideSheetPageDirective } from './side-sheet/directives/side-sheet-page.directive';
import { SideSheetComponent } from './side-sheet/side-sheet.component';
import { TileComponent } from './tile/tile.component';
import { TreeNavComponent } from './tree-nav/tree-nav.component';
import { HideDesktopDirective } from './utils/directives/hide-desktop.directive';
import { HideMobileDirective } from './utils/directives/hide-mobile.directive';
import { IsMobileDirective } from './utils/directives/is-mobile.directive';
import { AdjustColorBrightnessPipe } from './utils/pipes/adjust-color-brightness/adjust-color-brightness.pipe';
import { HumanDateTimePipe } from './utils/pipes/human-date-time/human-date-time.pipe';
import { JoinPipe } from './utils/pipes/join/join.pipe';
import { RemovePrefixStringPipe } from './utils/pipes/remove-prefix-string/remove-prefix-string.pipe';
import { TruncateStringPipe } from './utils/pipes/truncate-string/truncate-string.pipe';

@NgModule({
  imports: [
    OverlayModule,
    MatButtonModule,
    CommonModule,
    MatSidenavModule,
    MatInputModule,
    LayoutModule,
    RouterModule,
    CdkTreeModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatIconModule,
    MatMenuModule,
    UtilsModule,
    MatDialogModule,
    MatListModule
  ],
  declarations: [
    FilterTextInputComponent,
    SideSheetComponent,
    SideSheetHeaderDirective,
    SideSheetBodyDirective,
    SideSheetPageDirective,
    ShellComponent,
    ShellLogoDirective,
    ShellTopDirective,
    ShellLeftDirective,
    ShellBodyDirective,
    AppBarComponent,
    PageHeaderComponent,
    FileExtensionComponent,
    TreeNavComponent,
    InfoPanelComponent,
    PersonBadgeComponent,
    PersonInitialsPipe,
    ContentPreviewComponent,
    ConfirmableSelectComponent,
    EditableInlineTagListComponent,
    ContentThumbnailComponent,
    ButtonComponent,
    ListViewComponent,
    ListViewItemDirective,
    FolderDetailsDirective,
    FolderComponent,
    AdjustColorBrightnessPipe,
    CircleDirective,
    RoundedCornersDirective,
    BorderDirective,
    DangerDirective,
    WarningDirective,
    DisabledDirective,
    BreadcrumbsComponent,
    NotificationComponent,
    DropdownMenuComponent,
    TruncateStringPipe,
    DropdownMenuItemComponent,
    HideDesktopDirective,
    HideMobileDirective,
    IsMobileDirective,
    HumanDateTimePipe,
    RemovePrefixStringPipe,
    LargeDirective,
    PrimaryDirective,
    PersonSummaryComponent,
    BannerComponent,
    DropdownDirective,
    CollapsibleSheetComponent,
    DropAreaComponent,
    TileComponent,
    JoinPipe,
    ManageCollectionComponent
  ],
  exports: [
    FilterTextInputComponent,
    SideSheetComponent,
    SideSheetHeaderDirective,
    SideSheetBodyDirective,
    SideSheetPageDirective,
    ShellComponent,
    ShellLogoDirective,
    ShellTopDirective,
    ShellLeftDirective,
    ShellBodyDirective,
    AppBarComponent,
    PageHeaderComponent,
    InfoPanelComponent,
    ContentPreviewComponent,
    ConfirmableSelectComponent,
    EditableInlineTagListComponent,
    FileExtensionComponent,
    ContentThumbnailComponent,
    ButtonComponent,
    ListViewComponent,
    ListViewItemDirective,
    PersonBadgeComponent,
    FolderDetailsDirective,
    FolderComponent,
    AdjustColorBrightnessPipe,
    CircleDirective,
    RoundedCornersDirective,
    BorderDirective,
    DangerDirective,
    WarningDirective,
    DisabledDirective,
    TreeNavComponent,
    BreadcrumbsComponent,
    NotificationComponent,
    DropdownMenuComponent,
    TruncateStringPipe,
    DropdownMenuItemComponent,
    HideDesktopDirective,
    HideMobileDirective,
    IsMobileDirective,
    HumanDateTimePipe,
    RemovePrefixStringPipe,
    LargeDirective,
    PrimaryDirective,
    PersonSummaryComponent,
    BannerComponent,
    DropdownDirective,
    CollapsibleSheetComponent,
    DropAreaComponent,
    TileComponent,
    JoinPipe
  ],
  providers: [
    {
      provide: COLLECTION_MANAGER_SERVICE_TOKEN,
      useClass: CollectionManagerService
    },
    ManageCollectionComponent
  ]
})
export class UiModule {}
