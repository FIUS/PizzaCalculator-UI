import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ApiObject } from './apiobject';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private hostAddress = 'http://localhost:8080/';

  // Uuid generation flags
  private hasUuid = false;
  private generatingUuid = false;

  private streams: Map<string, Subject<Readonly<ApiObject> | Readonly<ApiObject[]>>> = new Map();

  constructor(
    private http: HttpClient) { }

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

  subUuid: Subscription;

  getUuid(): string {

    // TODO implement a uuid generation
    localStorage.setItem('pizzaCalculatorUuid', '1234567');
    return localStorage.getItem('pizzaCalculatorUuid');
  }

  // ===========
  // INGREDIENTS
  // ===========

  getIngredients() {
    const resource = 'ingredients';
    const stream = this.getStreamSource(resource);

    this.http.get(this.hostAddress + resource)
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

    this.http.get(this.hostAddress + resource)
      .subscribe(val => {
        stream.next(Object.freeze(val));
      });

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

    this.http.get(this.hostAddress + resource)
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

  getSize(token: string) {
    const resource = 'teams/' + token + '/size';
    const stream = this.getStreamSource(resource);

    this.http.get(this.hostAddress + resource)
      .subscribe(val => {
        stream.next(Object.freeze(val));
      });

    return (stream.asObservable() as Observable<Readonly<ApiObject>>).pipe(
      filter(data => data !== undefined)
    );
  }

  patchSize(teamName: string, size: number) {

    return this.http.patch(this.hostAddress + 'teams/' + teamName + '/size', { 'size': size });
  }

  getType(token: string) {
    const resource = 'teams/' + token + '/size/type';
    const stream = this.getStreamSource(resource);

    this.http.get(this.hostAddress + resource)
      .subscribe(val => {
        stream.next(Object.freeze(val));
      });

    return (stream.asObservable() as Observable<Readonly<ApiObject>>).pipe(
      filter(data => data !== undefined)
    );
  }

  patchType(teamName: string, type) {
    return this.http.patch(this.hostAddress + 'teams/' + teamName + '/size/type', { 'type': type.name });
  }

  getVegetarian(token: string) {
    const resource = 'teams/' + token + '/vegetarian';
    const stream = this.getStreamSource(resource);

    this.http.get(this.hostAddress + resource)
      .subscribe(val => {
        stream.next(Object.freeze(val));
      });

    return (stream.asObservable() as Observable<Readonly<ApiObject>>).pipe(
      filter(data => data !== undefined)
    );
  }

  patchVegetarian(teamName: string, size: number) {

    return this.http.patch(this.hostAddress + 'teams/' + teamName + '/vegetarian', { 'vegetarian': size });
  }

  getPork(token: string) {
    const resource = 'teams/' + token + '/no-pork';
    const stream = this.getStreamSource(resource);

    this.http.get(this.hostAddress + resource)
      .subscribe(val => {
        stream.next(Object.freeze(val));
      });

    return (stream.asObservable() as Observable<Readonly<ApiObject>>).pipe(
      filter(data => data !== undefined)
    );
  }

  patchPork(teamName: string, size: number) {

    return this.http.patch(this.hostAddress + 'teams/' + teamName + '/no-pork', { 'noPork': size });
  }

  getVoteMode(teamName) {
    const resource = 'teams/' + teamName + '/vote-mode';
    const stream = this.getStreamSource(resource);

    this.http.get(this.hostAddress + resource)
      .subscribe(val => {
        stream.next(Object.freeze(val));
      });

    return (stream.asObservable() as Observable<Readonly<ApiObject>>).pipe(
      filter(data => data !== undefined)
    );
  }

  patchFreeze(token, freeze = true) {
    return this.http.patch(this.hostAddress + 'teams/' + token + '/freeze', { 'freeze': freeze });
  }

  getFreeze(teamName) {
    const resource = 'teams/' + teamName + '/freeze';
    const stream = this.getStreamSource(resource);

    this.http.get(this.hostAddress + resource)
      .subscribe(val => {
        stream.next(Object.freeze(val));
      });

    return (stream.asObservable() as Observable<Readonly<ApiObject>>).pipe(
      filter(data => data !== undefined)
    );
  }

  patchVoteMode(token, voteMode) {
    return this.http.patch(this.hostAddress + 'teams/' + token + '/vote-mode', { 'voteMode': voteMode.name });
  }

  // ======
  // PIZZAS
  // ======

  getPizzas(teamName: string) {
    const resource = 'pizzas';
    const stream = this.getStreamSource(resource);


    const params = new HttpParams().set('teamname', teamName);

    this.http.get(this.hostAddress + resource, { params: params})
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

    this.http.get(this.hostAddress + resource, { params: params})
      .subscribe(val => {
        stream.next(Object.freeze(val));
      });

    return (stream.asObservable() as Observable<Readonly<ApiObject>>).pipe(
      filter(data => data !== undefined)
    );
  }

  getOrder(teamName) {
    const resource = 'pizzas/order';
    const stream = this.getStreamSource(resource);


    const params = new HttpParams().set('teamname', teamName);

    this.http.get(this.hostAddress + resource, { params: params})
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

  // =================
  // REGISTRATION MODE
  // =================

  postRequiredPieces(pizzaName: string, teamName: string, numberOfPieces) {

    let uuid = this.getUuid();

    return this.http.post(this.hostAddress + 'pizzas/' + pizzaName + '/pieces',
      { 'teamname': teamName, 'uuid': uuid, 'pieces': numberOfPieces });
  }

  getAllPiecesOfPizza(pizzaName: string, teamName: string) {
    const resource = 'pizzas/' + pizzaName + '/pieces/total';
    const stream = this.getStreamSource(resource);


    const params = new HttpParams().set('teamname', teamName);

    this.http.get(this.hostAddress + resource, { params: params})
      .subscribe(val => {
        stream.next(Object.freeze(val));
      });

    return (stream.asObservable() as Observable<Readonly<ApiObject[]>>).pipe(
      filter(data => data !== undefined)
    );
  }

  getMyPiecesOfPizza(pizzaName: string, teamName: string) {

    const resource = 'pizzas/' + pizzaName + '/pieces';
    const stream = this.getStreamSource(resource);

    const uuid = this.getUuid();

    console.log(uuid);
    const params = new HttpParams().set('teamname', teamName).set('uuid', uuid);

    this.http.get(this.hostAddress + resource, { params: params})
      .subscribe(val => {
        stream.next(Object.freeze(val));
      });

    return (stream.asObservable() as Observable<Readonly<ApiObject[]>>).pipe(
      filter(data => data !== undefined)
    );
  }

  public getHostAddress() {
    return this.hostAddress;
  }

}

