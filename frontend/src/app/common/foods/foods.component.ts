import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
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
  constructor(readonly dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(FoodsSearchComponent, {
      width: '60%',
      height: '600px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`dialog result ${result}`);
    });
  }
}
