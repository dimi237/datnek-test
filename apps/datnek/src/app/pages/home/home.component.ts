import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { PostComponent } from '../../components/post/post.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, PostComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {
}
