import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  constructor() {
  }

  makePositionPopup(data: any): string {
    return `` +
      `<div>Pays: ${data.country}</div>` +
      `<div>Ville: ${data.city}</div>` +
      `<div>Adresse: ${data.adress}</div>`;
  }
}
