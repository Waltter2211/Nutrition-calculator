import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodsSearchComponent } from './foods-search.component';

describe('FoodsSearchComponent', () => {
  let component: FoodsSearchComponent;
  let fixture: ComponentFixture<FoodsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodsSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
