import ConfirmDialog from "../../../components/ui/ConfirmDialog";

import { useDeleteExperience } from "../hooks/useDeleteExperience";

export default function DeleteExperienceDialog({
  open,
  experience,
  onClose,
}) {
  const deleteExperience = useDeleteExperience();

  const handleDelete = async () => {
    if (!experience) return;

    try {
      await deleteExperience.mutateAsync(experience.id);
      onClose();
    } catch {
      // Error toast handled in mutation hook.
    }
  };

  return (
    <ConfirmDialog
      open={open}
      title="Delete Experience"
      description={`Are you sure you want to delete your experience at "${experience?.company}"?`}
      loading={deleteExperience.isPending}
      onClose={onClose}
      onConfirm={handleDelete}
    />
  );
}