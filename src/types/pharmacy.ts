import { BaseEntity } from "./base-entity";

export interface Pharmacy extends BaseEntity {
  tin: string;
  name: string;
  ownerEmail: string;
  email: string;
  phone: string;
  website: string;
  address: string;
}
