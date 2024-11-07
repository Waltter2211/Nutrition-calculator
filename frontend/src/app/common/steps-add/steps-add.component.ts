import { Component, OnInit } from '@angular/core';
import { AddStepsToUserGQL } from '../../../../graphql/generated';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-steps-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './steps-add.component.html',
  styleUrl: './steps-add.component.css'
})
export class StepsAddComponent implements OnInit {

  token: string = ''
  stepsCount: number = 0

  constructor(private addStepsService: AddStepsToUserGQL, private stepsDialogRef: DialogRef<StepsAddComponent>, private toastr: ToastrService) {}

  ngOnInit(): void {
    const foundToken = localStorage.getItem('token');
    if (foundToken) {
      this.token = foundToken;
      console.log(this.token);
    }
  }

  onAddSteps(stepsAmount: number) {
    console.log(typeof stepsAmount)
    this.addStepsService.mutate({ input: { token: this.token, stepsCount: stepsAmount } }).subscribe({
      next: () => {
        this.toastr.success(`Added ${stepsAmount} steps`, 'Success', {
          closeButton: true,
          progressBar: true,
        });
        this.stepsDialogRef.close()
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
