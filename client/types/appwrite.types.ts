import { Models } from "node-appwrite";

export interface Client extends Models.Document {
  userId: string;
  name: string;
  email: string;
  phone: string;
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: Date;
  sex: Sex;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPsychotherapist: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies: string | undefined;
  currentMedication: string | undefined;
  familyMedicalHistory: string | undefined;
  pastMedicalHistory: string | undefined;
  identificationType: string | undefined;
  identificationNumber: string | undefined;
  identificationDocument: FormData | undefined;
  treatmentConsent: boolean;
  disclosureConsent: boolean;
  privacyConsent: boolean;
}

export interface Appointment extends Models.Document {
  client: Client;
  schedule: Date;
  status: Status;
  primaryPsychotherapist: string;
  reason: string;
  note: string;
  userId: string;
  cancellationReason: string | null;
}
