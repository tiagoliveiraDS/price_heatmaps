import '@testing-library/jest-dom';
import { describe, it, expect, vi, Mock } from 'vitest';
import { removeDuplicatesAndGetCoords, getCentroid } from '../app/components/Map/Map';
import { Property } from '../app/domain/Property';
import PropertyService from '../app/services/property.service';

const properties: Property[] = [
  { id: "1", latitude: 41.15, longitude: -8.61, price: 100000, district: "Porto", county: "Porto", parish: "Rua de Cedofeita" },
  { id: "2", latitude: 41.15, longitude: -8.61, price: 150000, district: "Porto", county: "Porto", parish: "Rua de Cedofeita" },
  { id: "3", latitude: 41.16, longitude: -8.62, price: 200000, district: "Porto", county: "Porto", parish: "Rua de Cedofeita" }
];

const fetchMock = vi.fn(async (url) => {
  if (url.includes('api/search?q=porto')) {
    return new Response(JSON.stringify(properties), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return new Response(null, { status: 404 });
});

global.fetch = fetchMock;

vi.mock('next/router', () => ({
  useRouter: vi.fn().mockReturnValue({
    query: { q: 'porto' },
  }),
}));


describe('Property Service', () => {
  const service = new PropertyService();

  it('should fetch properties for a given location', async () => {
    const data = await service.listPropertiesInLocation('porto');
    expect(data).toBeInstanceOf(Array);
    expect(data).toHaveLength(3);
    expect(data).toEqual(properties);
  });

  it('should return empty array for non-existent location', async () => {
    const data = await service.listPropertiesInLocation('nonexistent');
    expect(data).toBeInstanceOf(Array);
    expect(data).toHaveLength(0);
  });

  it('should call fetch with correct URL', async () => {
    await service.listPropertiesInLocation('porto');
    expect(fetchMock).toHaveBeenCalledWith('api/search?q=porto');
  });

  it('should return properties with the correct shape', async () => {
    const data = await service.listPropertiesInLocation('porto');
    data.forEach((property) => {
      expect(property).toHaveProperty('id');
      expect(property).toHaveProperty('latitude');
      expect(property).toHaveProperty('longitude');
      expect(property).toHaveProperty('price');
      expect(property).toHaveProperty('district');
      expect(property).toHaveProperty('county');
      expect(property).toHaveProperty('parish');
    });
  });
  

});
