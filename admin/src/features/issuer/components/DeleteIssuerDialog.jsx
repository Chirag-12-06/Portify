import ConfirmDialog from "../../../components/ui/ConfirmDialog";

import { useDeleteIssuer } from "../hooks/useDeleteIssuer";

export default function DeleteIssuerDialog({
  open,
  issuer,
  onClose,
}) {
  const deleteIssuer = useDeleteIssuer();

  const handleDelete = async () => {
    if (!issuer) return;

    try {
      await deleteIssuer.mutateAsync(issuer.id);
      onClose();
    } catch {
      // Error toast handled in mutation hook.
    }
  };

  return (
    <ConfirmDialog
      open={open}
      title="Delete Issuer"
      description={`Are you sure you want to delete "${issuer?.name}"?`}
      loading={deleteIssuer.isPending}
      onClose={onClose}
      onConfirm={handleDelete}
    />
  );
}