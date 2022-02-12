import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender = '19';

  constructor(private messageService: MessageService) { }

  ngOnInit() { }

  onSendMessage() {
    const message = new Message(
      '1',
      this.subject.nativeElement.value,
      this.msgText.nativeElement.value,
      this.currentSender
    );

    this.messageService.addMessage(message);

    this.onClear();
  }

  onClear() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }
}
