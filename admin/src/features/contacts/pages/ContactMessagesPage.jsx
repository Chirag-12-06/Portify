import { useState } from "react";

import LoadingScreen from "../../../components/common/LoadingScreen";
import Card from "../../../components/ui/Card";
import Modal from "../../../components/ui/Modal";
import PageHeader from "../../../components/ui/PageHeader";

import ContactTable from "../components/ContactTable";
import ContactDetailsModal from "../components/ContactDetailsModal";
import DeleteContactDialog from "../components/DeleteContactDialog";

import { useContactMessages } from "../hooks/useContactMessage";

export default function ContactPage() {
  const {
    data: contactMessages = [],
    isLoading,
    isError,
  } = useContactMessages();

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [deletingMessage, setDeletingMessage] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <p>Failed to load contact messages.</p>;
  }

  const handleView = (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setSelectedMessage(null);
    setIsModalOpen(false);
  };

  const handleDelete = (message) => {
    setDeletingMessage(message);
    setIsDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeletingMessage(null);
    setIsDeleteOpen(false);
  };

  return (
    <>
      <PageHeader
        title="Contact Messages"
        description="View and manage messages received from your portfolio."
      />

      <Card>
        <ContactTable
          messages={contactMessages}
          onView={handleView}
          onDelete={handleDelete}
        />
      </Card>

      <Modal
        isOpen={isModalOpen}
        title="Message Details"
        onClose={handleClose}
      >
        <ContactDetailsModal
          message={selectedMessage}
          onClose={handleClose}
        />
      </Modal>

      <DeleteContactDialog
        open={isDeleteOpen}
        message={deletingMessage}
        onClose={handleDeleteClose}
      />
    </>
  );
}