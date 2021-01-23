import { Component, OnInit } from '@angular/core';
import { pageAnimation } from './animations/page.animation';
import { opacityAnimation } from './animations/opacity.animation';
import { MessageResponse } from './models/message-response';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [pageAnimation, opacityAnimation]
})
export class AppComponent implements OnInit {
  title = 'ArtSoft: Messages';
  messages: MessageResponse[];
  idTree = [];
  maxLevel: number = 0;

  newMessageVisible = false;
  parent: MessageResponse;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getMessages();
    this.dataService.messages$
      .subscribe(
        (ms) => {
          if (ms) {
            this.messages = this.buildTree(ms);
          }
        }
      );
  }

  buildTree(inputMessages: MessageResponse[]): MessageResponse[] {
    let messagesTree: MessageResponse[] = [];
    let messagesMap = new Map<number, MessageResponse>();
    inputMessages.forEach(m => {
      messagesMap.set(m.id, m);
    });
    this.idTree[0] = inputMessages.filter(m => !m.parentId).map(m => m.id);
    this.maxLevel = 0;
    this.buildIdTree(inputMessages.filter(m => m.parentId));

    for (let i = this.maxLevel; i > 0; i--) {
      this.idTree[i].forEach(id => {
        let currentMessage = messagesMap.get(id);
        currentMessage.setLevel(i);
        let parentMessage = messagesMap.get(currentMessage.parentId).children.push(currentMessage);
      })
    }
    messagesMap.forEach(m => {
      if (!m.parentId) {
        messagesTree.push(m);
      }
    });

    return messagesTree;
  }

  buildIdTree(messages: MessageResponse[]) {
    this.idTree[this.maxLevel + 1] = messages.filter(m => this.idTree[this.maxLevel].includes(m.parentId)).map(m => m.id);
    if (this.idTree[this.maxLevel + 1].length > 0) {
      this.maxLevel++;
      this.buildIdTree(messages.filter(m => !this.idTree[this.maxLevel - 1].includes(m.parentId)));
    } else {
      this.idTree.splice(this.maxLevel + 1);
    }
  }

  showNewMessage(parent: MessageResponse = null) {
    this.parent = parent;
    this.newMessageVisible = true;
  }

  hideNewMessage() {
    this.newMessageVisible = false;
    setTimeout(() => {
      parent = null;
    }, 500);
  }

  sendMessage(message: MessageResponse) {
    this.dataService.sendMessage(message);
  }

  clear() {
    this.dataService.clearMessages();
  }
}
