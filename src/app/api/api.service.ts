import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, } from '@angular/common/http';
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

  // ===========
  // INGREDIENTS
  // ===========

  getIngredients() {
    const resource = 'ingredients';
    const stream = this.getStreamSource(resource);

    const result = this.http.get(this.hostAddress + resource)
      .subscribe(val => {
        stream.next(Object.freeze(val));
        // console.log(val);
      });

    return (stream.asObservable() as Observable<Readonly<ApiObject[]>>).pipe(
      filter(data => data !== undefined)
    );
  }


  // =========
  // TEMPLATES
  // =========

  getTemplates() {
    const resource = 'templates';
    const stream = this.getStreamSource(resource);

    const result = this.http.get(this.hostAddress + resource)
      .subscribe(val => stream.next(Object.freeze(val)));

    return (stream.asObservable() as Observable<Readonly<ApiObject[]>>).pipe(
      filter(data => data !== undefined)
    );
  }

  postTemplates(template, teamName) {
    return this.http.post(this.hostAddress + 'pizzas/templates', { 'teamname': teamName, 'template': template });
  }

  // =====
  // TEAMS
  // =====

  getTeams() {
    const resource = 'teams';
    const stream = this.getStreamSource(resource);

    const result = this.http.get(this.hostAddress + resource)
      .subscribe(val => {
        stream.next(Object.freeze(val));
      });

    return (stream.asObservable() as Observable<Readonly<ApiObject[]>>).pipe(
      filter(data => data !== undefined)
    );
  }

  postTeam(teamName: string): Observable<ApiObject> {
    return this.http.post(this.hostAddress + 'teams', { 'teamname': teamName });
  }

  patchSize(teamName: string, size: number) {

    return this.http.patch(this.hostAddress + 'teams/' + teamName + '/size', { 'size': size });
  }

  patchType(teamName: string, type: string) {

    let mappedType = 'persons';

    if (type === 'Personen') {
      mappedType = 'persons';
    } else if (type === 'Stücke') {
      mappedType = 'pizzaPieces';
    }

    return this.http.patch(this.hostAddress + 'teams/' + teamName + '/size/type', { 'type': mappedType });
  }

  patchVegetarian(teamName: string, size: number) {

    return this.http.patch(this.hostAddress + 'teams/' + teamName + '/vegetarian', { 'size': size });
  }

  patchPork(teamName: string, size: number) {

    return this.http.patch(this.hostAddress + 'teams/' + teamName + '/no-pork', { 'size': size });
  }

  // ======
  // PIZZAS
  // ======

  getPizzas(teamName: string) {
    const resource = 'pizzas';
    const stream = this.getStreamSource(resource);


    const params = new HttpParams().set('teamname', teamName);

    const result = this.http.get(this.hostAddress + resource, { 'params': params })
      .subscribe(val => {
        stream.next(Object.freeze(val));
      });

    return (stream.asObservable() as Observable<Readonly<ApiObject[]>>).pipe(
      filter(data => data !== undefined)
    );
  }

  postPizza(ingredients, teamName) {
    return this.http.post(this.hostAddress + 'pizzas', { 'teamname': teamName, 'ingredients': ingredients });
  }

  deletePizza(pizzaName: string, token: string) {
    const params = new HttpParams().set('teamname', token);
    return this.http.delete(this.hostAddress + 'pizzas/' + pizzaName, { params: params });
  }

  getPizzaVote(pizzaName, teamName) {
    const resource = 'pizzas/' + pizzaName + '/vote';
    const stream = this.getStreamSource(resource);

    const params = new HttpParams().set('teamname', teamName);

    const result = this.http.get(this.hostAddress + resource, { 'params': params })
      .subscribe(val => {
        stream.next(Object.freeze(val));
      });

    return (stream.asObservable() as Observable<Readonly<ApiObject[]>>).pipe(
      filter(data => data !== undefined)
    );
  }

  getOrder(teamName) {
    const resource = 'pizzas/order';
    const stream = this.getStreamSource(resource);


    const params = new HttpParams().set('teamname', teamName);

    const result = this.http.get(this.hostAddress + resource, { 'params': params })
      .subscribe(val => {
        stream.next(Object.freeze(val));
      });

    return (stream.asObservable() as Observable<Readonly<ApiObject[]>>).pipe(
      filter(data => data !== undefined)
    );
  }

  vote(name, teamName, upVote = true) {
    if (upVote) {
      // vote up
      const options = { params: new HttpParams().set('mode', 'up') };

      return this.http.patch(this.hostAddress + 'pizzas/' + name, { 'teamname': teamName }, options);

    } else {
      // vote down
      const options = { params: new HttpParams().set('mode', 'down') };

      return this.http.patch(this.hostAddress + 'pizzas/' + name, { 'teamname': teamName }, options);
    }
  }

  public getHostAddress() {
    return this.hostAddress;
  }

}

