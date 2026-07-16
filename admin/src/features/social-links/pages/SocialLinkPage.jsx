import LoadingScreen from "../../../components/common/LoadingScreen";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import PageHeader from "../../../components/ui/PageHeader";
import Modal from "../../../components/ui/Modal";

import SocialLinkTable from "../components/SocialLinkTable";
import SocialLinkForm from "../components/SocialLinkForm";

import { useSocialLink } from "../hooks/useSocialLink";
import { useCreateSocialLink } from "../hooks/useCreateSocialLink";
import { useUpdateSocialLink } from "../hooks/useUpdateSocialLink";
import { useDeleteSocialLink } from "../hooks/useDeleteSocialLink";
import { useState } from "react";

export default function SocialLinksPage() {
  const { data, isLoading, isError, error } = useSocialLink();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSocialLink, setEditingSocialLink] = useState(null);

  const createSocialLink = useCreateSocialLink();
  const updateSocialLink = useUpdateSocialLink();
  const deleteSocialLink = useDeleteSocialLink();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <p>Failed to load social links.</p>;
  }

  const handleSubmit = async (values) => {
    if (editingSocialLink) {
      await updateSocialLink.mutateAsync({
        id: editingSocialLink.id,
        values,
      });
    } else {
      await createSocialLink.mutateAsync(values);
    }

    setEditingSocialLink(null);
    setIsModalOpen(false);
  };

  const handleEdit = (socialLink) => {
    setEditingSocialLink(socialLink);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this social link?",
    );

    if (!confirmed) return;

    try {
      await deleteSocialLink.mutateAsync(id);
    } catch {
      // Error toast is already handled in the mutation hook.
    }
  };

  return (
    <>
      <PageHeader
        title="Social Links"
        description="Manage your social links."
        actions={
          <Button
            onClick={() => {
              setEditingSocialLink(null);
              setIsModalOpen(true);
            }}
          >
            Add Social Link
          </Button>
        }
      />

      <Card>
        <SocialLinkTable
          socialLinks={data.data}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Card>

      <Modal
        isOpen={isModalOpen}
        title={editingSocialLink ? "Edit Social Link" : "Add Social Link"}
        onClose={() => setIsModalOpen(false)}
      >
        <SocialLinkForm
          socialLink={editingSocialLink}
          onSubmit={handleSubmit}
          onCancel={() => {
            setEditingSocialLink(null);
            setIsModalOpen(false);
          }}
          isSubmitting={
            createSocialLink.isPending || updateSocialLink.isPending
          }
        />
      </Modal>
    </>
  );
}
