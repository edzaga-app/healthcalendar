import { HttpClient } from '@angular/common/http';

export class BaseService {

  protected http: HttpClient;
  // protected url = 'http://localhost:3010/api/v1';
  // protected url = 'http://192.168.32.111/api/ticinventory';
  // protected url = 'http://10.1.1.197:8080/api/ticinventory';
  protected url = 'http://app4.utp.edu.co/api/v1';

  constructor(httpClient: HttpClient) {
    this.http = this.httpClient;
  }

  public get httpClient() : HttpClient {
    return this.http;
  }

  public get baseUrl() : string {
    return this.url;
  }

}
