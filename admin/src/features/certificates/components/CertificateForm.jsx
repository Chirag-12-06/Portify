import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Button from "../../../components/ui/Button";
import Checkbox from "../../../components/ui/Form/Checkbox";
import FormActions from "../../../components/ui/Form/FormActions";
import Input from "../../../components/ui/Input";

import {
  certificateSchema,
  defaultValues,
} from "../schemas/certificate.schema";

import { useCreateCertificate } from "../hooks/useCreateCertificate";
import { useUpdateCertificate } from "../hooks/useUpdateCertificate";

import { useSkills } from "../../skills/hooks/useSkill";
import { useIssuers } from "../../issuer/hooks/useIssuer";

export default function CertificateForm({ certificate, onClose }) {
  const createCertificate = useCreateCertificate();
  const updateCertificate = useUpdateCertificate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(certificateSchema),
    defaultValues,
  });

  const { data: skills = [] } = useSkills();
  const { data: issuers = [] } = useIssuers();

  const selectedSkills = watch("skillIds");

  useEffect(() => {
    if (!certificate) {
      reset(defaultValues);
      return;
    }

    reset({
      ...certificate,
      credentialUrl: certificate.credentialUrl ?? "",
      badgeImageUrl: certificate.badgeImageUrl ?? "",
      issueDate: certificate.issueDate?.split("T")[0] ?? "",
      expiryDate: certificate.expiryDate?.split("T")[0] ?? "",
      skillIds: certificate.skills?.map(({ skill }) => skill.id) ?? [],
      issuerId: certificate.issuerId ?? "",
    });
  }, [certificate, reset]);

  const onSubmit = async (values) => {
    try {
      if (certificate) {
        await updateCertificate.mutateAsync({
          id: certificate.id,
          values,
        });
      } else {
        await createCertificate.mutateAsync(values);
      }

      reset(defaultValues);
      onClose();
    } catch {
      // Toast handled in mutation hooks.
    }
  };

  const isSubmitting =
    createCertificate.isPending || updateCertificate.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Basic Information */}
      <section className="space-y-5">
        <h3 className="text-lg font-semibold">Basic Information</h3>

        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="Title"
            error={errors.title?.message}
            {...register("title")}
          />

          <div className="space-y-2">
            <label className="text-sm font-medium">Issuer</label>

            <select
              {...register("issuerId")}
              className="w-full rounded-lg border border-input bg-background px-3 py-2"
            >
              <option value="">Select Issuer</option>

              {issuers.map((issuer) => (
                <option key={issuer.id} value={issuer.id}>
                  {issuer.name}
                </option>
              ))}
            </select>

            {errors.issuerId && (
              <p className="text-sm text-red-500">{errors.issuerId.message}</p>
            )}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Input
            type="date"
            label="Issue Date"
            error={errors.issueDate?.message}
            {...register("issueDate")}
          />

          <Input
            type="date"
            label="Expiry Date"
            error={errors.expiryDate?.message}
            {...register("expiryDate")}
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Input
            type="number"
            min={1}
            label="Display Order"
            error={errors.displayOrder?.message}
            {...register("displayOrder", {
              valueAsNumber: true,
            })}
          />

          <div className="flex items-end pb-2">
            <Checkbox label="Featured Certificate" {...register("featured")} />
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="space-y-5">
        <h3 className="text-lg font-semibold">Links</h3>

        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="Credential URL"
            placeholder="https://..."
            error={errors.credentialUrl?.message}
            {...register("credentialUrl")}
          />

          <Input
            label="Badge Image URL"
            placeholder="https://..."
            error={errors.badgeImageUrl?.message}
            {...register("badgeImageUrl")}
          />
        </div>
      </section>

      {/* Skills */}
      <section className="space-y-5">
        <h3 className="text-lg font-semibold">Skills</h3>

        <div className="grid grid-cols-2 gap-4">
          {skills.map((skill) => (
            <label
              key={skill.id}
              className="flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-slate-50"
            >
              <input
                type="checkbox"
                value={skill.id}
                {...register("skillIds")}
              />

              <span>{skill.name}</span>
            </label>
          ))}
        </div>

        {errors.skillIds && (
          <p className="text-sm text-red-500">{errors.skillIds.message}</p>
        )}
      </section>

      {/* Visibility */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Visibility</h3>

        <Checkbox label="Visible on Portfolio" {...register("isVisible")} />
      </section>

      <FormActions>
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            reset(certificate ?? defaultValues);
            onClose();
          }}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={!isDirty || isSubmitting}>
          {isSubmitting
            ? "Saving..."
            : certificate
              ? "Update Certificate"
              : "Create Certificate"}
        </Button>
      </FormActions>
    </form>
  );
}
