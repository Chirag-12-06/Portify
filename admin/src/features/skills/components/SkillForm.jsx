import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import Button from "../../../components/ui/Button";
import FormActions from "../../../components/ui/Form/FormActions";

import { SKILL_CATEGORIES } from "../constants/skillCategories";

import { skillSchema, defaultValues } from "../schemas/skill.schema";
import { useCreateSkill } from "../hooks/useCreateSkill";
import { useUpdateSkill } from "../hooks/useUpdateSkill";

const categories = SKILL_CATEGORIES;

export default function SkillForm({ skill, onClose }) {
  const createSkill = useCreateSkill();
  const updateSkill = useUpdateSkill();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(skillSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(skill ?? defaultValues);
  }, [skill, reset]);

  const onSubmit = async (values) => {
    try {
      if (skill) {
        await updateSkill.mutateAsync({
          id: skill.id,
          values,
        });
      } else {
        await createSkill.mutateAsync(values);
      }

      reset(defaultValues);
      onClose();
    } catch {
      // Toast is handled inside mutation hooks.
    }
  };

  const isSubmitting = createSkill.isPending || updateSkill.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        label="Skill Name"
        placeholder="Frontend Development"
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
