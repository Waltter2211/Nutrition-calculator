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
export class FoodsComponent {

}
