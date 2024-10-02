"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { createUser } from "@/lib/actions/client.actions";
import { UserFormValidation } from "@/lib/validation";

import "react-phone-number-input/style.css";
import { CustomFormField, FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";

const ClientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Client Form Values
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      firstName: "",
      email: "",
      phone: "",
    },
  });

  // Submit Handler: Proceed to Pre-Assessment
  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);

    try {
      const user = {
        name: values.firstName,
        email: values.email,
        phone: values.phone,
      };

      const newUser = await createUser(user);

      if (newUser) {
        router.push(`/clients/${newUser.$id}/register`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12">
          <div>
            <br />
            <h1 className="header text-center">A.M. Peralta</h1>
            <h2 className="header text-center">Psychological Services</h2>
            <br />
            <p className="text-dark-500 text-center">
              This is the beginning of your self-care journey
            </p>
          </div>
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
        <SubmitButton
          isLoading={isLoading}
          className="shad-primary-alt-btn w-full"
        >
          Get Started
        </SubmitButton>
      </form>
    </Form>
  );
};

export default ClientForm;
