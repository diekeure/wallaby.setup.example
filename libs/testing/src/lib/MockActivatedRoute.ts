import { Params } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export class MockActivatedRoute {
  params = new BehaviorSubject<Params>({});
}
