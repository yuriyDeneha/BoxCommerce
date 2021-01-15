import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {LengthUnitsConverterItems} from './length-unit-converter.constants';
import {UnitsEnum} from '../enums/units.enum';
import {MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-length-unit-converter',
  templateUrl: './length-unit-converter.component.html',
  styleUrls: ['./length-unit-converter.component.scss']
})
export class LengthUnitConverterComponent implements AfterViewInit {

  @ViewChild('matSelectFirst') matSelectFirst: MatSelect;
  @ViewChild('matSelectSecond') matSelectSecond: MatSelect;

  public selectedFirstDropdownValue: string;
  public selectedSecondDropdownValue: string;

  public lengthUnitsConverterItems = LengthUnitsConverterItems;
  public initialValue: number;
  public calculatedResult: number;
  public initUnits: number | string;
  public calculatedUnits: number | string;

  public calculateResult(): void {
    if (!this.initialValue || !this.initUnits || !this.calculatedUnits) {
      return;
    }
    if (this.initUnits === UnitsEnum.Feets) {
      switch (this.calculatedUnits) {
        case UnitsEnum.Feets: {
          this.calculatedResult = this.initialValue;
          break;
        }
        case UnitsEnum.Inches: {
          this.calculatedResult = this.initialValue * 12;
          break;
        }
        case UnitsEnum.Meters: {
          this.calculatedResult = this.initialValue / 3.2808;
          break;
        }
        case UnitsEnum.Yards: {
          this.calculatedResult = this.initialValue * 0.33333;
          break;
        }
        case UnitsEnum.Centimeters: {
          this.calculatedResult = this.initialValue / 0.032808;
          break;
        }
        case UnitsEnum.Kilometers: {
          this.calculatedResult = this.initialValue / 3280.8;
          break;
        }
        case UnitsEnum.Miles: {
          this.calculatedResult = this.initialValue * 0.00018939;
          break;
        }
      }
    } else if (this.initUnits === UnitsEnum.Meters) {
      switch (this.calculatedUnits) {
        case UnitsEnum.Feets: {
          this.calculatedResult = this.initialValue * 3.2808;
          break;
        }
        case UnitsEnum.Inches: {
          this.calculatedResult = this.initialValue * 39.370;
          break;
        }
        case UnitsEnum.Meters: {
          this.calculatedResult = this.initialValue;
          break;
        }
        case UnitsEnum.Yards: {
          this.calculatedResult = this.initialValue * 1.0936;
          break;
        }
        case UnitsEnum.Centimeters: {
          this.calculatedResult = this.initialValue / 0.01;
          break;
        }
        case UnitsEnum.Kilometers: {
          this.calculatedResult = this.initialValue / 100;
          break;
        }
        case UnitsEnum.Miles: {
          this.calculatedResult = this.initialValue * 0.00062137;
          break;
        }
      }
    } else if (this.initUnits === UnitsEnum.Inches) {
      switch (this.calculatedUnits) {
        case UnitsEnum.Feets: {
          this.calculatedResult = this.initialValue * 0.083333;
          break;
        }
        case UnitsEnum.Inches: {
          this.calculatedResult = this.initialValue;
          break;
        }
        case UnitsEnum.Meters: {
          this.calculatedResult = this.initialValue / 39.370;
          break;
        }
        case UnitsEnum.Yards: {
          this.calculatedResult = this.initialValue * 0.027778;
          break;
        }
        case UnitsEnum.Centimeters: {
          this.calculatedResult = this.initialValue / 0.39370;
          break;
        }
        case UnitsEnum.Kilometers: {
          this.calculatedResult = this.initialValue / 39370;
          break;
        }
        case UnitsEnum.Miles: {
          this.calculatedResult = this.initialValue * 0.000015783;
          break;
        }
      }
    } else if (this.initUnits === UnitsEnum.Yards) {
      switch (this.calculatedUnits) {
        case UnitsEnum.Yards: {
          this.calculatedResult = this.initialValue;
          break;
        }
        case UnitsEnum.Feets: {
          this.calculatedResult = this.initialValue * 3;
          break;
        }
        case UnitsEnum.Inches: {
          this.calculatedResult = this.initialValue * 36;
          break;
        }
        case UnitsEnum.Meters: {
          this.calculatedResult = this.initialValue / 1.0936;
          break;
        }
        case UnitsEnum.Centimeters: {
          this.calculatedResult = this.initialValue / 0.010936;
          break;
        }
        case UnitsEnum.Kilometers: {
          this.calculatedResult = this.initialValue / 1093.6;
          break;
        }
        case UnitsEnum.Miles: {
          this.calculatedResult = this.initialValue * 0.00056818;
          break;
        }
      }
    } else if (this.initUnits === UnitsEnum.Centimeters) {
      switch (this.calculatedUnits) {
        case UnitsEnum.Centimeters: {
          this.calculatedResult = this.initialValue;
          break;
        }
        case UnitsEnum.Feets: {
          this.calculatedResult = this.initialValue * 0.032808;
          break;
        }
        case UnitsEnum.Inches: {
          this.calculatedResult = this.initialValue * 0.39370;
          break;
        }
        case UnitsEnum.Meters: {
          this.calculatedResult = this.initialValue / 100;
          break;
        }
        case UnitsEnum.Yards: {
          this.calculatedResult = this.initialValue * 0.010936;
          break;
        }
        case UnitsEnum.Kilometers: {
          this.calculatedResult = this.initialValue / 100000;
          break;
        }
        case UnitsEnum.Miles: {
          this.calculatedResult = this.initialValue * 0.0000062137;
          break;
        }
      }
    } else if (this.initUnits === UnitsEnum.Kilometers) {
      switch (this.calculatedUnits) {
        case UnitsEnum.Kilometers: {
          this.calculatedResult = this.initialValue;
          break;
        }
        case UnitsEnum.Feets: {
          this.calculatedResult = this.initialValue * 3280.8;
          break;
        }
        case UnitsEnum.Inches: {
          this.calculatedResult = this.initialValue * 39370;
          break;
        }
        case UnitsEnum.Meters: {
          this.calculatedResult = this.initialValue * 1000;
          break;
        }
        case UnitsEnum.Yards: {
          this.calculatedResult = this.initialValue * 1093.6;
          break;
        }
        case UnitsEnum.Centimeters: {
          this.calculatedResult = this.initialValue * 100000;
          break;
        }
        case UnitsEnum.Miles: {
          this.calculatedResult = this.initialValue * 0.62137;
          break;
        }
      }
    }
    else if (this.initUnits === UnitsEnum.Miles) {
      switch (this.calculatedUnits) {
        case UnitsEnum.Miles: {
          this.calculatedResult = this.initialValue;
          break;
        }
        case UnitsEnum.Feets: {
          this.calculatedResult = this.initialValue * 5280;
          break;
        }
        case UnitsEnum.Inches: {
          this.calculatedResult = this.initialValue * 63360;
          break;
        }
        case UnitsEnum.Meters: {
          this.calculatedResult = this.initialValue / 0.00062137;
          break;
        }
        case UnitsEnum.Yards: {
          this.calculatedResult = this.initialValue * 1760;
          break;
        }
        case UnitsEnum.Centimeters: {
          this.calculatedResult = this.initialValue / 0.0000062137;
          break;
        }
        case UnitsEnum.Kilometers: {
          this.calculatedResult = this.initialValue / 0.62137;
          break;
        }
      }
    }
  }

  ngAfterViewInit(): any {
    this.matSelectFirst.valueChange.subscribe((value) => this.selectedFirstDropdownValue = value);
    this.matSelectSecond.valueChange.subscribe((value) => this.selectedSecondDropdownValue = value);
  }

  public swapUnits(): void {
    const initTemporaryUnit = this.initUnits;
    this.initUnits = this.calculatedUnits;
    this.calculatedUnits = initTemporaryUnit;
    const sel = this.selectedFirstDropdownValue;
    this.selectedFirstDropdownValue = this.selectedSecondDropdownValue;
    this.selectedSecondDropdownValue = sel;
    this.calculateResult();
  }
}
