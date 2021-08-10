import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FileService } from '../file.service';
import { FileMetadata } from '../fileMetadata';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  constructor(private http: HttpClient, private fileService: FileService) { }
  fileToUpload: any;
  fileTypes: any;
  fileSize: any;

  ngOnInit(): void {
    this.getSupportedFormat();
  }

  chooseFile(event : any){
    if(event.target.files[0].size > this.fileSize){
      alert("File is too big!");   
      event.target.value = "";
    }
    else{    
      this.fileToUpload = event.target.files[0];
    }
  }
  getSupportedFormat(): void{
    this.fileService.getFileTypes().subscribe((res) => this.fileTypes = res);
    this.fileService.getFileSize().subscribe((res) => this.fileSize = res);
   }
   
  sendFile($event: Event) {
    const formData = new FormData();
    formData.append('file', this.fileToUpload);
    this.fileService.uploadFile(formData).subscribe();
}
}
