import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import FormActions from "../../../components/ui/Form/FormActions";
import Checkbox from "../../../components/ui/Form/Checkbox";

import {
  ragQuestionSchema,
  defaultValues,
} from "../schemas/rag.schema";

import { useCreateRagQuestion } from "../hooks/useCreateRagQuestions";
import { useUpdateRagQuestion } from "../hooks/useUpdateRagQuestions";

export default function RagQuestionForm({ question, onClose }) {
  const createQuestion = useCreateRagQuestion();
  const updateQuestion = useUpdateRagQuestion();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(ragQuestionSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(question ?? defaultValues);
  }, [question, reset]);

  const onSubmit = async (values) => {
    try {
      if (question) {
        await updateQuestion.mutateAsync({
          id: question.id,
          values,
        });
      } else {
        await createQuestion.mutateAsync(values);
      }

      reset(defaultValues);
      onClose();
    } catch {
      // Toast is handled inside mutation hooks.
    }
  };

  const isSubmitting =
    createQuestion.isPending || updateQuestion.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        label="Question"
        placeholder="What projects has Chirag worked on?"
        error={errors.question?.message}
        {...register("question")}
      />

      <div className="space-y-1.5">
        <label
          htmlFor="answer"
          className="block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Answer
        </label>

        <textarea
          id="answer"
          rows={6}
          placeholder="Enter the answer..."
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          {...register("answer")}
        />

        {errors.answer?.message && (
          <p className="text-sm text-red-500">
            {errors.answer.message}
          </p>
        )}
      </div>

      <Input
        label="Category"
        placeholder="Projects, Skills, Experience..."
        error={errors.category?.message}
        {...register("category")}
      />

      <Checkbox
        label="Published"
        {...register("isPublished")}
      />

      <FormActions>
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            reset(question ?? defaultValues);
            onClose();
          }}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={!isDirty || isSubmitting}>
          {isSubmitting
            ? "Saving..."
            : question
            ? "Update Question"
            : "Create Question"}
        </Button>
      </FormActions>
    </form>
  );
}