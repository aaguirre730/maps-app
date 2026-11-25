import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import { environment } from '@environments/environment.development';
import mapboxgl from 'mapbox-gl';

// configuración el worker externo
mapboxgl.workerUrl = '/assets/mapbox-gl-csp-worker.js';

@Component({
  selector: 'app-markers-page',
  imports: [],
  templateUrl: './markers-page.component.html',
})
export class MarkersPageComponent implements AfterViewInit {

  // Referencia al elemento del DOM como Signal
  divElement = viewChild<ElementRef>('map');

  map = signal<mapboxgl.Map|null>(null);

  zoom = signal(14);

  coordinatesMap = signal({
    lng: -74.5,
    lat: 40,
  });

  async ngAfterViewInit() {
    await new Promise((resolve) => setTimeout(resolve,80))
    const element = this.divElement()!.nativeElement;
    const {lng, lat} = this.coordinatesMap();
    const map = new mapboxgl.Map({
        accessToken: environment.mapboxKey, // associates the map with your Mapbox account and its permissions
        container: element, // container ID
        center: [-65.4103,-24.7883], // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 16// starting zoom
  });

  // draggable: true -> permite mover el marcador
    const marker = new mapboxgl.Marker({
      draggable: false,
      color: 'blue',
    })
    .setLngLat([-65.4103,-24.7883])
    .addTo(map);

    marker.on('dragend', (event) => {
      console.log(event)
    });

    this.MapListeners(map);
  }

  MapListeners(map: mapboxgl.Map) {
    console.log('object');
  }

}
