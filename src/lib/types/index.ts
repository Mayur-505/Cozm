export interface AddressResult {
  name: string;
  street_name: string | null;
  house_number: string | null;
  postal_code: string;
  city: string;
  country: string;
  website: string;
  phone: string | null;
}
