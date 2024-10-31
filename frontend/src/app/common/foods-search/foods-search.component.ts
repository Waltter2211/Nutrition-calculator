import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SearchFoodsGQL, GetAllFoodsGQL, SearchFoodsQuery, AddFoodToUserGQL, AddFoodToUserInput } from '../../../../graphql/generated';
import { MasterService } from '../../services/master.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-foods-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './foods-search.component.html',
  styleUrl: './foods-search.component.css',
})
export class FoodsSearchComponent implements OnInit {
  constructor(private service: MasterService, private searchFoodsService: SearchFoodsGQL, private addFoodService: AddFoodToUserGQL, private toastr: ToastrService) {}
  loading = false;
  foods: any;
  test = ''
  noFoods = false
  foodItem: any = ''
  token: string = ''
  gramsAmount: number = 100
  
  ngOnInit(): void {
    const foundToken = localStorage.getItem('token')
    if (foundToken) {
      this.token = foundToken
      console.log(this.token)
    }
  }

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
            } else {
              this.noFoods = false
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

  onSelectFood(food: any) {
    console.log(food)
    this.foods = []
    this.foodItem = food
  }

  addFood(mealItem: any) {
    const mealInputObj: AddFoodToUserInput = {
      foodId: mealItem._id,
      token: this.token,
      caloriesCount: Math.round((mealItem.calories*this.gramsAmount)/100),
      proteinsCount: Math.round((mealItem.proteins*this.gramsAmount)/100),
      carbohydratesCount: Math.round((mealItem.carbohydrates*this.gramsAmount)/100),
      fatsCount: Math.round((mealItem.fats*this.gramsAmount)/100),
      gramsEaten: this.gramsAmount
    }
    console.log(`food added ${mealInputObj}`)
    this.addFoodService.mutate({input: mealInputObj}).subscribe({
      next: () => {
        console.log('added food to user')
        this.toastr.success(`Added ${this.foodItem.name}`, 'success', {
          closeButton: true,
          progressBar: true
        })
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
