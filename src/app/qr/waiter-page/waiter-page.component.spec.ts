import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterPageComponent } from './waiter-page.component';

describe('WaiterPageComponent', () => {
  let component: WaiterPageComponent;
  let fixture: ComponentFixture<WaiterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaiterPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WaiterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
