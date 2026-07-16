import ConfirmDialog from "../../../components/ui/ConfirmDialog";

import { useDeleteSocialLink } from "../hooks/useDeleteSocialLink";

export default function DeleteSocialLinkDialog({ open, link, onClose }) {
  const deleteSocialLink = useDeleteSocialLink();

  const handleDelete = async () => {
    if (!link) return;

    try {
      await deleteSocialLink.mutateAsync(link.id);
      onClose();
    } catch {
      // Error toast handled in mutation hook
    }
  };

  return (
    <ConfirmDialog
      open={open}
      title="Delete Social Link"
      description={`Are you sure you want to delete "${link?.platform}"?`}
      loading={deleteSocialLink.isPending}
      onClose={onClose}
      onConfirm={handleDelete}
    />
  );
}
