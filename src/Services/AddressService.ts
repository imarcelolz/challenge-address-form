import { postalCodes } from '@/Assets/PostalCodes';
export class AddressService {
  private cities: Array<string>;

  constructor(private addresses: any[] = null){
    this.addresses = this.addresses || postalCodes;
    this.cities = this.addresses.map(item => item[1]).filter(this.unique);
  }

  searchCity = (query: string): Promise<string[]> => {
    const filteredCities = this.cities.filter(city =>
      city.toLowerCase().startsWith(query)
    );

    return Promise.resolve(filteredCities);
  }

  validatePostalCode = (postalCode: number): Promise<boolean> => {
    const element = this.addresses.find(item => item[0] === postalCode);

    return Promise.resolve(!!element);
  }

  private unique(value, index, self) {
    return self.indexOf(value) === index;
  }
}
