import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../../../components/ui/Input";
import Textarea from "../../../components/ui/Textarea";
import Select from "../../../components/ui/Select";
import Button from "../../../components/ui/Button";
import FormActions from "../../../components/ui/Form/FormActions";
import Checkbox from "../../../components/ui/Form/Checkbox";

import { STATUS } from "../constants/status";

import { projectSchema, defaultValues } from "../schemas/project.schema";

import { useCreateProject } from "../hooks/useCreateProject";
import { useUpdateProject } from "../hooks/useUpdateProject";

import { useSkills } from "../../skills/hooks/useSkill";

const statusOptions = STATUS;

export default function ProjectForm({ project, onClose }) {
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues,
  });

  const {
  fields,
  append,
  remove,
} = useFieldArray({
  control,
  name: "images",
});

  const { data: skills = [] } = useSkills();

  const selectedSkills = watch("skillIds");

  useEffect(() => {
    if (!project) {
      reset(defaultValues);
      return;
    }

    reset({
      ...project,
      githubUrl: project.githubUrl ?? "",
      liveUrl: project.liveUrl ?? "",
      images: project.images ?? [],
      skillIds: project.skills?.map(({ skill }) => skill.id) ?? [],
       images: project.images ?? [],
    });
  }, [project, reset]);

  const onSubmit = async (values) => {
    try {
      if (project) {
        await updateProject.mutateAsync({
          id: project.id,
          values,
        });
      } else {
        await createProject.mutateAsync(values);
      }

      reset(defaultValues);
      onClose();
    } catch {
      // Toast handled in mutation hooks.
    }
  };

  const isSubmitting = createProject.isPending || updateProject.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Basic Information</h3>

        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Slug"
            placeholder="budgetwise"
            error={errors.slug?.message}
            {...register("slug")}
          />

          <Input
            label="Title"
            placeholder="BudgetWise"
            error={errors.title?.message}
            {...register("title")}
          />

          <Select
            label="Status"
            error={errors.status?.message}
            {...register("status")}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status.replace("_", " ")}
              </option>
            ))}
          </Select>

          <Input
            type="number"
            min={1}
            label="Display Order"
            error={errors.displayOrder?.message}
            {...register("displayOrder", {
              valueAsNumber: true,
            })}
          />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Description</h3>

        <div className="space-y-4">
          <Textarea
            label="Short Description"
            rows={3}
            error={errors.shortDescription?.message}
            {...register("shortDescription")}
          />

          <Textarea
            label="Full Description"
            rows={6}
            error={errors.fullDescription?.message}
            {...register("fullDescription")}
          />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Links</h3>

        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="GitHub URL"
            placeholder="https://github.com/..."
            error={errors.githubUrl?.message}
            {...register("githubUrl")}
          />

          <Input
            label="Live URL"
            placeholder="https://..."
            error={errors.liveUrl?.message}
            {...register("liveUrl")}
          />
        </div>

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
            <p className="mt-2 text-sm text-red-500">
              {errors.skillIds.message}
            </p>
          )}
        </div>

        <div>
  <div className="mb-4 flex items-center justify-between">
    <h3 className="text-lg font-semibold">
      Project Images
    </h3>

    <Button
      type="button"
      variant="secondary"
      onClick={() =>
        append({
          imageUrl: "",
          displayOrder: fields.length + 1,
        })
      }
    >
      Add Image
    </Button>
  </div>

  <div className="space-y-4">
    {fields.map((field, index) => (
      <div
        key={field.id}
        className="rounded-lg border p-4"
      >
        <div className="grid gap-4 md:grid-cols-[1fr_120px_auto]">
          <Input
            label="Image URL"
            placeholder="https://..."
            error={errors.images?.[index]?.imageUrl?.message}
            {...register(`images.${index}.imageUrl`)}
          />

          <Input
            type="number"
            min={1}
            label="Order"
            error={errors.images?.[index]?.displayOrder?.message}
            {...register(`images.${index}.displayOrder`, {
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
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Visibility</h3>

        <div className="flex flex-col gap-3">
          <Checkbox label="Featured Project" {...register("featured")} />

          <Checkbox label="Visible on Portfolio" {...register("isVisible")} />
        </div>
      </div>

      <FormActions>
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            reset(project ?? defaultValues);
            onClose();
          }}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={!isDirty || isSubmitting}>
          {isSubmitting
            ? "Saving..."
            : project
              ? "Update Project"
              : "Create Project"}
        </Button>
      </FormActions>
    </form>
  );
}
