import { TestBed } from '@angular/core/testing';

import { PeticionesAjaxServiceService } from './peticiones-ajax-service.service';

describe('PeticionesAjaxServiceService', () => {
  let service: PeticionesAjaxServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeticionesAjaxServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
