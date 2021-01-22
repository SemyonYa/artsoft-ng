import { Component, Input, OnInit } from '@angular/core';
import { MessageResponse } from 'src/app/models/message-response';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  @Input() message: MessageResponse;
}
