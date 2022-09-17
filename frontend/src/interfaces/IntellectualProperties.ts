import { BigNumber } from "ethers";

/**
 * Interface of the IntellectualProperty
 * @interface
 */
export interface IntellectualProperty {
    id: number;
    firstName: string;
    lastName: string;
    description: string;
    fileHash?: string;
    fileName?: string;
    ownerAddress?: string;
    date: BigNumber;
}

/**
 * Interface of the IntellectualPropertyFormData
 * @interface
 */
export interface IntellectualPropertyFormData {
    name?: string;
    fileHash?: string;
}

/**
 * Interface of the Request
 * @interface
 */
export interface Request {
  id: number;
  ipId: number;
  requestor: string;
  description: string;
}