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
  availableCurrencies: any;
  Math = Math;
  Period = Period;
  showChart: boolean;

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
      fromType: ['', [ Validators.required ]],
      toValue: [0],
      toType: ['', [ Validators.required ]],
      coefficient: [null],
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
        .subscribe(() => {
          if (this.currencyForm.invalid) {
            return;
          }
          switch (key) {
            case 'fromType':
            case 'toType':
            case 'period':
              this.getHistory();
          }
        });
    });
  }

  getHistory(): void {
    this.showChart = this.currencyForm.get('fromType').value !== this.currencyForm.get('toType').value;
    const days = this.currencyForm.get('period').value;
    const date = new Date();
    date.setDate(date.getDate() - (days - 1));
    this.currencyService.getHistory(date, new Date()).subscribe(res => {
      const data = [];
      const labels = [];
      Object.keys(res?.rates).sort().forEach(rate => {
        labels.push(rate);
        // or 1 for EUR
        data.push((res?.rates[rate]?.[this.currencyForm.get('toType').value] || 1)
        / (res?.rates[rate]?.[this.currencyForm.get('fromType').value] || 1));
      });
      this.lineChartData = [
        {
          data,
          label: `${this.currencyForm.get('fromType').value} to ${this.currencyForm.get('toType').value}`
        }
      ];
      this.lineChartLabels = labels;
    });
  }
}

enum Period {
  week = 7,
  month = 30,
  year = 365
}
