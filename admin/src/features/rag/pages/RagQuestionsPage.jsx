import { useState } from "react";

import LoadingScreen from "../../../components/common/LoadingScreen";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import Modal from "../../../components/ui/Modal";
import PageHeader from "../../../components/ui/PageHeader";

import RagQuestionForm from "../components/RagQuestionsForm";
import RagQuestionTable from "../components/RagQuestionsTable";
import DeleteRagQuestionDialog from "../components/DeleteRagQuestionsDialog";

import { useRagQuestions } from "../hooks/useRagQuestions";

export default function RagQuestionPage() {
  const {
    data: questions = [],
    isLoading,
    isError,
  } = useRagQuestions();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingQuestion, setDeletingQuestion] = useState(null);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <p>Failed to load RAG questions.</p>;
  }

  const handleAdd = () => {
    setEditingQuestion(null);
    setIsModalOpen(true);
  };

  const handleEdit = (question) => {
    setEditingQuestion(question);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setEditingQuestion(null);
    setIsModalOpen(false);
  };

  const handleDelete = (question) => {
    setDeletingQuestion(question);
    setIsDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeletingQuestion(null);
    setIsDeleteOpen(false);
  };

  return (
    <>
      <PageHeader
        title="RAG Questions"
        description="Manage your RAG question-and-answer knowledge base."
        actions={
          <Button onClick={handleAdd}>
            Add Question
          </Button>
        }
      />

      <Card>
        <RagQuestionTable
          questions={questions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Card>

      <Modal
        isOpen={isModalOpen}
        title={
          editingQuestion
            ? "Edit RAG Question"
            : "Add RAG Question"
        }
        onClose={handleClose}
      >
        <RagQuestionForm
          question={editingQuestion}
          onClose={handleClose}
        />
      </Modal>

      <DeleteRagQuestionDialog
        open={isDeleteOpen}
        question={deletingQuestion}
        onClose={handleDeleteClose}
      />
    </>
  );
}