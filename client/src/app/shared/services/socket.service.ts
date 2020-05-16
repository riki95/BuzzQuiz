import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { Message } from '../model/message';

import socketIo from 'socket.io-client';

import { environment } from '../../../environments/environment';

// NOTE: if you are not using docker probably you need that value instead
// const SERVER_URL = 'http://localhost:3000';
const SERVER_URL = environment.server_url;

@Injectable()
export class SocketService {
    private socket;

    public users = new Subject<string[]>();
    public bookingList = new Subject();

    public initConnection(username: string) {
        this.socket = socketIo(SERVER_URL);

        this.socket.on('USERS_UPDATED', (data: string[]) => this.users.next(data));
        this.socket.on('BOOKING_LIST_UPDATED', (data) => this.bookingList.next(data));

        this.socket.emit('NEW_USER', { username });
    }

    public userBooking() { this.socket.emit('USER_BOOKING'); }

    public userResetting() { this.socket.emit('USER_RESETTING'); }
}