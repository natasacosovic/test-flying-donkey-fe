import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FileMetadata } from '../fileMetadata';
import { FileService } from '../file.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-file-view',
  templateUrl: './file-view.component.html',
  styleUrls: ['./file-view.component.css']
})
export class FileViewComponent implements OnInit {

  constructor(private http: HttpClient, private fileService: FileService) { }

  filesInfo!: FileMetadata[];
  fileTypes!: string[];

  ngOnInit(): void {
    this.getSupportedFormat();
    this.getFiles();
  }

  getSupportedFormat(): void{
    this.fileService.getFileTypes().subscribe((res) => this.fileTypes = res);
  }

  getFiles() : void{
    this.fileService.getFiles().subscribe((res) => this.filesInfo = res);
  }
  
  getFilesByType(type: string) : FileMetadata[]{
   var res = null;
   res = this.filesInfo?.filter(i=>i.name.endsWith(type));
   return res;
  }
  
  downloadFile(event: string)
  {
    this.http.get<any>(environment.backendUrl + "/download?fileName=" + event, {
      responseType: 'blob' as 'json'
    }).subscribe(
        (res)=>{
          const blob = new Blob([res], {type:res.type});
          const url= window.URL.createObjectURL(blob);
          window.open(url);});
  }
}
