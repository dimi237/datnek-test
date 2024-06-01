import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EventFormComponent } from '../../components/event-form/event-form.component';
import { Event } from '../../core/state/event/event.model';
import { NgxsModule, Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { EventInput } from '../../core/state/event/event.actions';
import { ConfirmService } from '../confirm/confirm.service';
import { ToastService } from '../toast/toast-service';
import { ToastsContainer } from '../toast/toasts-container.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
    EventFormComponent,
    NgxsModule,
    NgbModule,
    ToastsContainer

  ],
  providers: [ConfirmService],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  features = ['Photos', 'Vidéos', 'Articles', 'Evènements', 'Challenge']


  @Select((state: { event: { eventList: any; }; }) => state.event.eventList) events$!: Observable<Event[]>;

  constructor(
    private modalService: NgbModal,
    private store: Store,
    public toastService: ToastService,
    private confirmService: ConfirmService
  ) {
    this.store.dispatch(new EventInput.FetchAllEvents())
  }


  openEventForm(event?: Event) {
    const modalRef = this.modalService.open(EventFormComponent);
    modalRef.componentInstance.event = event;
  }

  openDeleteEvent(event?: Event) {
    this.confirmService.confirm('Supprimer le post ',  `Voulez vous vraiment supprimer ${event?.name} ? tout le contenu du groupe, les posts, les membres seront tous supprimé définitivement`)
      .then((confirmed) => {
        if (confirmed) {
          this.store.dispatch(new EventInput.DeleteEvent(event?.id))
          this.toastService.show('Enregistrement effectué avec succès', { classname: 'bg-success text-light' });
        }
      })
  }

}
