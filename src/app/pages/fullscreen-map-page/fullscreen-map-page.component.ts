import { AfterViewInit, Component, ElementRef, viewChild } from '@angular/core';
import { environment } from '@environments/environment.development';
import mapboxgl from 'mapbox-gl';

// configuración el worker externo
mapboxgl.workerUrl = '/assets/mapbox-gl-csp-worker.js';

@Component({
  selector: 'app-fullscreen-map-page',
  imports: [],
  templateUrl: './fullscreen-map-page.component.html',
  styles:`
    div {
      width: 100vw;
      height: calc(100vh - 64px);
      background-color: red;
    }
  `
})
export class FullscreenMapPageComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');

  ngAfterViewInit(){
    if(!this.divElement()?.nativeElement) return;
    const element = this.divElement()!.nativeElement;

    const map = new mapboxgl.Map({
        accessToken: environment.mapboxKey, // associates the map with your Mapbox account and its permissions
        container: element, // container ID
        center: [-71.06776, 42.35816], // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
  });
  }

}
