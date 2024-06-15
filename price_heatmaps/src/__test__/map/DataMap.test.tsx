import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { removeDuplicatesAndGetCoords, getCentroid } from '../../app/components/Map/Map'; 
import { Property } from '../../app/domain/Property';

describe('DataMap Component', () => {
  const properties: Property[] = [
    { id: "1", latitude: 41.15, longitude: -8.61, price: 100000, district: "Porto", county: "Porto", parish: "Rua de Cedofeita"},
    { id: "2", latitude: 41.15, longitude: -8.61, price: 150000, district: "Porto", county: "Porto", parish: "Rua de Cedofeita"},
    { id: "3", latitude: 41.16, longitude: -8.62, price: 200000, district: "Porto", county: "Porto", parish: "Rua de Cedofeita"},
  ];

  it('removeDuplicatesAndGetCoords should return correct values', () => {
    const result = removeDuplicatesAndGetCoords(properties);
    expect(result.uniqueProperties).toEqual([
      [41.15, -8.61, 125000],
      [41.16, -8.62, 200000]
    ]);
    expect(result.duplicatedCoords).toEqual([
      { latitude: 41.15, longitude: -8.61, count: 2 }
    ]);
  });

  it('removeDuplicatesAndGetCoords should return empty arrays', () => {
    const propertiesNull: Property[] = [];
    const result = removeDuplicatesAndGetCoords(propertiesNull);
    expect(result.uniqueProperties).toEqual([]);
    expect(result.duplicatedCoords).toEqual([]);
  });

  it('getCentroid works correctly', () => {
        const result = getCentroid(properties);
        expect(result).toEqual({ mean_lat: 41.15333333333333, mean_long: -8.613333333333332 });
  });
});
