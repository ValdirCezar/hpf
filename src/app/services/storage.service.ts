import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from '../config/storage_keys.config';
import { LocalUser } from '../models/local_user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getLocalUser() : LocalUser {
    const user = localStorage.getItem(STORAGE_KEYS.localUser);
    return user == null ? null : JSON.parse(user);
  }

  setLocalUser(obj: LocalUser) {
    if (obj == null)
      localStorage.removeItem(STORAGE_KEYS.localUser);
    else
      localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
  }

}
