import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [CommonModule,
    NgbDatepickerModule,
    ReactiveFormsModule
  ],
  template: `
  <input type="text" ngbDatepicker/>
`,
})
export class DatepickerComponent extends FieldType  {}
