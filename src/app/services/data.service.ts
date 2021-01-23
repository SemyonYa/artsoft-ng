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
  maxId$ = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) { }

  getMessages() {
    const messagesFromLocalStorage: MessageResponse[] = this.getMessagesFromLocaleStorage();

    this.getMessagesFromJson().subscribe(
      ms => {
        ms.push(...messagesFromLocalStorage);
        ms.forEach(m => {
          if (m.id > this.maxId$.value) {
            this.maxId$.next(m.id);
          }
        });
        this.messages$.next(ms.sort((m1, m2) => +m1.datetime - +m2.datetime));
      }
    );
  }

  sendMessage(message: MessageResponse) {
    const currentMsgs: MessageResponse[] = this.getMessagesFromLocaleStorage();
    message.setId(this.maxId$.value + 1);
    currentMsgs.push(message);
    this.setMessagesToLocaleStorage(currentMsgs);
    this.getMessages();
  }

  clearMessages() {
    localStorage.removeItem(MESSAGES_KEY);
    this.getMessages();
  }

  private getMessagesFromJson() {
    return this.http.get('assets/data.json')
      .pipe(
        map(
          (res: any[]) => res.map(m => new MessageResponse(
            m.id,
            m.parent_id,
            m.datetime,
            m.author_name,
            m.body
          )
          )
        )
      );
  }

  private getMessagesFromLocaleStorage(): MessageResponse[] {
    const messagesData: any = localStorage.getItem(MESSAGES_KEY);
    if (messagesData) {
      return (JSON.parse(messagesData) as any[])
        .map(
          m => new MessageResponse(
            m.id, m.parentId, m.datetime, m.authorName, m.body, m.level
          )
        );
    }
    return [];
  }

  private setMessagesToLocaleStorage(messages: MessageResponse[]) {
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
  }
}
