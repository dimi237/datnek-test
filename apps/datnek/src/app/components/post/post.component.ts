import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EventFormComponent } from '../../components/event-form/event-form.component';
import { Event } from '../../core/state/event/event.model';
import { NgxsModule, Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { EventInput } from '../../core/state/event/event.actions';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
    EventFormComponent,
    NgxsModule,
    NgbModule
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  features = ['Photos', 'Vidéos', 'Articles', 'Evènements', 'Challenge']


  @Select((state: { event: { eventList: any; }; }) => state.event.eventList) events$!: Observable<Event[]>;

  constructor(
    private modalService: NgbModal,
    private store: Store,
  ) {
    this.store.dispatch(new EventInput.FetchAllEvents())
  }


  openEventForm(event?: Event) {
    const modalRef = this.modalService.open(EventFormComponent);
    modalRef.componentInstance.event = event;
  }

}
