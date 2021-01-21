import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ChartsModule } from 'ng2-charts';

import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import { ConverterComponent } from './converter/converter.component';
import { LengthUnitConverterComponent } from './length-unit-converter/length-unit-converter.component';


@NgModule({
  declarations: [
    CurrencyConverterComponent,
    ConverterComponent,
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
    MatButtonToggleModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SharedModule { }
