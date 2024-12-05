import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'capitals-game';

  isHomePath(): boolean {
    return window.location.pathname === '/';
  }

  goBack(): void {
    window.history.back();
  }
}
