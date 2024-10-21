import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { DailyNutrient } from '../../models/types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-daily-macros',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './daily-macros.component.html',
  styleUrl: './daily-macros.component.css',
})
export class DailyMacrosComponent implements OnInit {
  token = '';
  loading = true;
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
    } else {
      this.userData = this.emptyUserData;
      this.emptyUserData.addedDate = this.findDate
        .split('-')
        .reverse()
        .join('.');
    }
  }

  onPrevDate() {
    const date = this.findDate.split('-').reverse().join('.');
    const dateArr = date.split('.');
    let dateReduce = parseInt(dateArr[0]);
    dateReduce--;
    dateArr.shift();
    dateArr.unshift(dateReduce.toString());
    const joinedArr = dateArr.join('.');
    this.findDate = joinedArr;
    const foundData = this.allData.find(
      (item: any) => item.addedDate === joinedArr.split('-').reverse().join('.')
    );
    if (foundData) {
      this.userData = foundData;
    } else {
      this.userData = this.emptyUserData;
      this.emptyUserData.addedDate = this.findDate
        .split('-')
        .reverse()
        .join('.');
    }
  }

  onNextDate() {
    const date = this.findDate.split('-').reverse().join('.');
    const dateArr = date.split('.');
    let dateReduce = parseInt(dateArr[0]);
    dateReduce++;
    dateArr.shift();
    dateArr.unshift(dateReduce.toString());
    const joinedArr = dateArr.join('.');
    this.findDate = joinedArr;
    const foundData = this.allData.find(
      (item: any) => item.addedDate === joinedArr.split('-').reverse().join('.')
    );
    if (foundData) {
      this.userData = foundData;
    } else {
      this.userData = this.emptyUserData;
      this.emptyUserData.addedDate = this.findDate
        .split('-')
        .reverse()
        .join('.');
    }
  }
}
