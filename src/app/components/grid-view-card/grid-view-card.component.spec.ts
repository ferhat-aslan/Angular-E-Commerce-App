import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridViewCardComponent } from './grid-view-card.component';

describe('GridViewCardComponent', () => {
  let component: GridViewCardComponent;
  let fixture: ComponentFixture<GridViewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridViewCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridViewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
