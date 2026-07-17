import { useState } from "react";

import LoadingScreen from "../../../components/common/LoadingScreen";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import Modal from "../../../components/ui/Modal";
import PageHeader from "../../../components/ui/PageHeader";

import CertificateForm from "../components/CertificateForm";
import CertificateTable from "../components/CertificateTable";
import DeleteCertificateDialog from "../components/DeleteCertificateDialog";

import { useCertificates } from "../hooks/useCertificate";

export default function CertificatesPage() {
  const {
    data: certificates = [],
    isLoading,
    isError,
  } = useCertificates();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingCertificate, setDeletingCertificate] = useState(null);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <p>Failed to load certificates.</p>;
  }

  const handleAdd = () => {
    setEditingCertificate(null);
    setIsModalOpen(true);
  };

  const handleEdit = (certificate) => {
    setEditingCertificate(certificate);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setEditingCertificate(null);
    setIsModalOpen(false);
  };

  const handleDelete = (certificate) => {
    setDeletingCertificate(certificate);
    setIsDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeletingCertificate(null);
    setIsDeleteOpen(false);
  };

  return (
    <>
      <PageHeader
        title="Certificates"
        description="Manage your professional certificates."
        actions={
          <Button onClick={handleAdd}>
            Add Certificate
          </Button>
        }
      />

      <Card>
        <CertificateTable
          certificates={certificates}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Card>

      <Modal
        isOpen={isModalOpen}
        title={
          editingCertificate
            ? "Edit Certificate"
            : "Add Certificate"
        }
        onClose={handleClose}
      >
        <CertificateForm
          certificate={editingCertificate}
          onClose={handleClose}
        />
      </Modal>

      <DeleteCertificateDialog
        open={isDeleteOpen}
        certificate={deletingCertificate}
        onClose={handleDeleteClose}
      />
    </>
  );
}