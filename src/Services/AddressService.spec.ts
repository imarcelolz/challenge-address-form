import { postalCodesMock } from '@/Mocks/PostalCodes';
import { AddressService } from './AddressService';

let target;

beforeEach(() => {
  target = new AddressService(postalCodesMock);
});

describe('#constructor', () => {
  beforeEach(() => {
    target = new AddressService();
  });

  it('loads all postal codes if they are not specified', () => {
    expect(target.addresses.length).toBeGreaterThan(postalCodesMock.length);
  });
});

describe('#searchCity', () => {
  it('return empty for invalid results', () => {
    expect(target.searchCity('99999')).resolves.toEqual([]);
  });

  it('return array with the city names that match partially within the query', () => {
    expect(target.searchCity('b')).resolves.toEqual(['berlin']);
    expect(target.searchCity('h')).resolves.toEqual(['hamburg']);
  });
});

describe('#validatePostalCode', () => {
  it('return false for invalid results', () => {
    expect(target.validatePostalCode(99999)).resolves.toEqual(false);
  });

  it('return true for valid postalCodes', () => {
    expect(target.validatePostalCode(12341)).resolves.toEqual(true);
  });
});
