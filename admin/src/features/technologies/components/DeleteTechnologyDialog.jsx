import ConfirmDialog from "../../../components/ui/ConfirmDialog";

import { useDeleteTechnology } from "../hooks/useDeleteTechnology";

export default function DeleteTechnologyDialog({ open, technology, onClose }) {
  const deleteTechnology = useDeleteTechnology();

  const handleDelete = async () => {
    if (!technology) return;

    try {
      await deleteTechnology.mutateAsync(technology.id);
      onClose();
    } catch {
      // Error toast handled in mutation hook
    }
  };

  return (
    <ConfirmDialog
      open={open}
      title="Delete Technology"
      description={`Are you sure you want to delete "${technology?.name}"?`}
      loading={deleteTechnology.isPending}
      onClose={onClose}
      onConfirm={handleDelete}
    />
  );
}
