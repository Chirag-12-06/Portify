import ConfirmDialog from "../../../components/ui/ConfirmDialog";

import { useDeleteContactMessage } from "../hooks/useDeleteContactMessage";

export default function DeleteContactDialog({ open, message, onClose }) {
  const deleteContactMessage = useDeleteContactMessage();

  const handleDelete = async () => {
    if (!message) return;

    try {
      await deleteContactMessage.mutateAsync(message.id);
      onClose();
    } catch {
      // Error toast handled in mutation hook
    }
  };

  return (
    <ConfirmDialog
      open={open}
      title="Delete Message"
      description={
        message
          ? `Are you sure you want to delete "${message.subject}" from ${message.name}?`
          : ""
      }
      loading={deleteContactMessage.isPending}
      onClose={onClose}
      onConfirm={handleDelete}
    />
  );
}
