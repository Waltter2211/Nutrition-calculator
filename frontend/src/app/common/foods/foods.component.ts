import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-foods',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './foods.component.html',
  styleUrl: './foods.component.css',
})
export class FoodsComponent implements OnInit {

  calorieGoal = 2500
  dailyCalories = 2000

  source = interval(15);
  counter$ = this.source.pipe(
    take(((this.dailyCalories / this.calorieGoal)*100)),
    map((value) => value + 1)
  );
  ngOnInit(): void {
  }
}
