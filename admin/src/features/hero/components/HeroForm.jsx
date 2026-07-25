import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

import { heroSchema, defaultValues } from "../schemas/hero.schema";

export default function HeroForm({ hero, onSubmit, isSubmitting }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(heroSchema),
    defaultValues,
  });

  useEffect(() => {
    if (hero) {
      reset(hero);
    }
  }, [hero, reset]);

  return (
  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
    <Input
      label="Title"
      error={errors.heroTitle?.message}
      {...register("heroTitle")}
    />

    <Input
      label="Tagline"
      error={errors.tagline?.message}
      {...register("tagline")}
    />

    <Input
      label="Availability"
      error={errors.availability?.message}
      {...register("availability")}
    />

    <Input
      label="Hero Image URL"
      error={errors.heroImageUrl?.message}
      {...register("heroImageUrl")}
    />

    <Input
      label="Description"
      error={errors.description?.message}
      {...register("description")}
    />

    <div className="flex justify-end gap-3">
      <Button
        type="button"
        variant="secondary"
        onClick={() => reset(hero)}
      >
        Reset
      </Button>

      <Button type="submit" disabled={!isDirty || isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  </form>
);
}
