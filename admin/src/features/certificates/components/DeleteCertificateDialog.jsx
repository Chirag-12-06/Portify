import ConfirmDialog from "../../../components/ui/ConfirmDialog";

import { useDeleteCertificate } from "../hooks/useDeleteCertificate";

export default function DeleteCertificateDialog({
  open,
  certificate,
  onClose,
}) {
  const deleteCertificate = useDeleteCertificate();

  const handleDelete = async () => {
    if (!certificate) return;

    try {
      await deleteCertificate.mutateAsync(certificate.id);
      onClose();
    } catch {
      // Error toast handled in mutation hook.
    }
  };

  return (
    <ConfirmDialog
      open={open}
      title="Delete Certificate"
      description={`Are you sure you want to delete "${certificate?.title}"?`}
      loading={deleteCertificate.isPending}
      onClose={onClose}
      onConfirm={handleDelete}
    />
  );
}