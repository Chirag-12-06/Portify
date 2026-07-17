import { useState } from "react";

import LoadingScreen from "../../../components/common/LoadingScreen";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import Modal from "../../../components/ui/Modal";
import PageHeader from "../../../components/ui/PageHeader";

import DeleteExperienceDialog from "../components/DeleteExperienceDialog";
import ExperienceForm from "../components/ExperienceForm";
import ExperienceTable from "../components/ExperienceTable";

import { useExperience } from "../hooks/useExperience";

export default function ExperiencePage() {
  const {
    data: experiences = [],
    isLoading,
    isError,
  } = useExperience();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingExperience, setDeletingExperience] = useState(null);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <p>Failed to load experiences.</p>;
  }

  const handleAdd = () => {
    setEditingExperience(null);
    setIsModalOpen(true);
  };

  const handleEdit = (experience) => {
    setEditingExperience(experience);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setEditingExperience(null);
    setIsModalOpen(false);
  };

  const handleDelete = (experience) => {
    setDeletingExperience(experience);
    setIsDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeletingExperience(null);
    setIsDeleteOpen(false);
  };

  return (
    <>
      <PageHeader
        title="Experience"
        description="Manage your work experience."
        actions={
          <Button onClick={handleAdd}>
            Add Experience
          </Button>
        }
      />

      <Card>
        <ExperienceTable
          experiences={experiences}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Card>

      <Modal
        isOpen={isModalOpen}
        title={
          editingExperience
            ? "Edit Experience"
            : "Add Experience"
        }
        onClose={handleClose}
      >
        <ExperienceForm
          experience={editingExperience}
          onClose={handleClose}
        />
      </Modal>

      <DeleteExperienceDialog
        open={isDeleteOpen}
        experience={deletingExperience}
        onClose={handleDeleteClose}
      />
    </>
  );
}