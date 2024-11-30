import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
import { RoundProgressComponent } from 'angular-svg-round-progressbar';
import {
  AddNutrientCardGQL,
  AddWaterToUserGQL,
} from '../../../../graphql/generated';
import { MatDialog } from '@angular/material/dialog';
import { StepsAddComponent } from '../steps-add/steps-add.component';
import { FoodsSearchComponent } from '../foods-search/foods-search.component';
import { ShareDateService } from '../../services/share-date.service';

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
    RoundProgressComponent,
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
  findDate = new Date()
    .toISOString()
    .substring(0, 10)
    .split('-')
    .reverse()
    .join('.');
  isCurrentDate = false;

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
      dailyWater: 0,
      dailySteps: 0,
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
      dailyWater: 0,
      dailySteps: 0,
      mealsList: [],
    },
  };

  constructor(
    private service: MasterService,
    private addNutrientCardService: AddNutrientCardGQL,
    private addWaterService: AddWaterToUserGQL,
    readonly dialog: MatDialog,
    private toastr: ToastrService,
    private dateDataService: ShareDateService
  ) {}

  ngOnInit(): void {
    const foundToken = localStorage.getItem('token');
    if (foundToken) {
      this.token = foundToken;
      this.addNutrientCardService
        .mutate({ input: { token: this.token } })
        .subscribe({
          next: () => {
            console.log('success');
          },
          error: (error) => {
            console.log(error);
          },
        });
      this.service.getUserDailyNutrients(this.token).valueChanges.subscribe({
        next: ({ data, loading }: any) => {
          this.fetchUserNutritionData(data, loading);
          this.onShareDate()
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

  onShareDate() {
    this.dateDataService.setDateData(this.findDate.split('-').reverse().join('.'))
  }

  onSwapDate() {
    const foundData = this.allData.dailyNutrients.find(
      (item: any) =>
        item.addedDate === this.findDate.split('-').reverse().join('.')
    );
    if (foundData) {
      this.findDate !== this.currentDate ? this.isCurrentDate = true : this.isCurrentDate = false
      this.userData = { ...this.allData, dailyNutrients: foundData };
      this.onShareDate()
    } else {
      this.userData = this.emptyUserData;
      this.emptyUserData.dailyNutrients.addedDate = this.findDate
        .split('-')
        .reverse()
        .join('.');
      this.findDate !== this.currentDate ? this.isCurrentDate = true : this.isCurrentDate = false
      this.onShareDate()
    }
  }

  onAddFood() {
    const foodDialogRef = this.dialog.open(FoodsSearchComponent, {
      width: '60%',
      height: '600px',
    });
    foodDialogRef.afterClosed().subscribe((result) => {
      console.log(`dialog result ${result}`);
    });
  }

  onAddWater() {
    this.addWaterService.mutate({ input: { token: this.token } }).subscribe({
      next: () => {
        this.toastr.success('Successfully added water', 'Success');
      },
      error(error) {
        console.log(error);
      },
    });
  }

  onAddSteps() {
    const stepsDialogRef = this.dialog.open(StepsAddComponent, {
      width: '60%',
      height: '300px',
    });
    stepsDialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
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

  fetchUserNutritionData(dataArr: any, loadingBool: boolean) {
    this.loading = loadingBool;
    if (!loadingBool && typeof dataArr === 'object') {
      this.allData = dataArr.getUser;
      this.emptyUserData.goalCalories = dataArr.getUser.goalCalories;
      this.emptyUserData.goalProteins = dataArr.getUser.goalProteins;
      this.emptyUserData.goalCarbohydrates = dataArr.getUser.goalCarbohydrates;
      this.emptyUserData.goalFats = dataArr.getUser.goalFats;
      this.emptyUserData.goalWater = dataArr.getUser.goalWater;
      this.emptyUserData.goalSteps = dataArr.getUser.goalSteps;
      this.findDate = this.findDate.split('-').reverse().join('.');
      const todayData = dataArr.getUser.dailyNutrients.find(
        (item: DailyNutrient) => {
          return item.addedDate === this.findDate;
        }
      );
      if (todayData) {
        this.userData = {
          ...dataArr.getUser,
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
  }
}
