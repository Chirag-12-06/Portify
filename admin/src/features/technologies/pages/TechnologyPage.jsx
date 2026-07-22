import { useState } from "react";

import LoadingScreen from "../../../components/common/LoadingScreen";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import Modal from "../../../components/ui/Modal";
import PageHeader from "../../../components/ui/PageHeader";

import DeleteTechnologyDialog from "../components/DeleteTechnologyDialog";
import TechnologyForm from "../components/TechnologyForm";
import TechnologyTable from "../components/TechnologyTable";

import { useTechnologies } from "../hooks/useTechnology";

export default function TechnologiesPage() {
  const { data: technologies = [], isLoading, isError } = useTechnologies();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTechnology, setEditingTechnology] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingTechnology, setDeletingTechnology] = useState(null);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <p>Failed to load technologies.</p>;
  }

  const handleAdd = () => {
    setEditingTechnology(null);
    setIsModalOpen(true);
  };

  const handleEdit = (technology) => {
    setEditingTechnology(technology);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setEditingTechnology(null);
    setIsModalOpen(false);
  };

  const handleDeleteClose = () => {
    setDeletingTechnology(null);
    setIsDeleteOpen(false);
  };

  const handleDelete = (technology) => {
    setDeletingTechnology(technology);
    setIsDeleteOpen(true);
  };

  return (
    <>
      <PageHeader
        title="Technologies"
        description="Manage your technical technologies."
        actions={<Button onClick={handleAdd}>Add Technology</Button>}
      />

      <Card>
        <TechnologyTable
          technologies={technologies}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Card>

      <Modal
        isOpen={isModalOpen}
        title={editingTechnology ? "Edit Technology" : "Add Technology"}
        onClose={handleClose}
      >
        <TechnologyForm technology={editingTechnology} onClose={handleClose} />
      </Modal>

      <DeleteTechnologyDialog
        open={isDeleteOpen}
        technology={deletingTechnology}
        onClose={handleDeleteClose}
      />
    </>
  );
}
