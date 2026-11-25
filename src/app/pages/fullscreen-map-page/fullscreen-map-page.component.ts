import { DecimalPipe } from '@angular/common';
import { AfterViewInit, Component, effect, ElementRef, signal, viewChild } from '@angular/core';
import { environment } from '@environments/environment.development';
import mapboxgl from 'mapbox-gl';
import { map } from 'rxjs';

// configuración el worker externo
mapboxgl.workerUrl = '/assets/mapbox-gl-csp-worker.js';

@Component({
  selector: 'app-fullscreen-map-page',
  imports: [DecimalPipe],
  templateUrl: './fullscreen-map-page.component.html',
  styles:`
    div {
      width: 100vw;
      height: calc(100vh - 64px);
      background-color: red;
    }

    #controls {
      background-color: white;
      padding: 10px;
      border-radius: 5px;
      position: fixed;
      bottom: 25px;
      right: 20px;
      z-index: 9999;
      box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);
      border: 1px solid #e2e8f0;
      width: 250px;
    }
  `
})
export class FullscreenMapPageComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');

  map = signal<mapboxgl.Map|null>(null);
  // creamos señal para tomar el nivel de zoom
  zoom = signal(14);

  zoomEffect = effect(() => {
    if (!this.map()) return;
    this.map()?.setZoom(this.zoom())
    //this.map()?.zoomTo(this.zoom())
  })

  ngAfterViewInit(){
    if(!this.divElement()?.nativeElement) return;
    const element = this.divElement()!.nativeElement;

    const map = new mapboxgl.Map({
        accessToken: environment.mapboxKey, // associates the map with your Mapbox account and its permissions
        container: element, // container ID
        center: [-71.06776, 42.35816], // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: this.zoom()// starting zoom
  });

    this.mapListeners(map);
  }

  mapListeners(map: mapboxgl.Map) {
    map.on('zoomend',(event) => {
      const newZoom = event.target.getZoom()
      this.zoom.set(newZoom);
    });
    this.map.set(map);
  }

}
