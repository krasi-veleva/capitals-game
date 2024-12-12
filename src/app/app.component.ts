import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'capitals-game';

  constructor(private location: Location) {}

  isHomePath(): boolean {
    return window.location.pathname === '/';
  }

  isGamePath(): boolean {
    return window.location.pathname === '/capitals-game';
  }

  goBack(): void {
    this.location.back();
  }
}
