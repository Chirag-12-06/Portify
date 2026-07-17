import { useState } from "react";

import LoadingScreen from "../../../components/common/LoadingScreen";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import Modal from "../../../components/ui/Modal";
import PageHeader from "../../../components/ui/PageHeader";

import DeleteProjectDialog from "../components/DeleteProjectDialog";
import ProjectForm from "../components/ProjectForm";
import ProjectTable from "../components/ProjectTable";

import { useProjects } from "../hooks/useProject";

export default function ProjectsPage() {
  const { data: projects = [], isLoading, isError } = useProjects();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingProject, setDeletingProject] = useState(null);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <p>Failed to load projects.</p>;
  }

  const handleAdd = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setEditingProject(null);
    setIsModalOpen(false);
  };

  const handleDelete = (project) => {
    setDeletingProject(project);
    setIsDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeletingProject(null);
    setIsDeleteOpen(false);
  };

  return (
    <>
      <PageHeader
        title="Projects"
        description="Manage your portfolio projects."
        actions={<Button onClick={handleAdd}>Add Project</Button>}
      />

      <Card>
        <ProjectTable
          projects={projects}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Card>

      <Modal
        isOpen={isModalOpen}
        title={editingProject ? "Edit Project" : "Add Project"}
        onClose={handleClose}
      >
        <ProjectForm
          project={editingProject}
          onClose={handleClose}
        />
      </Modal>

      <DeleteProjectDialog
        open={isDeleteOpen}
        project={deletingProject}
        onClose={handleDeleteClose}
      />
    </>
  );
}