import ConfirmDialog from "../../../components/ui/ConfirmDialog";

import { useDeleteEducation } from "../hooks/useDeleteEducation";

export default function DeleteEducationDialog({ open, education, onClose }) {
  const deleteEducation = useDeleteEducation();

  const handleDelete = async () => {
    if (!education) return;

    try {
      await deleteEducation.mutateAsync(education.id);
      onClose();
    } catch {
      // Error toast handled in mutation hook
    }
  };

  return (
    <ConfirmDialog
      open={open}
      title="Delete Education"
      description={`Are you sure you want to delete "${education?.institution}"?`}
      loading={deleteEducation.isPending}
      onClose={onClose}
      onConfirm={handleDelete}
    />
  );
}
