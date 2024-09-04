"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl } from "@/components/ui/form";
import { registerClient } from "@/lib/actions/client.actions";
import { ClientFormValidation } from "@/lib/validation";

import { CustomFormField } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { FormFieldType } from "./ClientForm";
import {
  IdentificationTypes,
  ClientFormDefaultValues,
  SexOptions,
} from "@/constants";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "../ui/label";
import { SelectItem } from "@/components/ui/select";
import FileUploader from "../FileUploader";

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Form handler: What the form will gather from the user?
  const form = useForm<z.infer<typeof ClientFormValidation>>({
    resolver: zodResolver(ClientFormValidation),
    defaultValues: {
      ...ClientFormDefaultValues,
      lastName: "",
      firstName: "",
      middleName: "",
      email: "",
      phone: "",
    },
  });

  // Submit handler: Do something with the form values.
  async function onSubmit(values: z.infer<typeof ClientFormValidation>) {
    // ✅ This will be type-safe and validated.
    setIsLoading(true);

    let formData;

    if (
      values.identificationDocument?.length &&
      values.identificationDocument.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }
    try {
      const clientData = {
        ...values,
        userId: user.$id,
        birthDate: new Date(values.birthDate),
        identificationDocument: formData,
      };

      // @ts-ignore
      const client = await registerClient(clientData);

      if (client) router.push(`/clients/${user.$id}/new-appointment`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="space-y-4">
          <h1 className="header">Fill up the form</h1>
          <p className="text-dark-700">
            Thank you for choosing A.M. Peralta Psychological Services. Filling
            in the required information is necessary for our Psychologist and
            Psychotherapist to have a well-directed clinical interview with you.
          </p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
        </section>

        {/* Full Name */}
        <div className="flex flex-wrap gap-2 xl:flex-nowrap">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="lastName"
            label="Last Name"
            placeholder="Last Name"
            className="w-1/3 xl:w-1/2"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="firstName"
            label="First Name"
            placeholder="First Name"
            className="w-1/3 xl:w-1/2"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="middleName"
            label="Middle Name"
            placeholder="Middle Name"
            className="w-1/6 xl:w-1/4"
          />
        </div>

        {/* Email and Phone */}
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="butterfly@butterfly.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />

          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone Number"
          />
        </div>

        {/* Date of Birth and Sex */}
        <div className="flex gap-4 xl:flex-nowrap">
          <div className="flex-1">
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="birthdate"
              label="Date of Birth"
              className="w-full"
            />
          </div>

          <div className="flex-1">
            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="sex"
              label="Sex"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-4 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {SexOptions.map((option) => (
                      <div key={option} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
              className="w-full"
            />
          </div>
        </div>

        {/* Height */}
        <div className="flex flex-col gap-6 xl:flex-row">
          {/* <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="height"
            label="Height"
            placeholder="5' 10''"
            iconSrc="/assets/icons/height.svg"
            className="w-1/3 xl:w-1/2"
          /> */}
        </div>

        {/* Address*/}
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="address"
            label="Home Address"
            placeholder="Street Name, Building, House No."
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="barangay"
            label="Barangay"
            placeholder="Barangay"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="city"
            label="City"
            placeholder="City"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="province"
            label="Province"
            placeholder="Province"
          />
        </div>

        {/* Occupation */}
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="occupation"
            label="Occupation"
            placeholder="Occupation"
            iconSrc="/assets/icons/occupation.svg"
            iconAlt="occupation"
          />
        </div>

        {/* Emergency Contact */}
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="emergencyContactName"
            label="Person to Contact in Case of Emergency"
            placeholder="Name of emergency contact"
          />
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="emergencyContactNumber"
            label="Emergency Contact Number"
          />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>
        </section>

        {/* Insurance */}
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="insuranceProvider"
            label="Insurance Provider"
            placeholder="Philhealth"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="insurancePolicyNumber"
            label="Insurance Policy Number"
          />
        </div>

        {/* Allergies and Medications */}
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="allergies"
            label="Allergies (if any)"
            placeholder="Peanuts, Penicillin, Dust, etc."
          />
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="allergyDetails"
            label="Please indicate details of allergies"
            placeholder="My allergies..."
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="currentMedications"
            label="Current Medications (if any)"
          />
        </div>

        {/* Family Medical History */}
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="familyMedicalHistory"
            label="Family Medical History"
          />
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="pastMedicalHistory"
            label="Past Medical History"
          />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verification</h2>
          </div>
        </section>

        {/* Identification Type, Number, and Upload */}
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="identificationType"
          label="Identification Type"
          placeholder="Select an Identification Type"
        >
          {IdentificationTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="identificationNumber"
          label="Identification Number"
        />

        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="identificationDocument"
          label="Identification Document"
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="therapyConsent"
          label="I consent to participate in online psychotherapy sessions with a licensed therapist, which may include discussion of my mental health, personal experiences, and other sensitive topics."
        />
        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="disclosureConsent"
          label="I consent to the disclosure of my personal and health information to my therapist and other authorized personnel for the purpose of providing online psychotherapy services, in accordance with applicable laws and regulations."
        />
        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="privacyConsent"
          label="I acknowledge that I have reviewed and agree to the Privacy Policy, which explains how my personal data will be collected, used, and protected, including my rights to access, correct, and delete my data."
        />

        <SubmitButton isLoading={isLoading}>Register</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
