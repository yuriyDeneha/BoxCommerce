import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConvertRoutingModule } from './convert-routing.module';
import { IndexConvertComponent } from './index-convert/index-convert.component';
import { CurrencyComponent } from './currency/currency.component';
import { LengthComponent } from './length/length.component';
import {SharedModule} from '../shared/shared.module';



@NgModule({
  declarations: [
    IndexConvertComponent,
    CurrencyComponent,
    LengthComponent
  ],
  imports: [
    CommonModule,
    ConvertRoutingModule,
    SharedModule
  ]
})
export class ConvertModule { }
