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

export default function ExperienceTable({ experiences, onEdit, onDelete }) {
  if (!experiences.length) {
    return (
      <EmptyState
        title="No experiences found"
        description="You can add a new experience by clicking the 'Add Experience' button."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Company</TableHead>

          <TableHead>Role</TableHead>

          <TableHead>Duration</TableHead>

          <TableHead align="center">Skills</TableHead>

          <TableHead align="center">Points</TableHead>

          <TableHead align="center">Current</TableHead>

          <TableHead align="center">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {experiences.map((experience) => (
          <TableRow key={experience.id}>
            <TableCell>
              <div>
                <p className="font-medium">{experience.company}</p>

                {experience.location && (
                  <p className="text-sm text-slate-500">
                    {experience.location}
                  </p>
                )}
              </div>
            </TableCell>

            <TableCell>{experience.role}</TableCell>

            <TableCell>
              {new Date(experience.startDate).toLocaleDateString()} -{" "}
              {experience.currentlyWorking
                ? "Present"
                : experience.endDate
                  ? new Date(experience.endDate).toLocaleDateString()
                  : "—"}
            </TableCell>

            <TableCell align="center">{experience.skills.length}</TableCell>

            <TableCell align="center">{experience.points.length}</TableCell>

            <TableCell align="center">
              {experience.currentlyWorking ? "✓" : "—"}
            </TableCell>

            <TableCell align="right">
              <TableActions
                onEdit={() => onEdit(experience)}
                onDelete={() => onDelete(experience)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
