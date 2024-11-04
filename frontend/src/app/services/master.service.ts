import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ADD_USER } from '../mutations/registerUserMutation';
import { LOGIN_USER } from '../mutations/loginUserMutation';
import { GET_USER } from '../queries/getUserQuery';
import { GET_USER_DAILY_NUTRIENTS } from '../queries/getUserDailyNutrientsQuery';
import { DELETE_MEAL_FROM_USER } from '../mutations/deleteMealFromUserMutation';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  constructor(private apollo: Apollo) {}

  isLoggedIn() {
    return localStorage.getItem('token') != null;
  }

  registerUser(input: any) {
    return this.apollo.mutate({
      mutation: ADD_USER,
      variables: {
        input,
      },
    });
  }

  loginUser(input: any) {
    return this.apollo.mutate({
      mutation: LOGIN_USER,
      variables: {
        input,
      },
    });
  }

  getUser(input: string) {
    return this.apollo.watchQuery({
      query: GET_USER,
      variables: {
        token: input,
      },
      pollInterval: 500,
    });
  }

  getUserDailyNutrients(input: string) {
    return this.apollo.watchQuery({
      query: GET_USER_DAILY_NUTRIENTS,
      variables: {
        token: input,
      },
      pollInterval: 500,
    });
  }

  deleteMealFromUser(input: any) {
    return this.apollo.mutate({
      mutation: DELETE_MEAL_FROM_USER,
      variables: {
        input,
      },
    });
  }
}
