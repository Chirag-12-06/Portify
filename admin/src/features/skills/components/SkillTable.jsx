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

export default function SkillTable({ skills, onEdit, onDelete }) {
  if (!skills.length) {
    return (
      <EmptyState
        title="No skills found"
        description="You can add a new skill by clicking the 'Add Skill' button."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-32">Skill</TableHead>
          <TableHead className="w-48">Category</TableHead>
          <TableHead className="w-28" align="center">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {skills.map((skill) => (
          <TableRow key={skill.id}>
            <TableCell className="font-medium">{skill.name}</TableCell>

            <TableCell>
              <Badge>{getCategoryLabel(skill.category)}</Badge>
            </TableCell>

            <TableCell align="right" className="w-28">
              <TableActions
                onEdit={() => onEdit(skill)}
                onDelete={() => onDelete(skill)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
