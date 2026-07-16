import { useState } from "react";

import LoadingScreen from "../../../components/common/LoadingScreen";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import Modal from "../../../components/ui/Modal";
import PageHeader from "../../../components/ui/PageHeader";

import SkillForm from "../components/SkillForm";
import SkillTable from "../components/SkillTable";

import { useSkills } from "../hooks/useSkill";

export default function SkillsPage() {
  const { data: skills = [], isLoading, isError } = useSkills();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);

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

  return (
    <>
      <PageHeader
        title="Skills"
        description="Manage your technical skills."
        actions={
          <Button onClick={handleAdd}>
            Add Skill
          </Button>
        }
      />

      <Card>
        <SkillTable
          skills={skills}
          onEdit={handleEdit}
        />
      </Card>

      <Modal
        isOpen={isModalOpen}
        title={editingSkill ? "Edit Skill" : "Add Skill"}
        onClose={handleClose}
      >
        <SkillForm
          skill={editingSkill}
          onClose={handleClose}
        />
      </Modal>
    </>
  );
}