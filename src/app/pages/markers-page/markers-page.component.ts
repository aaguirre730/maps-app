import { JsonPipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import { environment } from '@environments/environment.development';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import {v4 as UUIDv4} from 'uuid';

// configuración el worker externo
mapboxgl.workerUrl = '/assets/mapbox-gl-csp-worker.js';

interface Marker {
  id: string;
  mapboxMarker: mapboxgl.Marker;
}

@Component({
  selector: 'app-markers-page',
  imports: [JsonPipe],
  templateUrl: './markers-page.component.html',
})
export class MarkersPageComponent implements AfterViewInit {

  // Referencia al elemento del DOM como Signal
  divElement = viewChild<ElementRef>('map');

  map = signal<mapboxgl.Map|null>(null);

  markers = signal<Marker[]>([]);

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
  //    const marker = new mapboxgl.Marker({
  //      draggable: false,
  //      color: 'blue',
  //    })
  //    .setLngLat([-65.4103,-24.7883])
  //    .addTo(map);

   //   marker.on('dragend', (event) => {
   //     console.log(event)
  //    });

    this.mapListeners(map);
  }

  mapListeners(map: mapboxgl.Map) {

    map.on('click',(event) => this.mapClick(event))
    this.map.set(map); // guardamos la isntancia en la señal

  }

  mapClick(event: mapboxgl.MapMouseEvent) {

  if (!this.map()) return; // evitamos errores si el mapa aun es null
  const map = this.map()!;

  const colorRandom = '#xxxxxx'.replace(/x/g, (y) =>
    ((Math.random() * 16) | 0).toString(16)
  );

  const coords = event.lngLat;

  const mapboxMarker = new mapboxgl.Marker({
    draggable: false,
    color: colorRandom,
  }).setLngLat(coords)
  .addTo(map); // pasamos el valor de la señal, no el signal

  console.log(coords);

  const newMarker: Marker = {
    id:UUIDv4(),
    mapboxMarker: mapboxMarker
  }

  //this.markers.set([newMarker, ... this.markers()]);
  this.markers.update((markers) => [newMarker, ...markers]);

  console.log(this.markers());
  }

  flyToMarker(lngLat: LngLatLike) {
    if (!this.map) return;

    this.map()?.flyTo({
      center: lngLat,
      zoom: 14
    });
  }

  deleteMarker(marker: Marker) {
    if(!this.map()) return;
    const  map = this.map()!;

    marker.mapboxMarker.remove();
    this.markers.set(this.markers().filter(m => m.id !== marker.id)) // se puede usar el update

  }
}
