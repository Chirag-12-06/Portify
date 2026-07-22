import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import Button from "../../../components/ui/Button";
import FormActions from "../../../components/ui/Form/FormActions";

import { TECHNOLOGY_CATEGORIES } from "../constants/TechnologyCategories";

import { technologySchema, defaultValues } from "../schemas/technology.schema";
import { useCreateTechnology } from "../hooks/useCreateTechnology";
import { useUpdateTechnology } from "../hooks/useUpdateTechnology";

const categories = TECHNOLOGY_CATEGORIES;

export default function TechnologyForm({ technology, onClose }) {
  const createTechnology = useCreateTechnology();
  const updateTechnology = useUpdateTechnology();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(technologySchema),
    defaultValues,
  });

  useEffect(() => {
    reset(technology ?? defaultValues);
  }, [technology, reset]);

  const onSubmit = async (values) => {
    try {
      if (technology) {
        await updateTechnology.mutateAsync({
          id: technology.id,
          values,
        });
      } else {
        await createTechnology.mutateAsync(values);
      }

      reset(defaultValues);
      onClose();
    } catch {
      // Toast is handled inside mutation hooks.
    }
  };

  const isSubmitting = createTechnology.isPending || updateTechnology.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        label="Technology Name"
        placeholder="React"
        error={errors.name?.message}
        {...register("name")}
      />

      <Select
        label="Category"
        error={errors.category?.message}
        {...register("category")}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category.replace(/_/g, " ")}
          </option>
        ))}
      </Select>

      <Input
        label="Image URL"
        placeholder="https://..."
        error={errors.imageUrl?.message}
        {...register("imageUrl")}
      />

      <FormActions>
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            reset(skill ?? defaultValues);
            onClose();
          }}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={!isDirty || isSubmitting}>
          {isSubmitting ? "Saving..." : skill ? "Update Skill" : "Create Skill"}
        </Button>
      </FormActions>
    </form>
  );
}
