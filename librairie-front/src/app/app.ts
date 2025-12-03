import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationAdmin } from './component/navigation-admin/navigation-admin';
import { NavigationUser } from './component/navigation-user/navigation-user';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationAdmin],
  //imports: [RouterOutlet, NavigationAdmin, NavigationUser],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('librairie-front');
}
