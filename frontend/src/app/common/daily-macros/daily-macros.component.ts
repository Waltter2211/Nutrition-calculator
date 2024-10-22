import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { DailyNutrient } from '../../models/types';
import { FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { LoadingComponent } from '../loading/loading.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-daily-macros',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, LoadingComponent],
  templateUrl: './daily-macros.component.html',
  styleUrl: './daily-macros.component.css',
})
export class DailyMacrosComponent implements OnInit {
  token = '';
  loading = true;
  disableButton = true;
  currentDate = new Date().toISOString().substring(0, 10).toString();
  currentDateFormatted = this.currentDate.split('-').reverse().join('.');
  allData: DailyNutrient[] = [];
  emptyUserData: DailyNutrient = {
    _id: '',
    addedDate: '',
    dailyCalories: 0,
    dailyProteins: 0,
    dailyCarbohydrates: 0,
    dailyFats: 0,
    mealsList: [],
  };
  userData: DailyNutrient = {
    _id: '',
    addedDate: '',
    dailyCalories: 0,
    dailyProteins: 0,
    dailyCarbohydrates: 0,
    dailyFats: 0,
    mealsList: [],
  };
  findDate = new Date().toLocaleDateString();
  constructor(private service: MasterService) {}
  ngOnInit(): void {
    const foundToken = localStorage.getItem('token');
    if (foundToken) {
      this.token = foundToken;
      this.service.getUserDailyNutrients(this.token).valueChanges.subscribe({
        next: ({ data, loading }: any) => {
          this.loading = loading;
          if (!loading && typeof data === 'object') {
            this.allData = data.getUser.dailyNutrients;
            const todayData = data.getUser.dailyNutrients.find(
              (item: any) => item.addedDate === this.findDate
            );
            if (todayData) {
              this.userData = todayData;
              console.log(todayData)
            } else {
              console.log('add food first');
            }
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      console.log('error when fetching token');
    }
  }

  onClick() {
    const foundData = this.allData.find(
      (item: any) =>
        item.addedDate === this.findDate.split('-').reverse().join('.')
    );
    if (foundData) {
      this.userData = foundData;
      if (this.findDate >= new Date().toLocaleDateString()) {
        this.disableButton = true;
      } else {
        this.disableButton = false;
      }
    } else {
      this.userData = this.emptyUserData;
      this.emptyUserData.addedDate = this.findDate
        .split('-')
        .reverse()
        .join('.');
    }
  }
}
