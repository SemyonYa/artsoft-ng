import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessageResponse } from '../models/message-response';

const MESSAGES_KEY: string = 'messages';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  messages$ = new BehaviorSubject<MessageResponse[]>(null);

  constructor(private http: HttpClient) { }

  getMessages() {
    this.getMessagesFromJson().subscribe(
      ms => {
        this.messages$.next(ms);
      }
    );
  }

  getMessagesFromJson() {
    return this.http.get('assets/data.json')
      .pipe(
        map(
          (res: any[]) => res.map(m => new MessageResponse(
            m.id,
            m.parent_id,
            m.datetime,
            m.author_name,
            m.body,
          )
          )
        )
      );
  }

  getMessagesFromLocaleStorage() {

  }
}
