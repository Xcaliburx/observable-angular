import { Component, OnDestroy, OnInit } from '@angular/core';

import { interval, Subscription, Observable } from 'rxjs'
import { map, filter } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubsription: Subscription

  constructor() { }

  ngOnInit() {
    // this.firstObsSubsription = interval(1000).subscribe(count => {
    //   console.log(count)
    // })
    const customInterval = Observable.create(observer => {
        let count = 0
        setInterval(() => {
          observer.next(count)
          if (count == 5) {
            observer.complete()
          }
          if (count > 3) {
            observer.error(new Error('greater than 3'))
          }
          count++
        }, 1000)
      }
    )

    customInterval.pipe(map(data => {
      return 'Round: ' + (+data + 1);
    }))

    this.firstObsSubsription = customInterval.pipe(filter(data => {
      return data > 0
    }), map((data: number) => {
      return 'Round: ' + (data + 1);
    })).subscribe(data => {
      console.log(data)
    }, error => {
      alert(error)
    }, () => {
      alert('completed')
    })
  }

  ngOnDestroy(): void {
    this.firstObsSubsription.unsubscribe()
  }

}
