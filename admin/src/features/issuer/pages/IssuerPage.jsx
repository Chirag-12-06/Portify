import { useState } from "react";

import LoadingScreen from "../../../components/common/LoadingScreen";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import Modal from "../../../components/ui/Modal";
import PageHeader from "../../../components/ui/PageHeader";

import IssuerForm from "../components/IssuerFrom";
import IssuerTable from "../components/IssuerTable";
import DeleteIssuerDialog from "../components/DeleteIssuerDialog";

import { useIssuers } from "../hooks/useIssuer";

export default function IssuersPage() {
  const {
    data: issuers = [],
    isLoading,
    isError,
  } = useIssuers();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIssuer, setEditingIssuer] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingIssuer, setDeletingIssuer] = useState(null);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <p>Failed to load issuers.</p>;
  }

  const handleAdd = () => {
    setEditingIssuer(null);
    setIsModalOpen(true);
  };

  const handleEdit = (issuer) => {
    setEditingIssuer(issuer);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setEditingIssuer(null);
    setIsModalOpen(false);
  };

  const handleDelete = (issuer) => {
    setDeletingIssuer(issuer);
    setIsDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeletingIssuer(null);
    setIsDeleteOpen(false);
  };

  return (
    <>
      <PageHeader
        title="Issuers"
        description="Manage certificate issuers."
        actions={
          <Button onClick={handleAdd}>
            Add Issuer
          </Button>
        }
      />

      <Card>
        <IssuerTable
          issuers={issuers}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Card>

      <Modal
        isOpen={isModalOpen}
        title={
          editingIssuer
            ? "Edit Issuer"
            : "Add Issuer"
        }
        onClose={handleClose}
      >
        <IssuerForm
          issuer={editingIssuer}
          onClose={handleClose}
        />
      </Modal>

      <DeleteIssuerDialog
        open={isDeleteOpen}
        issuer={deletingIssuer}
        onClose={handleDeleteClose}
      />
    </>
  );
}