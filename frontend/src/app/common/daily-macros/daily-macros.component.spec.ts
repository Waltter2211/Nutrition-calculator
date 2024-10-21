import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyMacrosComponent } from './daily-macros.component';

describe('DailyMacrosComponent', () => {
  let component: DailyMacrosComponent;
  let fixture: ComponentFixture<DailyMacrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyMacrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyMacrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
