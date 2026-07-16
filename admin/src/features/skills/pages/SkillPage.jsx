import { useState } from "react";

import LoadingScreen from "../../../components/common/LoadingScreen";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import Modal from "../../../components/ui/Modal";
import PageHeader from "../../../components/ui/PageHeader";

import DeleteSkillDialog from "../components/DeleteSkillDialog";
import SkillForm from "../components/SkillForm";
import SkillTable from "../components/SkillTable";

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
