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
  Period = Period;

  lineChartOptions = {
    // scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false
  };
  lineChartLabels = [];
  // public lineChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  lineChartType = 'line';
  // public lineChartLegend = true;
  lineChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
  ];

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
      fromValue: [0, [ Validators.min(0), Validators.required ]],
      fromCurrency: ['', [ Validators.required ]],
      toValue: [0, [ Validators.min(0), Validators.required ]],
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
          if (key === 'period' && (this.currencyForm.get('fromCurrency').valid && this.currencyForm.get('toCurrency').valid)) {
            this.getHistory();
          }
          if (this.currencyForm.invalid) {
            return;
          }
          switch (key) {
            case 'fromCurrency':
            case 'toCurrency':
              this.getHistory();
            // tslint:disable-next-line:no-switch-case-fall-through
            case 'fromValue':
              const coefficient1 = this.availableCurrencies[this.currencyForm.get('toCurrency').value]
                / this.availableCurrencies[this.currencyForm.get('fromCurrency').value];
              this.currencyForm.get('toValue').setValue((coefficient1 * this.currencyForm.get('fromValue').value)
                .toFixed(4), {emitEvent: false});
              break;
            case 'toValue':
              const coefficient2 = this.availableCurrencies[this.currencyForm.get('fromCurrency').value]
                / this.availableCurrencies[this.currencyForm.get('toCurrency').value];
              this.currencyForm.get('fromValue').setValue((coefficient2 * this.currencyForm.get('toValue').value)
                .toFixed(4), {emitEvent: false});
              break;
          }
        });
    });
  }

  switchValues(): void {
    const prevValues = this.currencyForm.value;
    this.currencyForm.setValue({
      fromValue: prevValues?.toValue,
      fromCurrency: prevValues?.toCurrency,
      toValue: prevValues?.fromValue,
      toCurrency: prevValues?.fromCurrency,
      period: prevValues?.period
    }, {emitEvent: false});
    this.getHistory();
  }

  getHistory(): void {
    const days = this.currencyForm.get('period').value;
    const date = new Date();
    date.setDate(date.getDate() - (days - 1));
    this.currencyService.getHistory(date, new Date()).subscribe(res => {
      console.log(res);
      const data = [];
      Object.keys(res?.rates).forEach(rate => {
        console.log(res?.rates[rate]);
        data.push(res?.rates[rate][this.currencyForm.get('toCurrency').value]
        / res?.rates[rate][this.currencyForm.get('fromCurrency').value]);
      });
      this.lineChartData = [
        {
          data,
          label: `${this.currencyForm.get('fromCurrency').value} to ${this.currencyForm.get('toCurrency').value}`
        }
      ];
      console.log(this.lineChartData);
    });
  }
}

enum Period {
  week = 7,
  month = 30,
  year = 365
}
