import { Component, Input, OnInit } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
  @Input() selectName = 'Select';
  @Input() converterForm: FormGroup;
  @Input() typeList: string[] = [];
  @Input() valueList: any;

  constructor() { }

  ngOnInit(): void {
    this.convertOnChange();
  }

  convertOnChange(): void {
    Object.keys(this.converterForm.value).forEach(key => {
      this.converterForm.get(key).valueChanges
        .pipe(debounceTime(0))
        .subscribe(res => {
          if (key === 'fromValue' || key === 'toValue') {
            this.converterForm.get('fromValue').setValue(+this.converterForm.get('fromValue').value, {emitEvent: false});
            this.converterForm.get('toValue').setValue(+this.converterForm.get('toValue').value, {emitEvent: false});
          }
          if (this.converterForm.invalid) {
            return;
          }
          const roundTo = 10000;
          switch (key) {
            case 'fromType':
            case 'toType':
            case 'fromValue':
              this.converterForm.get('coefficient').setValue(this.valueList[this.converterForm.get('toType').value]
                / this.valueList[this.converterForm.get('fromType').value]);
              this.converterForm.get('toValue').setValue(Math.round((this.converterForm.get('coefficient').value * this.converterForm.get('fromValue').value) * roundTo)
                / roundTo, {emitEvent: false});
              break;
            case 'toValue':
              this.converterForm.get('coefficient').setValue(this.valueList[this.converterForm.get('fromType').value]
                / this.valueList[this.converterForm.get('toType').value]);
              this.converterForm.get('fromValue').setValue(Math.round((this.converterForm.get('coefficient').value * this.converterForm.get('toValue').value) * roundTo)
                / roundTo, {emitEvent: false});
              break;
          }
        });
    });
  }

  switchValues(): void {
    const prevValues = this.converterForm.value;
    this.converterForm.get('toType').setValue( prevValues?.fromType, {emitEvent: false});
    this.converterForm.get('fromType').setValue( prevValues?.toType);
  }
}
