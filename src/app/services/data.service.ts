import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {
  base: string;
  opts: object;
  constructor(public http:Http) {
    this.base = 'http://localhost:3000';
    this.opts = { headers: { 'content-type' : 'application/json' }}
  }
  
  list(name: string): Promise<any> {
    const url = this.join(name)
    return this.http.get(url).toPromise().then(this.extract)
  }
  
  create(name: string, data: object): Promise<any> {
    const url = this.join(name)
    return this.http.post(url, JSON.stringify(data), this.opts).toPromise().then(this.extract)
  }
  
  update(name: string, data: object): Promise<any> {
    const url = this.join(name)
    return this.http.put(url, JSON.stringify(data), this.opts).toPromise().then(this.extract)
  }
  
  remove(name: string, id: string): Promise<any> {
    const url = this.join(name, id)
    return this.http.delete(url).toPromise().then(this.extract)
  }

  private join(...args) {
    return [ this.base, ...args ].join('/')
  }
  
  private async extract(res: Response) {
    const { result } = await res.json()
    return result
  }
  
  
}
