export interface IntellectualProperty {
    id: number;
    firstName: string;
    lastName: string;
    description: string;
    fileHash?: string;
    fileName?: string;
    ownerAddress?: string;
}

export interface IntellectualPropertyFormData {
    name?: string;
    fileHash?: string;
}