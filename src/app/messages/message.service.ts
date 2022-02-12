import { Injectable, Output ,EventEmitter } from "@angular/core";
import { runInThisContext } from "vm";
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
    providedIn:'root'
})

export class MessageService{
    private messages: Message[] = [];
    messageChangedEvent = new EventEmitter<Message[]>();
  
    constructor() {
        this.messages = MOCKMESSAGES;
    }

    addMessage(message: Message) {
        this.messages.push(message);
        this.messageChangedEvent.emit(this.messages.slice());
    }

    getMessage(id: string): Message {
        return this.messages.find((message) => message.id === id);
    }

    getMessages(): Message[] {
        return this.messages. slice();
    }

}