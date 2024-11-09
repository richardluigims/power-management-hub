import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeviceModalComponent } from "./pages/devices/components/device-modal/device-modal.component";
import { UserModalComponent } from "./pages/users/user-modal/user-modal.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DeviceModalComponent, UserModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
}
