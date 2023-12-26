import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { DateAdapter } from '@angular/material/core';
import {Event} from "../../app.component";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {

  createEventForm: FormGroup;

  constructor(formBuilder: FormBuilder, private dateAdapter: DateAdapter<Date>, private httpClient: HttpClient) {
    this.createEventForm = formBuilder.group({
      eventType: ['', Validators.required],
      eventTitle: [''],
      eventLocation: ['', Validators.required],
      eventDescription: [''],
      eventDate: ['', Validators.required],
      eventLimit: [0],
    });
    this.dateAdapter.setLocale('fr-FR');
  }

  createEvent(){
    this.httpClient.post<Event>("/api/events", this.createEventForm.value).subscribe({
      next: (res: Event) => {},
      error: (err) => {
        console.error(err);
      }
    })
  }

}
