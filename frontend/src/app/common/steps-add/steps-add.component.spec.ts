import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsAddComponent } from './steps-add.component';

describe('StepsAddComponent', () => {
  let component: StepsAddComponent;
  let fixture: ComponentFixture<StepsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepsAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
