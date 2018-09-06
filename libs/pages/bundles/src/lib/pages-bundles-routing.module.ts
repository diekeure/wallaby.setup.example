import { BundlesViewModel } from './components/bundles.viewmodel';
import { BundlesComponent } from './components/bundles.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: BundlesComponent,
    resolve: { isResolved: BundlesViewModel }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesBundlesRoutingModule {}
