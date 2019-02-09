import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { User } from './user.interface';

@Injectable()
export class UserResolver implements Resolve<Observable<User>> {
    constructor(private userService: UserService) {}

    resolve() {
        return this.userService.userInfo();        
    }
}
