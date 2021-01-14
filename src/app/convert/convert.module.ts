import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ConvertRoutingModule } from './convert-routing.module';
import { IndexConvertComponent } from './index-convert/index-convert.component';
import { CurrencyComponent } from './currency/currency.component';
import { LengthComponent } from './length/length.component';



@NgModule({
  declarations: [
    IndexConvertComponent,
    CurrencyComponent,
    LengthComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ConvertRoutingModule
  ]
})
export class ConvertModule { }
