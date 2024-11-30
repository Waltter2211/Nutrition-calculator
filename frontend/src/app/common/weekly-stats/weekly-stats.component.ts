import { Component, Input, OnInit } from '@angular/core';
import { GetWeeklyDataGQL, NutrientCard } from '../../../../graphql/generated';
import { ShareDateService } from '../../services/share-date.service';
import { LoadingComponent } from '../loading/loading.component';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-weekly-stats',
  standalone: true,
  imports: [LoadingComponent, ErrorComponent],
  templateUrl: './weekly-stats.component.html',
  styleUrl: './weekly-stats.component.css',
})
export class WeeklyStatsComponent implements OnInit {
  constructor(
    private weeklyDataService: GetWeeklyDataGQL,
    private dateDataService: ShareDateService
  ) {}

  token = '';
  isError = false;
  weeklyData: any;
  dataDate = '';
  loading = false

  ngOnInit(): void {
    const foundToken = localStorage.getItem('token');
    if (foundToken) {
      this.dateDataService.currentDateData.subscribe(data => {
        this.dataDate = data
        this.onFetchWeeklyData(foundToken, this.dataDate)
      })
    } else {
      this.token = 'Error getting token';
    }
  }

  onFetchWeeklyData(foundToken: string, weeklyDataDate: string) {
    this.weeklyDataService.fetch({ token: foundToken, date: weeklyDataDate }).subscribe({
      next: ({ data, loading }) => {
        if (!loading && typeof data === 'object') {
          console.log(data.getWeeklyData)
          if (data.getWeeklyData !== null && data.getWeeklyData !== undefined) {
            this.weeklyData = [...data.getWeeklyData]
          }
        }
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
