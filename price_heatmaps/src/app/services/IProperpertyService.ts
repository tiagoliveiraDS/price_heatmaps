import { Property } from "../domain/Property";

export default interface IPropertyService {
    listPropertiesInLocation(searchQuery: string): Promise<Property[]>;
}