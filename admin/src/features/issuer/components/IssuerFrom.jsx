import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Button from "../../../components/ui/Button";
import FormActions from "../../../components/ui/Form/FormActions";
import Input from "../../../components/ui/Input";

import {
  issuerSchema,
  defaultValues,
} from "../schemas/issuer.schema";

import { useCreateIssuer } from "../hooks/useCreateIssuer";
import { useUpdateIssuer } from "../hooks/useUpdateIssuer";

export default function IssuerForm({ issuer, onClose }) {
  const createIssuer = useCreateIssuer();
  const updateIssuer = useUpdateIssuer();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(issuerSchema),
    defaultValues,
  });

  useEffect(() => {
    if (!issuer) {
      reset(defaultValues);
      return;
    }

    reset({
      ...issuer,
      logo: issuer.logo ?? "",
    });
  }, [issuer, reset]);

  const onSubmit = async (values) => {
    try {
      if (issuer) {
        await updateIssuer.mutateAsync({
          id: issuer.id,
          values,
        });
      } else {
        await createIssuer.mutateAsync(values);
      }

      reset(defaultValues);
      onClose();
    } catch {
      // Toast handled in mutation hooks.
    }
  };

  const isSubmitting =
    createIssuer.isPending || updateIssuer.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <section className="space-y-5">
        <h3 className="text-lg font-semibold">
          Issuer Information
        </h3>

        <Input
          label="Issuer Name"
          placeholder="Coursera"
          error={errors.name?.message}
          {...register("name")}
        />

        <Input
          label="Logo URL"
          placeholder="https://..."
          error={errors.logo?.message}
          {...register("logo")}
        />
      </section>

      <FormActions>
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            reset(issuer ?? defaultValues);
            onClose();
          }}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={!isDirty || isSubmitting}
        >
          {isSubmitting
            ? "Saving..."
            : issuer
              ? "Update Issuer"
              : "Create Issuer"}
        </Button>
      </FormActions>
    </form>
  );
}