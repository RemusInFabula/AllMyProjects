import { Component, Input } from '@angular/core';
import { Message } from '../../core/models/message.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-messages',
  imports: [CommonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  @Input() messageObj : Message = {message:'',type:null}
}
