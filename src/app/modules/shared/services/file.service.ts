import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FileService {
  private readonly http = inject(HttpClient);

  public fetchFile(path: string): Observable<string> {
    return this.http.get(path, { responseType: 'text' });
  }
}
