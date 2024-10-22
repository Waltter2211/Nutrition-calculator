import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';
import { MasterService } from '../../services/master.service';
import { DailyMacrosComponent } from '../daily-macros/daily-macros.component';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavComponent, DailyMacrosComponent, LoadingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  token = '';
  loading = true;
  userData: any = {
    _id: '',
    username: '',
    email: '',
  };
  constructor(
    private readonly apollo: Apollo,
    private service: MasterService
  ) {}

  ngOnInit(): void {
    const foundToken = localStorage.getItem('token');
    if (foundToken) {
      this.token = foundToken;
      this.service.getUser(this.token).valueChanges.subscribe({
        next: ({ data, loading }: any) => {
          this.loading = loading;
          if (!loading && typeof data === 'object') {
            this.userData = data.getUser;
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      this.token = 'Error getting token';
    }
  }
}
