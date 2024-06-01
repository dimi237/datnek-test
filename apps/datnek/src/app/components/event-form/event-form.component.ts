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
  @Input() event: any;
  activeModal = inject(NgbActiveModal);
  newEvent: any;

  form = new FormGroup({});
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'organizer',
      type: 'select',
      props: {
        label: 'Organisateur',
        placeholder: 'Organisateur',
        required: true,
        options: [
          { value: 1, label: 'Option 1' },
          { value: 2, label: 'Option 2' },
          { value: 3, label: 'Option 3' },
          { value: 4, label: 'Option 4', disabled: true },
        ],
        addonLeft: {
          class: 'bi bi-person text-blue',
        },
      },
    },
    {
      key: 'type',
      type: 'radio',

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
      templateOptions: {
        label: 'Description',
        placeholder: 'Description',
        required: true,
      }
    },
  ];


  constructor(public toastService: ToastService,
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  submit(): void {
    if (!this.form.valid) return;
    this.store.dispatch(new EventInput.AddEvent(this.form.value as Event)).subscribe(() => this.form.reset());
    this.activeModal.close();
    this.toastService.show('Enregistrement e ectué avec succès', { classname: 'bg-success text-light' });
  }
}
