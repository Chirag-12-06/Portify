import ConfirmDialog from "../../../components/ui/ConfirmDialog";

import { useDeleteSkill } from "../hooks/useDeleteSkill";

export default function DeleteSkillDialog({ open, skill, onClose }) {
  const deleteSkill = useDeleteSkill();

  const handleDelete = async () => {
    if (!skill) return;

    try {
      await deleteSkill.mutateAsync(skill.id);
      onClose();
    } catch {
      // Error toast handled in mutation hook
    }
  };

  return (
    <ConfirmDialog
      open={open}
      title="Delete Skill"
      description={`Are you sure you want to delete "${skill?.name}"?`}
      loading={deleteSkill.isPending}
      onClose={onClose}
      onConfirm={handleDelete}
    />
  );
}
