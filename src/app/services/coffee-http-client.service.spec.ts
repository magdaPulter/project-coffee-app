import { TestBed } from '@angular/core/testing';

import { CoffeeHttpClientService } from './coffee-http-client.service';

describe('CoffeeHttpClientService', () => {
  let service: CoffeeHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoffeeHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
