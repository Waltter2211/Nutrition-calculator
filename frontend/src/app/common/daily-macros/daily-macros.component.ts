import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoadingComponent } from '../loading/loading.component';
import { ErrorComponent } from '../error/error.component';
import { DailyNutrient, UserAllData, UserDailyStats } from '../../models/types';
import { ToastrService } from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {RoundProgressComponent} from 'angular-svg-round-progressbar';
import { GetUserDailyNutrientsGQL, GetUserDailyNutrientsQuery } from '../../../../graphql/generated';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-daily-macros',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    LoadingComponent,
    ErrorComponent,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RoundProgressComponent
  ],
  templateUrl: './daily-macros.component.html',
  styleUrl: './daily-macros.component.css',
})
export class DailyMacrosComponent implements OnInit {
  token = '';
  loading = true;
  isError = false;
  disableButton = true;
  currentDate = new Date().toISOString().substring(0, 10).toString();
  currentDateFormatted = this.currentDate.split('-').reverse().join('.');
  findDate = new Date().toLocaleDateString();

  userData: UserDailyStats = {
    goalCalories: 0,
    goalProteins: 0,
    goalCarbohydrates: 0,
    goalFats: 0,
    goalWater: 0,
    goalSteps: 0,
    dailyNutrients: {
      _id: '',
      addedDate: '',
      dailyCalories: 0,
      dailyProteins: 0,
      dailyCarbohydrates: 0,
      dailyFats: 0,
      mealsList: [],
    },
  };
  allData: UserAllData = {
    goalCalories: 0,
    goalProteins: 0,
    goalCarbohydrates: 0,
    goalFats: 0,
    goalWater: 0,
    goalSteps: 0,
    dailyNutrients: [],
  };

  emptyUserData: UserDailyStats = {
    goalCalories: 0,
    goalProteins: 0,
    goalCarbohydrates: 0,
    goalFats: 0,
    goalWater: 0,
    goalSteps: 0,
    dailyNutrients: {
      _id: '',
      addedDate: '',
      dailyCalories: 0,
      dailyProteins: 0,
      dailyCarbohydrates: 0,
      dailyFats: 0,
      mealsList: [],
    },
  };

  testObj: any

  constructor(private service: MasterService, private toastr: ToastrService) {}
  ngOnInit(): void {
    const foundToken = localStorage.getItem('token');
    if (foundToken) {
      this.token = foundToken;
      this.service.getUserDailyNutrients(this.token).valueChanges.subscribe({
        next: ({ data, loading }: any) => {
          this.loading = loading;
          if (!loading && typeof data === 'object') {
            this.allData = data.getUser;
            this.emptyUserData.goalCalories = data.getUser.goalCalories;
            this.emptyUserData.goalProteins = data.getUser.goalProteins;
            this.emptyUserData.goalCarbohydrates =
              data.getUser.goalCarbohydrates;
            this.emptyUserData.goalFats = data.getUser.goalFats;
            this.emptyUserData.goalWater = data.getUser.goalWater;
            this.emptyUserData.goalSteps = data.getUser.goalSteps;
            this.findDate = this.findDate.split('-').reverse().join('.');
            const todayData = data.getUser.dailyNutrients.find(
              (item: DailyNutrient) => item.addedDate === this.findDate
            );
            if (todayData) {
              this.userData = {
                ...data.getUser,
                dailyNutrients: todayData,
              };
            } else {
              console.log('add food first');
              this.userData = this.emptyUserData;
              this.emptyUserData.dailyNutrients.addedDate = this.findDate
                .split('-')
                .reverse()
                .join('.');
            }
          }
        },
        error: (error) => {
          console.log(error);
          this.isError = true;
        },
      });
    } else {
      console.log('error when fetching token');
    }
  }

  onClick() {
    const foundData = this.allData.dailyNutrients.find(
      (item: any) =>
        item.addedDate === this.findDate.split('-').reverse().join('.')
    );
    if (foundData) {
      this.userData = { ...this.allData, dailyNutrients: foundData };
    } else {
      this.userData = this.emptyUserData;
      this.emptyUserData.dailyNutrients.addedDate = this.findDate
        .split('-')
        .reverse()
        .join('.');
    }
  }

  onDelete(mealId: string, mealName: string) {
    const inputObj = {
      token: this.token,
      mealId: mealId,
    };
    this.service.deleteMealFromUser(inputObj).subscribe({
      next: ({ data, loading }) => {
        this.showSuccess(mealName);
      },
      error: (error) => {
        this.isError = true;
        console.log(error);
      },
    });
  }

  showSuccess(mealName: string) {
    this.toastr.success(`${mealName} deleted.`, 'Success', {
      closeButton: true,
      progressBar: true,
    });
  }
}
