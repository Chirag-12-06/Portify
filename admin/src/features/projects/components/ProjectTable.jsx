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

function getStatusVariant(status) {
  switch (status) {
    case "COMPLETED":
      return "success";

    case "ONGOING":
      return "warning";

    default:
      return "secondary";
  }
}

function getStatusLabel(status) {
  return status
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function ProjectTable({ projects, onEdit, onDelete }) {
  if (!projects.length) {
    return (
      <EmptyState
        title="No projects found"
        description="You can add a new project by clicking the 'Add Project' button."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-36">Project</TableHead>

          <TableHead className="w-24">Status</TableHead>

          <TableHead className="w-28" align="center">
            Featured
          </TableHead>

          <TableHead className="w-28" align="center">
            Visible
          </TableHead>

          <TableHead className="w-24" align="center">
            Skills
          </TableHead>

          <TableHead className="w-24" align="center">
            Images
          </TableHead>

          <TableHead className="w-24" align="center">
            Order
          </TableHead>

          <TableHead className="w-28" align="center">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id}>
            <TableCell>
              <div>
                <p className="font-medium">{project.title}</p>

                <p className="text-sm text-slate-500">{project.slug}</p>
              </div>
            </TableCell>

            <TableCell>
              <Badge variant={getStatusVariant(project.status)}>
                {getStatusLabel(project.status)}
              </Badge>
            </TableCell>

            <TableCell align="center">{project.featured ? "✓" : "—"}</TableCell>

            <TableCell align="center">
              {project.isVisible ? "✓" : "—"}
            </TableCell>

            <TableCell align="center">{project.skills.length}</TableCell>

            <TableCell align="center">{project.images.length}</TableCell>

            <TableCell align="center">{project.displayOrder}</TableCell>

            <TableCell align="right">
              <TableActions
                onEdit={() => onEdit(project)}
                onDelete={() => onDelete(project)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
