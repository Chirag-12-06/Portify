import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import FormActions from "../../../components/ui/Form/FormActions";
import Checkbox from "../../../components/ui/Form/Checkbox";

import {
  educationSchema,
  defaultValues,
} from "../schemas/education.schema";

import { useCreateEducation } from "../hooks/useCreateEducation";
import { useUpdateEducation } from "../hooks/useUpdateEducation";

export default function EducationForm({ education, onClose }) {
  const createEducation = useCreateEducation();
  const updateEducation = useUpdateEducation();

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(educationSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(education ?? defaultValues);
  }, [education, reset]);

  const currentlyStudying = watch("currentlyStudying");

  useEffect(() => {
    if (currentlyStudying) {
      setValue("endDate", "");
    }
  }, [currentlyStudying, setValue]);

  const onSubmit = async (values) => {
    try {
      if (education) {
        await updateEducation.mutateAsync({
          id: education.id,
          values,
        });
      } else {
        await createEducation.mutateAsync(values);
      }

      reset(defaultValues);
      onClose();
    } catch {
      // Toast is handled inside mutation hooks.
    }
  };

  const isSubmitting =
    createEducation.isPending || updateEducation.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        label="Institution"
        placeholder="Thapar Institute of Engineering & Technology"
        error={errors.institution?.message}
        {...register("institution")}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Degree"
          placeholder="B.Tech"
          error={errors.degree?.message}
          {...register("degree")}
        />

        <Input
          label="Field of Study"
          placeholder="Computer Engineering"
          error={errors.fieldOfStudy?.message}
          {...register("fieldOfStudy")}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Location"
          placeholder="Patiala"
          error={errors.location?.message}
          {...register("location")}
        />

        <Input
          label="Grade"
          placeholder="8.9 CGPA"
          error={errors.grade?.message}
          {...register("grade")}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          type="date"
          label="Start Date"
          error={errors.startDate?.message}
          {...register("startDate")}
        />

        <Input
          type="date"
          label="End Date"
          disabled={currentlyStudying}
          error={errors.endDate?.message}
          {...register("endDate")}
        />
      </div>

      <Checkbox
        label="Currently Studying"
        {...register("currentlyStudying")}
      />

      <Input
        label="Institution Image URL"
        placeholder="https://..."
        error={errors.institutionImageUrl?.message}
        {...register("institutionImageUrl")}
      />

      <FormActions>
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            reset(education ?? defaultValues);
            onClose();
          }}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={!isDirty || isSubmitting}>
          {isSubmitting
            ? "Saving..."
            : education
            ? "Update Education"
            : "Create Education"}
        </Button>
      </FormActions>
    </form>
  );
}