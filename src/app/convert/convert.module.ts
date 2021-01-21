import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

import { ConvertRoutingModule } from './convert-routing.module';
import { IndexConvertComponent } from './index-convert/index-convert.component';
import { CurrencyComponent } from './currency/currency.component';
import { LengthComponent } from './length/length.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    IndexConvertComponent,
    CurrencyComponent,
    LengthComponent
  ],
  imports: [
    CommonModule,
    ConvertRoutingModule,
    SharedModule,
    MatTabsModule
  ]
})
export class ConvertModule { }
