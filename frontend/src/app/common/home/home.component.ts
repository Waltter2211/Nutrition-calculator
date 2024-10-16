import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  token = '';
  ngOnInit(): void {
    const gotToken = localStorage.getItem('token')
    if (gotToken) {
      this.token = gotToken
    } else {
      this.token = 'Error getting token'
    }
  }

}
