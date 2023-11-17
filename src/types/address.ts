export interface Address {
  formattedAddress: string;
  location: Location;
}

export interface Location {
  lat: number;
  lng: number;
}
