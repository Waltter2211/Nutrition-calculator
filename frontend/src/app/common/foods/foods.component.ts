import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { MasterService } from '../../services/master.service';
import { GetAllFoodsGQL, SearchFoodsGQL } from '../../../../graphql/generated';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { FoodsSearchComponent } from '../foods-search/foods-search.component';

@Component({
  selector: 'app-foods',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './foods.component.html',
  styleUrl: './foods.component.css',
})
export class FoodsComponent {
  readonly dialog = inject(MatDialog)

  openDialog() {
    const dialogRef = this.dialog.open(FoodsSearchComponent, { width: '60%', height: '600px' })
    dialogRef.afterClosed().subscribe(result => {
      console.log(`dialog result ${result}`)
    })
  }
}
