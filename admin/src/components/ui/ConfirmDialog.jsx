import Button from "./Button";
import FormActions from "./Form/FormActions";
import Modal from "./Modal";

export default function ConfirmDialog({
  open,
  title,
  description,
  loading = false,
  onClose,
  onConfirm,
}) {
  return (
    <Modal isOpen={open} onClose={onClose} title={title}>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        {description}
      </p>

      <FormActions>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>

        <Button variant="danger" loading={loading} onClick={onConfirm}>
          Delete
        </Button>
      </FormActions>
    </Modal>
  );
}
