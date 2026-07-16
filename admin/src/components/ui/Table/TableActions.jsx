import { Pencil, Trash2 } from "lucide-react";

import Button from "../Button";

export default function TableActions({
  onEdit,
  onDelete,
}) {
  return (
    <div className="flex justify-end gap-1">
      <Button
        variant="ghost"
        onClick={onEdit}
      >
        <Pencil size={16} />
      </Button>

      <Button
        variant="ghost"
        className="text-red-600 hover:text-red-700"
        onClick={onDelete}
      >
        <Trash2 size={16} />
      </Button>
    </div>
  );
}