import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../model/message';

import * as socketIo from 'socket.io-client';

const SERVER_URL = 'http://localhost:4201';

@Injectable()
export class SocketService {
    private socket;

    public initSocket(): void {
        this.socket = socketIo(SERVER_URL);
    }

    public send(message: Message): void {
        this.socket.emit('message', message);
    }

    public onMessage(): Observable<Message> {
        return new Observable<Message>(observer => {
            this.socket.on('message', (data: Message) => observer.next(data));
        });
    }
}