import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookingComponent } from './booking/booking.component';
import { CancelAppointmentComponent } from './cancel-appointment/cancel-appointment.component';

export const routes: Routes = [
    { path: '', component : HomeComponent},
    {path: 'booking', component:BookingComponent},
    {path: 'cancel-appointment', component:CancelAppointmentComponent},
    
];
