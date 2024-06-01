import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions, FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsContainer } from '../toast/toasts-container.component';
import { ToastService } from '../toast/toast-service';
import { NgxsModule, Store } from '@ngxs/store';
import { EventInput } from '../../core/state/event/event.actions';
import { Event } from '../../core/state/event/event.model';

@Component({
  selector: 'app-event-form',
  standalone: true,
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule,
    NgbModule,
    NgxsModule,
    ToastsContainer
  ]
})
export class EventFormComponent implements OnInit {
  @Input() event!: Event;
  newEvent: any;

  form = new FormGroup({});
  options: FormlyFormOptions = {};
  fields!: FormlyFieldConfig[];


  constructor(public toastService: ToastService,
    public activeModal: NgbActiveModal,
    private store: Store,

  ) { }

  ngOnInit(): void {
    this.fields = [
      {
        key: 'organizer',
        type: 'select',
        defaultValue: this.event.organizer,
        props: {
          label: 'Organisateur',
          placeholder: 'Organisateur',
          required: true,
          options: [
            { value: 'Marc Olivier', label: 'Marc Olivier' },
            { value: 'Jude Tango', label: 'Jude Tango' },
            { value: 'Fomekong Ndjiya', label: 'Fomekong Ndjiya' },
            { value: 'Espoir Eding', label: 'Espoir Eding' },
          ],
          addonLeft: {
            class: 'bi bi-person text-blue',
          },
        },
      },
      {
        key: 'type',
        type: 'radio',
        defaultValue: this.event.type,
        props: {
          label: "Type d'évènement",
          placeholder: "Type d'évènement",
          required: true,
          options: [
            { value: 'ONLINE', label: 'En ligne', },
            { value: 'ONSITE', label: 'En Présentiel' }
          ],
        },
      },
      {
        key: 'link',
        type: 'input',
        defaultValue: this.event.link,
        props: {
          label: "Lien du meeting",
          placeholder: "Lien du meeting",
          required: !(this.form.get('type') && this.form.get('type')?.value === 'ONLINE') || true,
          pattern: /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g,
        },
        expressions: {
          hide: 'model.type != "ONLINE"',
        },
      },
      {
        key: 'address',
        type: 'input',
        defaultValue: this.event.address,
        props: {
          label: "Lieu de l'evènement",
          placeholder: "Lieu de l'evènement",
          required: !(this.form.get('type') && this.form.get('type')?.value === 'ONSITE') || true,
        },
        expressions: {
          hide: 'model.type != "ONSITE"',
        },

      },
      {
        key: 'name',
        type: 'input',
        defaultValue: this.event.name,
        props: {
          label: "Nom de l'évènement",
          placeholder: "Nom de l'évènement",
          required: true,
        },
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            key: 'start_date',
            type: 'input',
            defaultValue: this.event.start_date,
            props: {
              label: "Date de début",
              placeholder: "Date de début",
              required: true,
              type: 'date'
            },
            wrappers: ['form-field'],
            expressions: {
              className: (field: FormlyFieldConfig) => {
                return field.model?.start_date ? 'col-6' : 'col-12';
              },
            }
          },
          {
            key: 'start_hour',
            type: 'input',
            defaultValue: this.event.start_hour,
            templateOptions: {
              label: 'Heure de début',
              type: 'time',
            },
            wrappers: ['form-field'],
            className: 'col-6',
            hideExpression: '!model.start_date'
          },
        ]
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [

          {
            key: 'end_date',
            type: 'input',
            defaultValue: this.event.end_date,
            templateOptions: {
              label: 'Date de fin',
              type: 'date',
            },
            wrappers: ['form-field'],
            className: 'col-6',
            hideExpression: '!model.start_date'
          },

          {
            key: 'end_hour',
            defaultValue: this.event.end_hour,
            type: 'input',
            templateOptions: {
              label: 'Heure de fin',
              type: 'time',
            },
            wrappers: ['form-field'],
            className: 'col-6',
            hideExpression: '!model.start_date'
          },
        ]
      },
      {
        key: 'description',
        type: 'input',
        defaultValue: this.event.description,
        templateOptions: {
          label: 'Description',
          placeholder: 'Description',
          required: true,
        }
      },
    ];
  }

  submit(): void {
    if (!this.form.valid) return;
    const action = this.event ? new EventInput.EditEvent(this.event.id, this.form.value as Event) : new EventInput.AddEvent(this.form.value as Event);
    this.store.dispatch(action).subscribe(() => this.form.reset());
    this.activeModal.close();
    this.toastService.show('Enregistrement effectué avec succès', { classname: 'bg-success text-light' });
  }
}
