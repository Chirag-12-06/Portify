import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import Textarea from "../../../components/ui/Textarea";

import { aboutSchema, defaultValues } from "../schemas/about.schema";

export default function AboutForm({ about, onSubmit, isSubmitting }) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(aboutSchema),
    defaultValues,
  });

  const {
  fields,
  append,
  remove,
} = useFieldArray({
  control,
  name: "highlights",
});

  useEffect(() => {
    if (about) {
      reset(about);
    }
  }, [about, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Heading"
        error={errors.heading?.message}
        {...register("heading")}
      />

      <Textarea
        label="Content"
        rows={6}
        error={errors.content?.message}
        {...register("content")}
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Highlights</h3>

          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              append({
                stat: "",
                label: "",
                order: fields.length,
              })
            }
          >
            Add Highlight
          </Button>
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className="space-y-3 rounded-lg border p-4">
            <Input
              label="Stat"
              error={errors.highlights?.[index]?.stat?.message}
              {...register(`highlights.${index}.stat`)}
            />

            <Input
              label="Label"
              error={errors.highlights?.[index]?.label?.message}
              {...register(`highlights.${index}.label`)}
            />

            <Button
              type="button"
              variant="danger"
              onClick={() => remove(index)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="secondary" onClick={() => reset(about)}>
          Reset
        </Button>

        <Button type="submit" disabled={!isDirty || isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
