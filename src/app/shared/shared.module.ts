import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [CurrencyConverterComponent],
  exports: [
    CurrencyConverterComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ]
})
export class SharedModule { }
