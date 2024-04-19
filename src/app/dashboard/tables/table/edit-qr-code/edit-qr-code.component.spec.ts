import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQrCodeComponent } from './edit-qr-code.component';

describe('EditQrCodeComponent', () => {
  let component: EditQrCodeComponent;
  let fixture: ComponentFixture<EditQrCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditQrCodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditQrCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
