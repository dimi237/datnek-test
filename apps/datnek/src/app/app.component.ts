import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastsContainer } from './components/toast/toasts-container.component';

@Component({
  standalone: true,
  imports: [RouterModule, ToastsContainer],
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'datnek';
}
