import { Component, ViewChild, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  imports: [GoogleMapsModule, CommonModule],
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {
  @ViewChild('infoWindow') infoWindow!: MapInfoWindow;
  @ViewChildren(MapMarker) markers!: QueryList<MapMarker>;
  
  center: google.maps.LatLngLiteral = { lat: 41.655554, lng: -0.874916 };
  zoom: number = 15;
  
  mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true,
    zoomControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  };

  markerOptions = [
    {
      position: { lat: 41.6561, lng: -0.8577 },
      placeId: 's0xd5915dd28553b8b:0xfc38d663211518ba',
      title: 'Training Zone', // Título temporal hasta cargar datos
    },
    {
      position: { lat: 41.6508179, lng: -0.8886748 },
      placeId: 's0xd5915bdee11bd07:0xd12c23c88744dd4c',
      title: 'Training Zone 2',
    },
  ];

  selectedMarker: any = null;
  placesService!: google.maps.places.PlacesService;

  ngAfterViewInit() {
    // Dar tiempo para que se inicialice el mapa
    setTimeout(() => {
      this.initializePlacesService();
    }, 1000);
  }

  private initializePlacesService() {
    // Buscar el elemento div del mapa
    const mapContainer = document.querySelector('google-map');
    const mapDiv = mapContainer?.querySelector('div[role="region"]') || 
                   mapContainer?.querySelector('div') ||
                   mapContainer;
    
    if (mapDiv) {
      this.placesService = new google.maps.places.PlacesService(mapDiv as HTMLDivElement);
    } else {
      console.warn('No se pudo inicializar Places Service');
    }
  }

  onMarkerClick(index: number) {
    const marker = this.markers.toArray()[index];
    const markerData = this.markerOptions[index];
    
    if (!this.placesService) {
      // Fallback si no hay Places Service
      this.selectedMarker = {
        ...markerData,
        title: markerData.title,
        rating: 0,
        reviews: 0,
        address: 'Dirección no disponible'
      };
      this.infoWindow.open(marker);
      return;
    }
    
    // Obtener datos reales de Google Places
    this.getPlaceDetails(markerData.placeId, (placeResult) => {
      this.selectedMarker = {
        ...markerData,
        title: placeResult.name || markerData.title,
        rating: placeResult.rating || 0,
        reviews: placeResult.user_ratings_total || 0,
        address: placeResult.formatted_address || 'Dirección no disponible',
        phone: placeResult.formatted_phone_number || '',
        website: placeResult.website || ''
      };
      
      this.infoWindow.open(marker);
    });
  }

  getPlaceDetails(placeId: string, callback: (result: google.maps.places.PlaceResult) => void) {
    const request = {
      placeId: placeId,
      fields: [
        'name', 
        'rating', 
        'user_ratings_total', 
        'formatted_address',
        'formatted_phone_number',
        'website'
      ]
    };

    this.placesService.getDetails(request, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && place) {
        callback(place);
      } else {
        console.error('Error al obtener detalles del lugar:', status);
        // Fallback con datos básicos
        const fallbackMarker = this.markerOptions.find(m => m.placeId === placeId);
        callback({
          name: fallbackMarker?.title || 'Sin nombre',
          rating: 0,
          user_ratings_total: 0,
          formatted_address: 'Dirección no disponible'
        } as google.maps.places.PlaceResult);
      }
    });
  }

  openInGoogleMaps(marker: any) {
    const lat = marker.position.lat;
    const lng = marker.position.lng;
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(url, '_blank');
  }
}