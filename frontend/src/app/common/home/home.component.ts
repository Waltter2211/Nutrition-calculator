import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_USER } from '../../queries/getUserQuery';
import { UserDataType } from '../../models/types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private readonly apollo: Apollo) {}

  token = '';
  userData: UserDataType = {
    _id: '',
    username: '',
    email: '',
    password: '',
    dailyNutrients: [],
  };
  ngOnInit(): void {
    const foundToken = localStorage.getItem('token');
    if (foundToken) {
      this.token = foundToken;
      this.apollo
        .query({
          query: GET_USER,
          variables: {
            token: this.token,
          },
        })
        .subscribe({
          next: ({ data, loading }: any) => {
            if (!loading) {
              this.userData = data.getUser;
              console.log(this.userData.dailyNutrients);
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
