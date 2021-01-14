import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import {MatButtonModule} from '@angular/material/button';
import { LengthUnitConverterComponent } from './length-unit-converter/length-unit-converter/length-unit-converter.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


@NgModule({
  declarations: [CurrencyConverterComponent, LengthUnitConverterComponent],
  exports: [
    CurrencyConverterComponent,
    LengthUnitConverterComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonToggleModule
  ]
})
export class SharedModule { }
