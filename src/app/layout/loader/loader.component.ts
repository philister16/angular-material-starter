import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
  isLoadingData: boolean = false;
  isLoadingRoute: boolean = false;
  routeLoaderSubscription: Subscription;
  dataLoaderSubscription: Subscription;

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.routeLoaderSubscription = this.loaderService.routeLoader.subscribe(state => this.isLoadingRoute = state);
    this.dataLoaderSubscription = this.loaderService.dataLoader.subscribe(state => this.isLoadingData = state);
  }

  ngOnDestroy() {
    this.routeLoaderSubscription.unsubscribe();
    this.dataLoaderSubscription.unsubscribe();
  }

}
