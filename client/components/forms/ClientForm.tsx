"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { createUser } from "@/lib/actions/client.actions";
import { UserFormValidation } from "@/lib/validation";

import { CustomFormField } from "../CustomFormField";
import SubmitButton from "../SubmitButton";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

const ClientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Form handler: What the form will gather from the user?
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      firstName: "",
      email: "",
      phone: "",
    },
  });

  // Submit handler: Do something with the form values.
  async function onSubmit({
    firstName,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    // ✅ This will be type-safe and validated.
    setIsLoading(true);

    try {
      const userData = { firstName, email, phone };

      const user = await createUser(userData);

      if (user) router.push(`/clients/${user.$id}/register`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header"> Hi there 🦋</h1>
          <p className="text-dark-700">
            This is the beginning of your self-care journey
          </p>
        </section>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="firstName"
          label="What is your first name?"
          placeholder="Butterfly"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

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
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default ClientForm;
