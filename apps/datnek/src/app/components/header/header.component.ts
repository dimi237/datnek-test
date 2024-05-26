import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Menu } from '../../models/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {

  menu: Menu[] = [
    {
      path: '',
      label: 'Home',
      icon: 'house-door'
    },
    {
      path: '',
      label: 'Company',
      icon: 'building-fill'
    },
    {
      path: '',
      label: 'Business',
      icon: 'briefcase'
    },
    {
      path: '',
      label: 'Notifications',
      icon: 'bell'
    },
    {
      path: '',
      label: 'Community',
      icon: 'people'
    },
    {
      path: '',
      label: 'Messages',
      icon: 'chat-left'
    }
  ]
}
