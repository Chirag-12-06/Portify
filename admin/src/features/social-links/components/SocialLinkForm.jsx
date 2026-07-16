import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import Button from "../../../components/ui/Button";
import FormActions from "../../../components/ui/FormActions";

import { socialLinkSchema } from "../schemas/socialLink.schema";

const platforms = [
  "GITHUB",
  "LINKEDIN",
  "LEETCODE",
  "CODEFORCES",
  "CODECHEF",
  "HACKERRANK",
  "TWITTER",
  "INSTAGRAM",
  "EMAIL",
  "OTHER",
];

export default function SocialLinkForm({
  socialLink,
  onSubmit,
  onCancel,
  isSubmitting,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(socialLinkSchema),
    defaultValues: {
      platform: "GITHUB",
      url: "",
      displayOrder: 1,
    },
  });

  useEffect(() => {
    reset(
      socialLink ?? {
        platform: "GITHUB",
        url: "",
        displayOrder: 1,
      },
    );
  }, [socialLink, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Select
        label="Platform"
        error={errors.platform?.message}
        {...register("platform")}
      >
        {platforms.map((platform) => (
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
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit" disabled={!isDirty || isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </FormActions>
    </form>
  );
}
