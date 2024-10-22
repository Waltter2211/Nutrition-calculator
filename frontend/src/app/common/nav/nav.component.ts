import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit {
  token = '';
  loading = true;
  userData: any = {
    _id: '',
    username: '',
    email: '',
  };

  constructor(private service: MasterService) {}

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

  onLogout() {
    localStorage.clear();
    window.location.reload();
  }
}
