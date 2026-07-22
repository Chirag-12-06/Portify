import Badge from "../../../components/ui/Badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableActions,
  EmptyState,
} from "../../../components/ui/Table";

function getCategoryLabel(category) {
  return category
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function TechnologyTable({ technologies, onEdit, onDelete }) {
  if (!technologies.length) {
    return (
      <EmptyState
        title="No technologies found"
        description="You can add a new technology by clicking the 'Add Technology' button."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-32">Technology</TableHead>
          <TableHead className="w-48">Category</TableHead>
          <TableHead className="w-24">Image</TableHead>
          <TableHead className="w-28" align="center">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {technologies.map((technology) => (
          <TableRow key={technology.id}>
            <TableCell className="font-medium">{technology.name}</TableCell>

            <TableCell>
              <Badge>{getCategoryLabel(technology.category)}</Badge>
            </TableCell>

            <TableCell>
              {technology.imageUrl ? (
                <img
                  src={technology.imageUrl}
                  alt={technology.name}
                  className="h-8 w-8 rounded object-cover"
                />
              ) : (
                <span className="text-slate-400">—</span>
              )}
            </TableCell>

            <TableCell align="right" className="w-28">
              <TableActions
                onEdit={() => onEdit(technology)}
                onDelete={() => onDelete(technology)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
