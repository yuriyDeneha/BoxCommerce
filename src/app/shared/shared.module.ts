import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ChartsModule } from 'ng2-charts';

import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import { LengthUnitConverterComponent } from './length-unit-converter/length-unit-converter/length-unit-converter.component';


@NgModule({
  declarations: [
    CurrencyConverterComponent,
    LengthUnitConverterComponent
  ],
  exports: [
    CurrencyConverterComponent,
    LengthUnitConverterComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ChartsModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonToggleModule
  ]
})
export class SharedModule { }
