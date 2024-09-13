import { BaseEntity } from "@/types/base-entity.ts";
import { Pharmacy } from "./pharmacy";
import {
  ActiveIngredient,
  Allergy,
  DosageForm,
  Indication,
  Manufacturer,
  RegulatoryInformation,
  RouteOfAdministration,
  SideEffect,
  SpecialRequirement,
  UsageWarning,
} from "./attributes";

export interface Product extends BaseEntity {
  pharmacyId: number;
  pharmacy: Pharmacy;
  description: string;
  imageUrl: string;
  strengthMg: number;
  contraindicationsDescription: string;
  storageConditionDescription: string;
  regulatoryInformationId: number;
  specialRequirement: SpecialRequirement;
  manufacturer: Manufacturer;
  regulatoryInformation: RegulatoryInformation;
  activeIngredients: ActiveIngredient[];
  dosageForms: DosageForm[];
  routeOfAdministrations: RouteOfAdministration[];
  sideEffects: SideEffect[];
  usageWarnings: UsageWarning[];
  allergies: Allergy[];
  indications: Indication[];
  manufacturingDate: Date;
  expiryDate: Date;
  batchNumber: number;
  barcode: string;
  packagingWeight: number;
  stock: number;
  price: number;
}
