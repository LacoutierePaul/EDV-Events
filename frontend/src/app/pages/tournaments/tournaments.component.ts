import { Component, OnInit } from '@angular/core';
import {Event} from "../../app.component";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit{

  tournamentList: Event[] = [];

  constructor(private httpClient: HttpClient){}

  ngOnInit(): void {
    this.getTournaments();
  }

  getTournaments(){
    this.httpClient.get<Event[]>("/api/eventsByType/Tournament").subscribe({
      next: (res: Event[]) => {
        this.tournamentList = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
