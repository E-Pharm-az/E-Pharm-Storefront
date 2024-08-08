import {BaseEntity} from "@/types/base-entity.ts";

export interface Product extends BaseEntity{
    pharmaCompanyId: number;
    description: string;
    imageUrl: string;
    strengthMg: number;
    regulatoryInformationId: number;
    manufacturingDate: Date;
    expiryDate: Date;
    stock: number;
    price: number;
}