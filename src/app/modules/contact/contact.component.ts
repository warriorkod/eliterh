import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {AngularFireDatabase} from 'angularfire2/database';
import * as L from 'leaflet';
import {MarkerService} from '../../services/map-leaflet/marker.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  private map;


  constructor(private fb: FormBuilder, private af: AngularFireDatabase, private markerService: MarkerService) {
    this.createForm();
    window.scrollTo(0, 0);
  }


  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initMap();
    this.markerService.makePositionMarkers(this.map);
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [15.4557184, -15.7481313],
      zoom: 6
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
  }


  /* Section send mail */

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }


  onSubmit() {
    const {name, email, subject, message} = this.form.value;
    const date = Date();
    const html = `
      <div>From: ${name}</div>
      <div>Email: <a href="mailto:${email}">${email}</a></div>
      <div>Date: ${date}</div>
      <div>Subject: ${subject}</div>
      <div>Message: ${message}</div>
    `;
    const formRequest = {name, email, subject, message, date, html};

    this.af.list('/messages').push(formRequest);
    this.form.reset();
  }

}
