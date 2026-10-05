import { useState } from "react";

import LoadingScreen from "../../../components/common/LoadingScreen";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import Modal from "../../../components/ui/Modal";
import PageHeader from "../../../components/ui/PageHeader";

import RagQuestionForm from "../components/RagQuestionForm";
import RagQuestionTable from "../components/RagQuestionTable";
import DeleteRagQuestionDialog from "../components/DeleteRagQuestionDialog";

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

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const QUESTIONS_PER_PAGE = 8;

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <p>Failed to load RAG questions.</p>;
  }

  const totalPages = Math.ceil(
    questions.length / QUESTIONS_PER_PAGE
  );

  const startIndex = (currentPage - 1) * QUESTIONS_PER_PAGE;

  const currentQuestions = questions.slice(
    startIndex,
    startIndex + QUESTIONS_PER_PAGE
  );

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

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) =>
      Math.min(prev + 1, totalPages)
    );
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
          questions={currentQuestions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-200 px-4 py-4 dark:border-slate-700">
            <Button
              variant="secondary"
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              Previous
            </Button>

            <span className="text-sm text-slate-500">
              Page {currentPage} of {totalPages}
            </span>

            <Button
              variant="secondary"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
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