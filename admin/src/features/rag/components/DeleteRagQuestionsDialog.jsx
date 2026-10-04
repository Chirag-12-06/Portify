import ConfirmDialog from "../../../components/ui/ConfirmDialog";

import { useDeleteRagQuestion } from "../hooks/useDeleteRagQuestions";

export default function DeleteRagQuestionDialog({ open, question, onClose }) {
  const deleteRagQuestion = useDeleteRagQuestion();

  const handleDelete = async () => {
    if (!question) return;

    try {
      await deleteRagQuestion.mutateAsync(question.id);
      onClose();
    } catch {
      // Error toast handled in mutation hook
    }
  };

  return (
    <ConfirmDialog
      open={open}
      title="Delete RAG Question"
      description={`Are you sure you want to delete "${question?.question}"?`}
      loading={deleteRagQuestion.isPending}
      onClose={onClose}
      onConfirm={handleDelete}
    />
  );
}