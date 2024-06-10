import useSWR from "swr";
import { Property } from "../domain/Property";
import IPropertyService from "./IProperpertyService";

export default class PropertyService implements IPropertyService{
    async listPropertiesInLocation(searchQuery: string): Promise<Property[]> {
        try {
            const response = await fetch(`api/search?q=${searchQuery}`); // Assuming you have an API route at /pages/api/data.js
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data: Property[]  = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    }
}