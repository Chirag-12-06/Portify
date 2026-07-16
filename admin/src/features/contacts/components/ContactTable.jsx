import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  EmptyState,
} from "../../../components/ui/Table";

import Button from "../../../components/ui/Button";

import { formatDateRange } from "../../../utils/formatDateRange";

export default function ContactTable({
  messages,
  onView,
  onDelete,
}) {
  if (!messages.length) {
    return (
      <EmptyState
        title="No messages found"
        description="Messages submitted through your portfolio contact form will appear here."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-52">
            Name
          </TableHead>

          <TableHead className="w-64">
            Email
          </TableHead>

          <TableHead>
            Subject
          </TableHead>

          <TableHead className="w-28">
            Read
          </TableHead>

          <TableHead className="w-28">
            Replied
          </TableHead>

          <TableHead className="w-40">
            Received
          </TableHead>

          <TableHead
            align="center"
            className="w-40"
          >
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {messages.map((message) => (
          <TableRow key={message.id}>
            <TableCell className="font-medium">
              {message.name}
            </TableCell>

            <TableCell>
              {message.email}
            </TableCell>

            <TableCell>
              {message.subject}
            </TableCell>

            <TableCell>
              {message.isRead ? "Yes" : "No"}
            </TableCell>

            <TableCell>
              {message.replied ? "Yes" : "No"}
            </TableCell>

            <TableCell>
              {formatDateRange(message.createdAt)}
            </TableCell>

            <TableCell
              align="right"
              className="space-x-2"
            >
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onView(message)}
              >
                View
              </Button>

              <Button
                size="sm"
                variant="danger"
                onClick={() => onDelete(message)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}