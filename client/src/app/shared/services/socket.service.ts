import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../model/message';

import * as socketIo from 'socket.io-client';

const SERVER_URL = 'http://localhost:3000';

@Injectable()
export class SocketService {
    private socket;

    public initSocket(): void {
        this.socket = socketIo(SERVER_URL);
    }

    public send(message: Message): void {
        this.socket.emit('message', message);
    }

    public onBuzz(): Observable<Array<Message>> {
        return new Observable<Array<Message>>(observer => {
            this.socket.on('buzzed', (data: Array<Message>) => observer.next(data));
        });
    }
}