import PropertyService from "@/app/services/property.service";
import IPropertyService from "./app/services/IProperpertyService";

export type Dependencies = {
  propertyService: IPropertyService;
};

export const dependencies: Dependencies = {
  propertyService: new PropertyService(),
};
