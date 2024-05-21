import { Component,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventFormComponent } from '../../components/event-form/event-form.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule,EventFormComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  features = [ 'Photos', 'Vidéos','Articles','Evènements', 'Challenge' ]
	private modalService = inject(NgbModal);

  openEventForm() {
		const modalRef = this.modalService.open(EventFormComponent);
	}
}
