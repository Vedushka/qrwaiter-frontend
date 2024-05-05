import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSubscribeComponent } from './table-subscribe.component';

describe('TableSubscribeComponent', () => {
  let component: TableSubscribeComponent;
  let fixture: ComponentFixture<TableSubscribeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableSubscribeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableSubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
