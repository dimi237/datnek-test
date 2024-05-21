import { Component, importProvidersFrom, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions, FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

@Component({
  selector: 'app-event-form',
  standalone: true,
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule
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
        { value: 'ONLINE', label: 'En ligne' },
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
    },
  },
  {
    key: 'address',
    type: 'input',
    props: {
      label: "Lieu de l'evènement",
      placeholder: "Lieu de l'evènement",
      required: !(this.form.get('type') && this.form.get('type')?.value === 'ONSITE' ) || true,
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
    key: 'date',
    type: 'input',
    templateOptions: {
      label: 'Date de début',
      placeholder: 'dd/mm/yyyy',
      required: true,
    }  
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
  ngOnInit(): void {
  }

}
