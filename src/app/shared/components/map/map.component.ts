import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { GoogleMapsModule, MapInfoWindow } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  imports: [GoogleMapsModule],
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  center: google.maps.LatLngLiteral = { lat: 41.655554, lng: -0.874916 };
  zoom: number = 15;
  infoWindowContent = '';

  map: google.maps.Map | undefined;
  markers: google.maps.marker.AdvancedMarkerElement[] = [];
  infoWindowInstance: google.maps.InfoWindow | undefined;
  
  mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true, // Desactiva todos los controles predeterminados
    zoomControl: false, // Desactiva el control de zoom
    mapTypeControl: false, // Desactiva el control de tipo de mapa (satélite, mapa, etc.)
    streetViewControl: false, // Desactiva el control de Street View
    fullscreenControl: false, // Desactiva el botón de pantalla completa
  };

  markerOptions: google.maps.marker.AdvancedMarkerElementOptions[] = [
    {
      position: { lat: 41.6561, lng: -0.8577 },
      title: 'Training Zone',
    },
    {
      position: { lat: 41.6508179, lng: -0.8886748 },
      title: 'Training Zone 2',
    },
  ];

  ngAfterViewInit(): void {
    // Inicializamos el mapa manualmente para trabajar con la API
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: this.center,
      zoom: 14,
    });

    // Crear los marcadores usando AdvancedMarkerElement
    this.markerOptions.forEach((option) => {
      const marker = new google.maps.marker.AdvancedMarkerElement({
        map: this.map,
        position: option.position,
        title: option.title,
      });

      // Asignamos el evento de clic al marcador
      marker.addListener('click', () => {
        this.openInfoWindow(marker);
      });

      this.markers.push(marker);
    });

    // Inicializar InfoWindow
    this.infoWindowInstance = new google.maps.InfoWindow();
  }

  openInfoWindow(marker: google.maps.marker.AdvancedMarkerElement) {
    this.infoWindowContent = marker.title;  // Usamos el título del marcador como contenido
    this.infoWindowInstance?.setContent(this.infoWindowContent);
    this.infoWindowInstance?.open(this.map, marker);
  }
}
