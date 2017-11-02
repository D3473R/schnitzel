import {Component, Inject, OnInit} from '@angular/core';
import {AdminLocation} from '../locations.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-admin-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.css']
})
export class AdminLocationDetailComponent implements OnInit {
  pageHeader: string;
  createNewEntry: boolean;

  constructor(public dialogRef: MatDialogRef<AdminLocationDetailComponent>,@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) {}

  ngOnInit() {
    if(this.data.currentLocation != null){
      console.log('location detail initialized with location');
      this.pageHeader = 'Vorhandenen Ort Bearbeiten';
      this.createNewEntry = false;
    } else {
      console.log('location detail initialized without location');
      this.loadDefaults();
      this.pageHeader = 'Neuen Ort Hinzufügen';
      this.createNewEntry = true;
    }
  }

  loadDefaults() {
    this.data.currentLocation = new AdminLocation('sample description', {
      filename: '',
      filesize: '',
      filetype: '',
      base64: ''}, true, 'sample name', '12345');
  }

  submit() {
    if(this.createNewEntry === false) {
      this.http.put('/api/admin/locations/' + this.data.currentLocation._id, {
        description: this.data.currentLocation.description,
        image: this.data.currentLocation.image,
        isActive: this.data.currentLocation.isActive,
        name: this.data.currentLocation.name,
        _id: this.data.currentLocation._id,
      }, {headers: new HttpHeaders().set('X-Auth-Token', this.data.adminToken)}).subscribe(
        (data) => {
          console.log('successfully edited location');
        },
        (err) => {
          console.log('error editing location', err);
        }
      );
    } else {
      this.http.post('/api/admin/locations', {
        description: this.data.currentLocation.description,
        image: this.data.currentLocation.image,
        isActive: this.data.currentLocation.isActive,
        name: this.data.currentLocation.name
      }, {headers: new HttpHeaders().set('X-Auth-Token', this.data.adminToken)}).subscribe(
        (data) => {
          console.log('successfully edited location');
        },
        (err) => {
          console.log('error editing location', err);
        }
      );
    }
    console.log('saving location detail',this.data.currentLocation);
    this.dialogRef.close();
  }
  cancel() {
    this.dialogRef.close();
  }

  handleFileSelect(evt) {
    const files = evt.target.files;
    const file = files[0];

    console.log('filename',file.name);
    console.log('filesize',file.size);
    console.log('filetype',file.type);

    this.data.currentLocation.image.filename = file.name;
    this.data.currentLocation.image.filesize = file.size;
    this.data.currentLocation.image.filetype = file.type;

    if (files && file) {
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.data.currentLocation.image.base64 = btoa(binaryString);
  }


}
