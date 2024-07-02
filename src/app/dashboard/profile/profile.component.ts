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
        
      this.snackBar.open("Updated", "", { duration: 2000 }).afterDismissed().subscribe(() => {
        this.loading = false;
      });
      },
    error: (e) => {
      this.snackBar.open("Error, try again", "", { duration: 2000 }).afterDismissed().subscribe(() => {
        this.loading = false;
      })
    }
  });
};
}
}

export const TimeZones = [
  { "value": -12 * 60, "description": "-12 International Date Line" },
  { "value": -11 * 60, "description": "-11 Coordinated Time" },
  { "value": -10 * 60, "description": "-10 Hawaii-Aleutian Standard Time (HAST)" },
  { "value": -9 * 60, "description": "-9 Alaska Standard Time (AKST)" },
  { "value": -8 * 60, "description": "-8 Pacific Standard Time (PST)" },
  { "value": -7 * 60, "description": "-7 Mountain Standard Time (MST)" },
  { "value": -6 * 60, "description": "-6 Central Standard Time (CST)" },
  { "value": -5 * 60, "description": "-5 Eastern Standard Time (EST)" },
  { "value": -4 * 60 - 30, "description": "-4:30 Newfoundland Standard Time (NST)" },
  { "value": -4 * 60, "description": "-4 Atlantic Standard Time (AST)" },
  { "value": -3 * 60 - 30, "description": "-3:30 Newfoundland Daylight Time (NDT)" },
  { "value": -3 * 60, "description": "-3 Argentina Time (ART)" },
  { "value": -2 * 60, "description": "-2 Coordinated Universal Time (UTC-2)" },
  { "value": -1 * 60, "description": "-1 Azores Standard Time (AZOT)" },
  { "value": 0, "description": "0 Greenwich Mean Time (GMT)" },
  { "value": 1 * 60, "description": "+1 Central European Time (CET)" },
  { "value": 2 * 60, "description": "+2 Eastern European Time (EET)" },
  { "value": 3 * 60, "description": "+3 Moscow Standard Time (MSK)" },
  { "value": 3 * 60 + 30, "description": "+3:30 Iran Standard Time (IRST)" },
  { "value": 4 * 60, "description": "+4 Samara Time (SAMT)" },
  { "value": 4 * 60 + 30, "description": "+4:30 Afghanistan Time (AFT)" },
  { "value": 5 * 60, "description": "+5 Yekaterinburg Time (YEKT)" },
  { "value": 5 * 60 + 30, "description": "+5:30 Indian Standard Time (IST)" },
  { "value": 5 * 60 + 45, "description": "+5:45 Nepal Time (NPT)" },
  { "value": 6 * 60, "description": "+6 Omsk Time (OMST)" },
  { "value": 6 * 60 + 30, "description": "+6:30 Myanmar Time (MMT)" },
  { "value": 7 * 60, "description": "+7 Krasnoyarsk Time (KRAT)" },
  { "value": 8 * 60, "description": "+8 Irkutsk Time (IRKT)" },
  { "value": 8 * 60 + 45, "description": "+8:45 Australian Central Western Standard Time (ACWST)" },
  { "value": 9 * 60, "description": "+9 Yakutsk Time (YAKT)" },
  { "value": 9 * 60 + 30, "description": "+9:30 Australian Central Standard Time (ACST)" },
  { "value": 10 * 60, "description": "+10 Vladivostok Time (VLAT)" },
  { "value": 10 * 60 + 30, "description": "+10:30 Lord Howe Standard Time (LHST)" },
  { "value": 11 * 60, "description": "+11 Srednekolymsk Time (SRET)" },
  { "value": 12 * 60, "description": "+12 Kamchatka Time (PETT)" },
  { "value": 12 * 60 + 45, "description": "+12:45 Chatham Islands Time (CHAST)" },
  { "value": 13 * 60, "description": "+13 Tonga Time (TOT)" }
];