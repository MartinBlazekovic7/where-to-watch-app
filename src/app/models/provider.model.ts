export class ProviderResponse {
  results?: Provider;
}

export class Provider {
  id?: number;
  logo_path?: string;
  provider_id?: number;
  provider_name?: string;
  display_priority?: string;
}

export class ProviderList {
  flatrate?: Provider[];
  buy?: Provider[];
  rent?: Provider[];
}
