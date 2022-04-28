import { Pipe, PipeTransform } from '@angular/core';
import { UserProfile } from '../models/userProfile';

@Pipe({
  name: 'userSearch'
})
export class UserSearchPipe implements PipeTransform {

  transform(value:UserProfile[], searchKey: string): UserProfile[] {
    searchKey = searchKey && searchKey.length > 2 ? searchKey.toLocaleLowerCase() : "";
    return searchKey ? value.filter(p => (p.firstName.toLocaleLowerCase() + " " + p.lastName.toLocaleLowerCase() + p.phoneNumber + p.email).indexOf(searchKey) !== -1) : value;
  }

}
