import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageResponse } from 'src/app/models/message-response';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  @Input() message: MessageResponse;
  @Output() showNewMessage = new EventEmitter<MessageResponse>();

  commentOnMessage(message: MessageResponse) {
    this.showNewMessage.emit(message);
  }
}
