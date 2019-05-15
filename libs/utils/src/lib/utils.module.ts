import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickStopPropagationDirective } from './directives/click-stop-propagation.directive';
import { ClickPreventDefaultDirective } from './directives/click-prevent-default.directive';
@NgModule({
  imports: [CommonModule],
  declarations: [ClickStopPropagationDirective, ClickPreventDefaultDirective],
  exports: [ClickStopPropagationDirective, ClickPreventDefaultDirective]
})
export class UtilsModule {}
