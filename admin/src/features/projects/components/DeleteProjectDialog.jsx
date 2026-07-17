import ConfirmDialog from "../../../components/ui/ConfirmDialog";

import { useDeleteProject } from "../hooks/useDeleteProject";

export default function DeleteProjectDialog({ open, project, onClose }) {
  const deleteProject = useDeleteProject();

  const handleDelete = async () => {
    if (!project) return;

    try {
      await deleteProject.mutateAsync(project.id);
      onClose();
    } catch {
      // Error toast handled in mutation hook.
    }
  };

  return (
    <ConfirmDialog
      open={open}
      title="Delete Project"
      description={`Are you sure you want to delete "${project?.title}"?`}
      loading={deleteProject.isPending}
      onClose={onClose}
      onConfirm={handleDelete}
    />
  );
}