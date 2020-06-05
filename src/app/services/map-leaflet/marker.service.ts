import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import {PopUpService} from './pop-up.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  data = '/assets/data/coordinates.geojson';

  constructor(private http: HttpClient, private popupService: PopUpService) {
  }

  makePositionMarkers(map: L.map): void {
    this.http.get(this.data).subscribe((res: any) => {
      const lat = res.geometry.coordinates[0];
      const lon = res.geometry.coordinates[1];
      const marker = L.marker([lon, lat]).addTo(map);
      marker.bindPopup(this.popupService.makePositionPopup(res.properties));
      marker.addTo(map);
    });
  }
}
