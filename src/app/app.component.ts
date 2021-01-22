import { Component, OnInit } from '@angular/core';
import { MessageResponse } from './models/message-response';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ArtSoft: Messages';
  messages: MessageResponse[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getMessages();
    this.dataService.messages$
      .subscribe(
        (ms) => {
          if (ms) {
            let outputMessages: MessageResponse[] = [];
            outputMessages = ms.filter(m => !m.parentId);
            this.messages = this.buildTree(outputMessages, ms);
            console.log(this.messages);
          }
        }
      );
  }

  buildTree(outputMesages: MessageResponse[], inputMessages: MessageResponse[]): MessageResponse[] {
    let outputMessages: MessageResponse[] = [];
    outputMessages = inputMessages.filter(m => !m.parentId);
    // let messagesMap = new Map<number, MessageResponse>();
    // messages.forEach((m) => {
    //   messagesMap.set(m.id, m);
    // });
    // messagesMap.forEach(m => {
    //   const parentMessage: MessageResponse = messagesMap.get(m?.parentId);
    //   if (parentMessage) {
    //     parentMessage.children
    //   }
    // });
    return outputMessages;
  }
}
