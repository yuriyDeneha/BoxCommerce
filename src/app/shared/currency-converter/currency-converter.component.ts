import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { CurrencyService } from '../services/currency.service';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {
  currencyForm: FormGroup;
  currencyList: string[] = [];
  availableCurrencies: any[] = [];
  coefficient: number;
  Period = Period;
  showChat: boolean;

  lineChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false
  };
  lineChartLabels = [];
  lineChartData = [];

  constructor(
    private fb: FormBuilder,
    private currencyService: CurrencyService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getLatest();
    this.convertCurrency();
  }

  createForm(): void {
    this.currencyForm = this.fb.group({
      fromValue: [0],
      fromCurrency: ['', [ Validators.required ]],
      toValue: [0],
      toCurrency: ['', [ Validators.required ]],
      period: [Period.month]
    });
  }

  getLatest(): void {
    this.currencyService.getLatest().subscribe(res => {
      this.currencyList = ['EUR', ...Object.keys(res.rates)];
      this.availableCurrencies = {EUR: 1, ...res.rates};
    });
  }

  convertCurrency(): void {
    Object.keys(this.currencyForm.value).forEach(key => {
      this.currencyForm.get(key).valueChanges
        .pipe(debounceTime(0))
        .subscribe(res => {
          if (key === 'fromValue' || key === 'toValue') {
            this.currencyForm.get('fromValue').setValue(+this.currencyForm.get('fromValue').value, {emitEvent: false});
            this.currencyForm.get('toValue').setValue(+this.currencyForm.get('toValue').value, {emitEvent: false});
          }
          if (this.currencyForm.invalid) {
            return;
          }
          const roundTo = 10000;
          switch (key) {
            case 'fromCurrency':
            case 'toCurrency':
              this.getHistory();
            // tslint:disable-next-line:no-switch-case-fall-through
            case 'fromValue':
              this.coefficient = this.availableCurrencies[this.currencyForm.get('toCurrency').value]
                / this.availableCurrencies[this.currencyForm.get('fromCurrency').value];
              this.currencyForm.get('toValue').setValue(Math.round((this.coefficient * this.currencyForm.get('fromValue').value) * roundTo)
                / roundTo, {emitEvent: false});
              break;
            case 'toValue':
              this.coefficient = this.availableCurrencies[this.currencyForm.get('fromCurrency').value]
                / this.availableCurrencies[this.currencyForm.get('toCurrency').value];
              this.currencyForm.get('fromValue').setValue(Math.round((this.coefficient * this.currencyForm.get('toValue').value) * roundTo)
              / roundTo, {emitEvent: false});
              break;
            case 'period':
              this.getHistory();
          }
        });
    });
  }

  switchValues(): void {
    const prevValues = this.currencyForm.value;
    this.currencyForm.patchValue({
      fromCurrency: prevValues?.toCurrency,
      toCurrency: prevValues?.fromCurrency
    });
    this.getHistory();
  }

  getHistory(): void {
    this.showChat = this.currencyForm.get('fromCurrency').value !== this.currencyForm.get('toCurrency').value;
    const days = this.currencyForm.get('period').value;
    const date = new Date();
    date.setDate(date.getDate() - (days - 1));
    this.currencyService.getHistory(date, new Date()).subscribe(res => {
      const data = [];
      const labels = [];
      Object.keys(res?.rates).sort().forEach(rate => {
        labels.push(rate);
        data.push(res?.rates[rate]?.[this.currencyForm.get('toCurrency').value] || 1
        / res?.rates[rate]?.[this.currencyForm.get('fromCurrency').value] || 1);
      });
      this.lineChartData = [
        {
          data,
          label: `${this.currencyForm.get('fromCurrency').value} to ${this.currencyForm.get('toCurrency').value}`
        }
      ];
      this.lineChartLabels = labels;
      // console.log(this.lineChartData);
      // console.log(this.lineChartLabels);
    });
  }
}

enum Period {
  week = 7,
  month = 30,
  year = 365
}
