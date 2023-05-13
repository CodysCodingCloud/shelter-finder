export interface ShelterInfo {
  _id?: string;
  name: string;
  organization: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  stateAbbreviation: string;
  postal: string;
  phone?: string;
  website?: string;
  openSpace?: string;
  capacity?: string;
  description?: string;
  requirements?: string;
  avatar?: string | File;
  user?: string;
  updatedAt?: string;
}
