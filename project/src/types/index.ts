export interface LocationData {
  [state: string]: string[];
}

export interface VendorData {
  [city: string]: string | string[];
}

export interface FormData {
  state: string;
  city: string;
}