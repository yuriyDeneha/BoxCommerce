import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-length-unit-converter',
  templateUrl: './length-unit-converter.component.html',
  styleUrls: ['./length-unit-converter.component.scss']
})
export class LengthUnitConverterComponent implements OnInit {
  unitForm: FormGroup;
  typeList: string[] = [ 'm', 'yd', 'in', 'ft', 'cm', 'km', 'ml' ];
  valueList: any = {
    m: 1,
    ft: 3.2808399,
    in: 39.3700787,
    yd: 1.0936133,
    cm: 100,
    km: 0.001,
    ml: 0.000621371192
  };
  Math = Math;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.unitForm = this.fb.group({
      fromValue: [0],
      fromType: ['', [ Validators.required ]],
      toValue: [0],
      toType: ['', [ Validators.required ]],
      coefficient: [null],
    });
  }

  get valueForOneItem(): number {
    return Math.round(this.unitForm.get('coefficient').value * 1000000) / 1000000 + this.unitForm.get('toType').value;
  }
}
