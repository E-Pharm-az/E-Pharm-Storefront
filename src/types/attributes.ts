import { BaseEntity } from "./base-entity";

export interface SpecialRequirments extends BaseEntity {
    pharmacyId: number;
    minimumAgeInMonthsRequirement: number;
    maximumAgeInMonthsRequirement: number;
    minimumWeighInKgRequirement: number;
    maximumWeighInKgRequirement: number;
    medicalConditionsDescription: string;
    otherRequirementsDescription: string;
}

export interface ActiveIngredient extends BaseEntity {
    description: string;
  }
  
  export interface Allergy extends BaseEntity {}
  
  export interface DosageForm extends BaseEntity {}
  
  export interface Indication extends BaseEntity {}
  
  export interface SpecialRequirement extends BaseEntity {
    minimumAgeInMonthsRequirement: number;
    maximumAgeInMonthsRequirement: number;
    minimumWeighInKgRequirement: number;
    maximumWeighInKgRequirement: number;
    medicalConditionsDescription: string;
    otherRequirementsDescription: string;
  }
  
  export interface RegulatoryInformation extends BaseEntity {
    approvalDate: Date
    certification: string;
  }
  
  export interface RouteOfAdministration extends BaseEntity {}
  
  export interface SideEffect extends BaseEntity {}
  
  export interface UsageWarning extends BaseEntity {}
  
  export interface Manufacturer extends BaseEntity {
    country: string;
    website: string;
    email: string;
  }
  
  export interface Warehouse extends BaseEntity {
    address: string;
    productInventory: number;
  }