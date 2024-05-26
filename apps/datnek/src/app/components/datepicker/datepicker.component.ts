import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDateStruct, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    NgbDatepickerModule,
    ReactiveFormsModule,
  ],
  template: `
  <input type="text"  #d="ngbDatepicker" [formControl]="formControl" ngbDatepicker/>
`,
})
export class Datepicker extends FieldType<FieldTypeConfig>  {}
