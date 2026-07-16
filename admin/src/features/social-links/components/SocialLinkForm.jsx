import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import Button from "../../../components/ui/Button";
import FormActions from "../../../components/ui/Form/FormActions";

import { PLATFORMS } from "../constants/Platforms";

import { socialLinkSchema, defaultValues } from "../schemas/socialLink.schema";

import { useCreateSocialLink } from "../hooks/useCreateSocialLink";
import { useUpdateSocialLink } from "../hooks/useUpdateSocialLink";

export default function SocialLinkForm({ socialLink, onClose }) {
  const createSocialLink = useCreateSocialLink();
  const updateSocialLink = useUpdateSocialLink();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(socialLinkSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(socialLink ?? defaultValues);
  }, [socialLink, reset]);

  const onSubmit = async (values) => {
    try {
      if (socialLink) {
        await updateSocialLink.mutateAsync({
          id: socialLink.id,
          values,
        });
      } else {
        await createSocialLink.mutateAsync(values);
      }

      reset(defaultValues);
      onClose();
    } catch {
      // Toast handled in mutation hooks
    }
  };

  const isSubmitting = createSocialLink.isPending || updateSocialLink.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Select
        label="Platform"
        error={errors.platform?.message}
        {...register("platform")}
      >
        {PLATFORMS.map((platform) => (
          <option key={platform} value={platform}>
            {platform}
          </option>
        ))}
      </Select>

      <Input
        label="URL"
        placeholder="https://..."
        error={errors.url?.message}
        {...register("url")}
      />

      <Input
        type="number"
        min={1}
        label="Display Order"
        error={errors.displayOrder?.message}
        {...register("displayOrder", {
          valueAsNumber: true,
        })}
      />

      <FormActions>
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            reset(socialLink ?? defaultValues);
            onClose();
          }}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={!isDirty || isSubmitting}>
          {isSubmitting
            ? "Saving..."
            : socialLink
              ? "Update Social Link"
              : "Create Social Link"}
        </Button>
      </FormActions>
    </form>
  );
}
