import { BundlesViewModel } from './components/bundles.viewmodel';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesBundlesRoutingModule } from './pages-bundles-routing.module';
import { BundlesComponent } from './components/bundles.component';

@NgModule({
  imports: [CommonModule, PagesBundlesRoutingModule],
  declarations: [BundlesComponent],

  providers: [BundlesViewModel]
})
export class PagesBundlesModule {}
