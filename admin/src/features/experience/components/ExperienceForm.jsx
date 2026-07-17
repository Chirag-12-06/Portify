import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../../../components/ui/Input";
import Textarea from "../../../components/ui/Textarea";
import Select from "../../../components/ui/Select";
import Button from "../../../components/ui/Button";
import FormActions from "../../../components/ui/Form/FormActions";
import Checkbox from "../../../components/ui/Form/Checkbox";

import { experienceSchema, defaultValues } from "../schemas/experience.schema";

import { useCreateExperience } from "../hooks/useCreateExperience";
import { useUpdateExperience } from "../hooks/useUpdateExperience";

import { useSkills } from "../../skills/hooks/useSkill";

export default function ExperienceForm({ experience, onClose }) {
  const createExperience = useCreateExperience();
  const updateExperience = useUpdateExperience();

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(experienceSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "points",
  });

  const { data: skills = [] } = useSkills();

  const currentlyWorking = watch("currentlyWorking");

  useEffect(() => {
  if (currentlyWorking) {
    setValue("endDate", "");
  }
}, [currentlyWorking, setValue]);

  useEffect(() => {
    if (!experience) {
      reset(defaultValues);
      return;
    }



    reset({
      ...experience,

      location: experience.location ?? "",
      companyImageUrl: experience.companyImageUrl ?? "",
      endDate: experience.endDate ? experience.endDate.slice(0, 10) : "",

      startDate: experience.startDate ? experience.startDate.slice(0, 10) : "",

      skillIds: experience.skills?.map(({ skill }) => skill.id) ?? [],

      points: experience.points ?? [],
    });
  }, [experience, reset]);

  const onSubmit = async (values) => {
     console.log(values);
    try {
      if (experience) {
        await updateExperience.mutateAsync({
          id: experience.id,
          values,
        });
      } else {
        await createExperience.mutateAsync(values);
      }

      reset(defaultValues);
      onClose();
    } catch {
      // Toast handled in mutation hook.
    }
  };

  const isSubmitting = createExperience.isPending || updateExperience.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Basic Information */}
      <div>
        <h3 className="mb-4 text-lg font-semibold">Basic Information</h3>

        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Company"
            placeholder="Google"
            error={errors.company?.message}
            {...register("company")}
          />

          <Input
            label="Role"
            placeholder="Software Engineer"
            error={errors.role?.message}
            {...register("role")}
          />

          <Input
            label="Location"
            placeholder="Bangalore, India"
            error={errors.location?.message}
            {...register("location")}
          />

          <Input
            label="Company Image URL"
            placeholder="https://..."
            error={errors.companyImageUrl?.message}
            {...register("companyImageUrl")}
          />
        </div>
      </div>

      {/* Employment Details */}
      <div>
        <h3 className="mb-4 text-lg font-semibold">Employment Details</h3>

        <div className="grid gap-4 md:grid-cols-2">
          <Input
            type="date"
            label="Start Date"
            error={errors.startDate?.message}
            {...register("startDate")}
          />

          <Input
            type="date"
            label="End Date"
            disabled={currentlyWorking}
            error={errors.endDate?.message}
            {...register("endDate")}
          />
        </div>

        <div className="mt-4">
          <Checkbox
            label="Currently Working"
            {...register("currentlyWorking")}
          />
        </div>
      </div>

      {/* Skills */}
      <div>
        <h3 className="mb-4 text-lg font-semibold">Skills</h3>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {skills.map((skill) => (
            <label
              key={skill.id}
              className="flex items-center gap-2 rounded-lg border p-3"
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
          <p className="mt-2 text-sm text-red-500">{errors.skillIds.message}</p>
        )}
      </div>

      {/* Experience Points */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Experience Points</h3>

          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              append({
                content: "",
                displayOrder: fields.length + 1,
              })
            }
          >
            Add Point
          </Button>
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="rounded-lg border p-4">
              <div className="grid gap-4 md:grid-cols-[1fr_120px_auto]">
                <Textarea
                  label={`Point ${index + 1}`}
                  rows={3}
                  error={errors.points?.[index]?.content?.message}
                  {...register(`points.${index}.content`)}
                />

                <Input
                  type="number"
                  min={0}
                  label="Order"
                  error={errors.points?.[index]?.displayOrder?.message}
                  {...register(`points.${index}.displayOrder`, {
                    valueAsNumber: true,
                  })}
                />

                <div className="flex items-end">
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FormActions>
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            reset(experience ?? defaultValues);
            onClose();
          }}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={!isDirty || isSubmitting}>
          {isSubmitting
            ? "Saving..."
            : experience
              ? "Update Experience"
              : "Create Experience"}
        </Button>
      </FormActions>
    </form>
  );
}
