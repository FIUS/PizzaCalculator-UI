import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { ApiObject } from './apiobject';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private hostAddress = 'http://localhost:8080/';

  private streams: Map<string, Subject<Readonly<ApiObject> | Readonly<ApiObject[]>>> = new Map();

  constructor(private http: HttpClient) { }

  /**
    * Fetch the stream source for the given resource url.
    *
    * @param streamURL resource url
    * @param defaultSubject function to create a new streamSource if needed (default: BehaviourSubject)
    */
  private getStreamSource(streamURL: string, defaultSubject: () => Subject<Readonly<ApiObject> | Readonly<ApiObject[]>> =
    () => new BehaviorSubject<Readonly<ApiObject> | Readonly<ApiObject[]>>(undefined)
  ): Subject<Readonly<ApiObject> | Readonly<ApiObject[]>> {
    let stream = this.streams.get(streamURL);
    if (stream == null) {
      stream = defaultSubject();
      if (stream != null) {
        this.streams.set(streamURL, stream);
      }
    }
    return stream;
  }


  getIngredients() {
    const resource = 'ingredients';
    const stream = this.getStreamSource(resource);

    const result = this.http.get(this.hostAddress + resource)
      .subscribe(val => stream.next(Object.freeze(val)));

    return (stream.asObservable() as Observable<Readonly<ApiObject[]>>).pipe(
      filter(data => data !== undefined)
    );
  }

  getTemplates() {
    const resource = 'templates';
    const stream = this.getStreamSource(resource);

    const result = this.http.get(this.hostAddress + resource)
      .subscribe(val => stream.next(Object.freeze(val)));

    return (stream.asObservable() as Observable<Readonly<ApiObject[]>>).pipe(
      filter(data => data !== undefined)
    );
  }

}

