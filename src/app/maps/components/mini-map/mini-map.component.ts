import { DecimalPipe, JsonPipe } from '@angular/common';
import { AfterViewInit, Component, effect, ElementRef, input, signal, viewChild } from '@angular/core';
import { environment } from '@environments/environment.development';
import mapboxgl from 'mapbox-gl';

// configuración el worker externo
mapboxgl.workerUrl = '/assets/mapbox-gl-csp-worker.js';

interface Coordenadas {
  lng: number;
  lat: number;
}

@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.component.html',
})

export class MiniMapComponent implements AfterViewInit{
  
  coords = input.required<Coordenadas>();

  divElement = viewChild<ElementRef>('map');

  map = signal<mapboxgl.Map | null>(null);

  async ngAfterViewInit() {
    if (!this.divElement()?.nativeElement) return;

    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement()!.nativeElement;
    const { lng, lat } = this.coords();

    const map = new mapboxgl.Map({
      accessToken: environment.mapboxKey, // associates the map with your Mapbox account and its permissions
      container: element, // container ID
      center: [lng, lat], // starting position [lng, lat]. Note that lat must be set between -90 and 90
      zoom: 14, // starting zoom
      interactive: false,
    });

  const mapboxMarker = new mapboxgl.Marker({
    draggable: false,
    color: 'red',
  }).setLngLat(this.coords())
  .addTo(map);
  }

}
