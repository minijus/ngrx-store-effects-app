import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { ToppingsService } from '../../services';
import { LoadToppings, LoadToppingsSuccess } from './toppings.action';
import { ToppingsEffect } from './toppings.effect';

describe('', () => {
  let effects: ToppingsEffect;
  let actions$: Observable<any>;
  const ToppingsServiceMock = jasmine.createSpyObj('ToppingsService', [
    'getToppings',
  ]);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ToppingsService,
          useValue: ToppingsServiceMock,
        },
        ToppingsEffect,
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.get(ToppingsEffect);
  });
  describe('loadToppings$', () => {
    it('should return a collection from LoadToppingsSuccess', () => {
      const toppings = [
        { id: 1, name: 'onion' },
        { id: 2, name: 'mushroom' },
        { id: 3, name: 'basil' },
      ];
      ToppingsServiceMock.getToppings.and.returnValue(of(toppings));
      const action = new LoadToppings();
      const completion = new LoadToppingsSuccess(toppings);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadToppings$).toBeObservable(expected);
    });
  });
});
