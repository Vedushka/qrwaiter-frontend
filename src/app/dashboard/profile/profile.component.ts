import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RestaurantDTO, RestaurantService } from '../../services/restaurant.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDividerModule, MatIconModule,
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatSelectModule, MatCheckboxModule, MatProgressBarModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

private restaurant!: RestaurantDTO;
  timeZones = TimeZones;
  constructor(
    private restaurantService: RestaurantService,
    private snackBar: MatSnackBar
  ) {
    this.restaurantService.getRestaurant().subscribe({
      next: restaurant => {
        this.restaurant = restaurant;

this.form.get("name")?.setValue(this.restaurant.name);
this.form.get("companyName")?.setValue(this.restaurant.companyName);
this.form.get("description")?.setValue(this.restaurant.description);
this.form.get("street")?.setValue(this.restaurant.address.street);
this.form.get("buildingNumber")?.setValue(this.restaurant.address.buildingNumber);
this.form.get("city")?.setValue(this.restaurant.address.city);
this.form.get("zipCode")?.setValue(this.restaurant.address.zipCode);
this.form.get("timeZone")?.setValue(this.restaurant.timeZoneMinutes);
this.form.get("notifyNe")?.setValue(this.restaurant.notifyMe); // I assumed there's a typo in "notifyNe" in your code

      },
      error: err => {
        console.error(err);
      }
    })
}

loading = false;
form = new FormGroup({
  name: new FormControl('', [Validators.required]),
  companyName: new FormControl('', [Validators.required]),
  description: new FormControl(''),
  street: new FormControl('', [Validators.required]),
  buildingNumber: new FormControl('', [Validators.required]),
  city: new FormControl('', [Validators.required]),
  zipCode: new FormControl('', [Validators.required]),
  timeZone: new FormControl<number>(0, [Validators.required]),
  notifyNe: new FormControl(false, [Validators.required]),
});


onSubmit() {
  this.loading = true;
  if(this.restaurant){

    this.restaurant.name = this.form.get("name")?.getRawValue();
    this.restaurant.companyName = this.form.get("companyName")?.getRawValue();
    this.restaurant.description = this.form.get("description")?.getRawValue();
      this.restaurant.address.street = this.form.get("street")?.getRawValue();
      this.restaurant.address.buildingNumber = this.form.get("buildingNumber")?.getRawValue();
      this.restaurant.address.city = this.form.get("city")?.getRawValue();
      this.restaurant.address.zipCode = this.form.get("zipCode")?.getRawValue();
    this.restaurant.timeZoneMinutes = this.form.get("timeZone")?.getRawValue();
    this.restaurant.notifyMe = this.form.get("notifyNe")?.getRawValue();
    
    this.restaurantService.updateRestaurant(this.restaurant).subscribe({
      next: (response) => {
        
      this.snackBar.open("Данные успешно обновлены", "", { duration: 2000 }).afterDismissed().subscribe(() => {
        this.loading = false;
      });
      },
    error: (e) => {
      this.snackBar.open("Ошибка, попробуйте еще раз", "", { duration: 2000 }).afterDismissed().subscribe(() => {
        this.loading = false;
      })
    }
  });
};
}
}

export const TimeZones = [
  { "value": -12 * 60, "description": "-12 Международная линия перемены даты" },
  { "value": -11 * 60, "description": "-11 Координированное время" },
  { "value": -10 * 60, "description": "-10 Гавайско-Алеутское время" },
  { "value": -9 * 60, "description": "-9 Аляскинское время" },
  { "value": -8 * 60, "description": "-8 Тихоокеанское время" },
  { "value": -7 * 60, "description": "-7 Горное время" },
  { "value": -6 * 60, "description": "-6 Центральное время" },
  { "value": -5 * 60, "description": "-5 Восточное время" },
  { "value": -4 * 60 - 30, "description": "-4:30 Время полуострова Ньюфаундленд" },
  { "value": -4 * 60, "description": "-4 Атлантическое время" },
  { "value": -3 * 60 - 30, "description": "-3:30 Ньюфаундлендское время" },
  { "value": -3 * 60, "description": "-3 Аргентинское время" },
  { "value": -2 * 60, "description": "-2 Координированное время" },
  { "value": -1 * 60, "description": "-1 Азорское время" },
  { "value": 0, "description": "0 Западноевропейское время" },
  { "value": 1 * 60, "description": "+1 Центральноевропейское время" },
  { "value": 2 * 60, "description": "+2 Восточноевропейское время" },
  { "value": 3 * 60, "description": "+3 Московское время" },
  { "value": 3 * 60 + 30, "description": "+3:30 Иранское время" },
  { "value": 4 * 60, "description": "+4 Самарское время" },
  { "value": 4 * 60 + 30, "description": "+4:30 Афганское время" },
  { "value": 5 * 60, "description": "+5 Екатеринбургское время" },
  { "value": 5 * 60 + 30, "description": "+5:30 Индийское время" },
  { "value": 5 * 60 + 45, "description": "+5:45 Непальское время" },
  { "value": 6 * 60, "description": "+6 Омское время" },
  { "value": 6 * 60 + 30, "description": "+6:30 Мьянманское время" },
  { "value": 7 * 60, "description": "+7 Красноярское время" },
  { "value": 8 * 60, "description": "+8 Иркутское время" },
  { "value": 8 * 60 + 45, "description": "+8:45 Западноавстралийское время" },
  { "value": 9 * 60, "description": "+9 Якутское время" },
  { "value": 9 * 60 + 30, "description": "+9:30 Центральноавстралийское время" },
  { "value": 10 * 60, "description": "+10 Владивостокское время" },
  { "value": 10 * 60 + 30, "description": "+10:30 Лорд-Хау-Айлендское время" },
  { "value": 11 * 60, "description": "+11 Среднеколымское время" },
  { "value": 12 * 60, "description": "+12 Камчатское время" },
  { "value": 12 * 60 + 45, "description": "+12:45 Чатемское время" },
  { "value": 13 * 60, "description": "+13 Линия перемены даты" }
];