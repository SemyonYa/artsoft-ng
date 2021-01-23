import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageResponse } from 'src/app/models/message-response';
import { DataService } from 'src/app/services/data.service';
import { pageAnimation } from '../../animations/page.animation';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss'],
  animations: [pageAnimation]
})
export class NewMessageComponent {
  @Input() parent: MessageResponse;
  @Output() hideWindow = new EventEmitter<null>();
  @Output() sendMessage = new EventEmitter<MessageResponse>();

  text: string = '';
  author: string = '';

  get buttonVisible(): boolean {
    return this.text.trim().length > 0 && this.author.trim().length > 0;
  }

  send() {
    this.sendMessage.emit(
      new MessageResponse(
        0,
        this.parent?.id,
        formatDate(new Date(), 'yyyy-MM-ddTHH:mm:ss', 'en-EN'),
        this.author.trim(),
        this.text.trim()
      )
    );
    this.hide();
  }

  hide() {
    this.hideWindow.emit();
  }

}
