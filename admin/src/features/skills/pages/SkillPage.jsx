import { useState } from "react";

import {
  LoadingScreen,
  Button,
  Card,
  PageHeader,
  Modal,
} from "../../../components/ui";

import { DeleteSkillDialog, SkillForm, SkillTable } from "../components";

import { useSkills } from "../hooks/useSkill";

export default function SkillsPage() {
  const { data: skills = [], isLoading, isError } = useSkills();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingSkill, setDeletingSkill] = useState(null);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <p>Failed to load skills.</p>;
  }

  const handleAdd = () => {
    setEditingSkill(null);
    setIsModalOpen(true);
  };

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setEditingSkill(null);
    setIsModalOpen(false);
  };

  const handleDeleteClose = () => {
    setDeletingSkill(null);
    setIsDeleteOpen(false);
  };

  const handleDelete = (skill) => {
    setDeletingSkill(skill);
    setIsDeleteOpen(true);
  };

  return (
    <>
      <PageHeader
        title="Skills"
        description="Manage your technical skills."
        actions={<Button onClick={handleAdd}>Add Skill</Button>}
      />

      <Card>
        <SkillTable
          skills={skills}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Card>

      <Modal
        role="dialog"
        isOpen={isModalOpen}
        title={editingSkill ? "Edit Skill" : "Add Skill"}
        onClose={handleClose}
      >
        <SkillForm skill={editingSkill} onClose={handleClose} />
      </Modal>

      <DeleteSkillDialog
        open={isDeleteOpen}
        skill={deletingSkill}
        onClose={handleDeleteClose}
      />
    </>
  );
}
