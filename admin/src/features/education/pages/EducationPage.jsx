import { useState } from "react";

import LoadingScreen from "../../../components/common/LoadingScreen";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import Modal from "../../../components/ui/Modal";
import PageHeader from "../../../components/ui/PageHeader";

import EducationForm from "../components/EducationForm";
import EducationTable from "../components/EducationTable";
import DeleteEducationDialog from "../components/DeleteEducationDialog";

import { useEducation } from "../hooks/useEducation";

export default function EducationPage() {
  const {
    data: educations = [],
    isLoading,
    isError,
  } = useEducation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingEducation, setDeletingEducation] = useState(null);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <p>Failed to load education.</p>;
  }

  const handleAdd = () => {
    setEditingEducation(null);
    setIsModalOpen(true);
  };

  const handleEdit = (education) => {
    setEditingEducation(education);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setEditingEducation(null);
    setIsModalOpen(false);
  };

  const handleDelete = (education) => {
    setDeletingEducation(education);
    setIsDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeletingEducation(null);
    setIsDeleteOpen(false);
  };

  return (
    <>
      <PageHeader
        title="Education"
        description="Manage your education history."
        actions={
          <Button onClick={handleAdd}>
            Add Education
          </Button>
        }
      />

      <Card>
        <EducationTable
          educations={educations}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Card>

      <Modal
        isOpen={isModalOpen}
        title={
          editingEducation
            ? "Edit Education"
            : "Add Education"
        }
        onClose={handleClose}
      >
        <EducationForm
          education={editingEducation}
          onClose={handleClose}
        />
      </Modal>

      <DeleteEducationDialog
        open={isDeleteOpen}
        education={deletingEducation}
        onClose={handleDeleteClose}
      />
    </>
  );
}