import Button from "../../../components/ui/Button";
import FormActions from "../../../components/ui/Form/FormActions";

import { useUpdateReadStatus } from "../hooks/useUpdateReadStatus";
import { useUpdateRepliedStatus } from "../hooks/useUpdateRepliedStatus";

import { formatDateRange } from "../../../utils/formatDateRange";

export default function ContactDetailsModal({
  message,
  onClose,
}) {
  const updateReadStatus = useUpdateReadStatus();
  const updateRepliedStatus =
    useUpdateRepliedStatus();

  if (!message) return null;

  const isSubmitting =
    updateReadStatus.isPending ||
    updateRepliedStatus.isPending;

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-medium text-slate-500">
          Name
        </p>

        <p>{message.name}</p>
      </div>

      <div>
        <p className="text-sm font-medium text-slate-500">
          Email
        </p>

        <p>{message.email}</p>
      </div>

      <div>
        <p className="text-sm font-medium text-slate-500">
          Subject
        </p>

        <p>{message.subject}</p>
      </div>

      <div>
        <p className="text-sm font-medium text-slate-500">
          Message
        </p>

        <div className="rounded-md border p-3 whitespace-pre-wrap">
          {message.message}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">
            Received
          </p>

          <p>{formatDateRange(message.createdAt)}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-slate-500">
            Status
          </p>

          <p>
            {message.isRead
              ? "Read"
              : "Unread"}
            {" • "}
            {message.replied
              ? "Replied"
              : "Pending Reply"}
          </p>
        </div>
      </div>

      <FormActions>
        {!message.isRead && (
          <Button
            type="button"
            variant="secondary"
            disabled={isSubmitting}
            onClick={() =>
              updateReadStatus.mutate({
                id: message.id,
                isRead: true,
              })
            }
          >
            Mark Read
          </Button>
        )}

        {!message.replied && (
          <Button
            type="button"
            variant="secondary"
            disabled={isSubmitting}
            onClick={() =>
              updateRepliedStatus.mutate({
                id: message.id,
                replied: true,
              })
            }
          >
            Mark Replied
          </Button>
        )}

        <Button
          type="button"
          onClick={onClose}
        >
          Close
        </Button>
      </FormActions>
    </div>
  );
}