import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer') gmap: ElementRef;
  map: google.maps.Map;
  lat = 14.7373452;
  lng = -17.4913605;
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 8,
  };
  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
  });
  form: FormGroup;


  constructor(private fb: FormBuilder, private af: AngularFireDatabase) {
    this.createForm();
    window.scrollTo(0, 0);
  }


  ngOnInit() {
  }

  ngAfterViewInit() {
    this.mapInitializer();
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement,
    this.mapOptions);
    this.marker.setMap(this.map);

  }

  // Section send mail

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
    const formRequest = { name, email, subject, message, date, html };

    this.af.list('/messages').push(formRequest);
    this.form.reset();
  }

}
