import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { JobsService } from './jobs.service';

describe('JobsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JobsService, HttpClientTestingModule]
    });
  });

  it('should be created', inject([JobsService], (service: JobsService) => {
    expect(service).toBeTruthy();
  }));
});
