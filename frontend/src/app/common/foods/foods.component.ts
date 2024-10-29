import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { MasterService } from '../../services/master.service';
import { GetAllFoodsGQL, SearchFoodsGQL } from '../../../../graphql/generated';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-foods',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './foods.component.html',
  styleUrl: './foods.component.css',
})
export class FoodsComponent {
  constructor(private service: MasterService, private searchFoodsService: SearchFoodsGQL, private getAllFoods: GetAllFoodsGQL) {}
  loading = false;
  foods: any;
  test = ''
  noFoods = false

  onSearch(event: any) {
    if (event.target.value) {
      const foodsName = event.target.value
      this.searchFoodsService.fetch({ foodsName }).subscribe({
        next: ({ data, loading }) => {
          this.loading = true
          if (!loading) {
            this.noFoods = false
            this.loading = loading
            this.foods = data.searchFoods
            if (this.foods.length === 0) {
              this.noFoods = true
            }
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      this.foods = []
      /* this.getAllFoods.fetch().subscribe({
        next: ({ data, loading }) => {
          this.loading = true
          if (!loading) {
            this.loading = loading
            console.log(data.getAllFoods)
            this.foods = data.getAllFoods
          }
        },
        error: (error) => {
          console.log(error)
        }
      }) */
    }
  }
}
