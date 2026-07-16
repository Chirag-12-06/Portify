import { useState } from "react";

import LoadingScreen from "../../../components/common/LoadingScreen";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import Modal from "../../../components/ui/Modal";
import PageHeader from "../../../components/ui/PageHeader";

import SocialLinkTable from "../components/SocialLinkTable";
import SocialLinkForm from "../components/SocialLinkForm";
import DeleteSocialLinkDialog from "../components/DeleteSocialLinkDialog";

import { useSocialLink } from "../hooks/useSocialLink";

export default function SocialLinksPage() {
  const { data, isLoading, isError } = useSocialLink();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSocialLink, setEditingSocialLink] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingSocialLink, setDeletingSocialLink] = useState(null);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <p>Failed to load social links.</p>;
  }

  const handleAdd = () => {
    setEditingSocialLink(null);
    setIsModalOpen(true);
  };

  const handleEdit = (socialLink) => {
    setEditingSocialLink(socialLink);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setEditingSocialLink(null);
    setIsModalOpen(false);
  };

  const handleDelete = (socialLink) => {
    setDeletingSocialLink(socialLink);
    setIsDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeletingSocialLink(null);
    setIsDeleteOpen(false);
  };

  return (
    <>
      <PageHeader
        title="Social Links"
        description="Manage your social links."
        actions={
          <Button onClick={handleAdd}>
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
        title={
          editingSocialLink
            ? "Edit Social Link"
            : "Add Social Link"
        }
        onClose={handleClose}
      >
        <SocialLinkForm
          socialLink={editingSocialLink}
          onClose={handleClose}
        />
      </Modal>

      <DeleteSocialLinkDialog
        open={isDeleteOpen}
        link={deletingSocialLink}
        onClose={handleDeleteClose}
      />
    </>
  );
}