import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventFormComponent } from '../../components/event-form/event-form.component';
import { Event } from '../../core/state/event/event.model';
import { NgxsModule, Select, Store } from '@ngxs/store';
import { EventState } from '../../core/state/event/event.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
    EventFormComponent,
    NgxsModule,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent  {
  features = ['Photos', 'Vidéos', 'Articles', 'Evènements', 'Challenge']

  
  
  private modalService = inject(NgbModal);
  private store = inject(Store);
  
  @Select((state: { event: { eventList: any; }; }) => state.event.eventList) events$!: Observable<Event[]>;  
 

  openEventForm() {
    const modalRef = this.modalService.open(EventFormComponent);
  }

}
