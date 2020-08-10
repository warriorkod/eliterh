import {Component} from '@angular/core';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EliteRhWeb';

  constructor() {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: 'AIzaSyB5cwDf4a-r6bzSjxuLm5IpVrOt6RFE-PY\n',
      authDomain: 'eliterh-1d34c.firebaseapp.com',
      databaseURL: 'https://eliterh-1d34c.firebaseio.com',
      projectId: 'eliterh-1d34c',
      storageBucket: 'eliterh-1d34c.appspot.com',
      messagingSenderId: '888220700077',
      appId: '1:888220700077:web:6b9e9220014654a79f6524',
      measurementId: 'G-3N5NGBS5QR'
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
