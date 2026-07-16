import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";

function getCategoryLabel(category) {
  return category
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function SkillTable({
  skills,
  onEdit,
  onDelete,
}) {
  if (!skills.length) {
    return (
      <div className="py-12 text-center text-slate-500">
        No skills found.
      </div>
    );
  }

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="p-3 text-left">Skill</th>

          <th className="p-3 text-left">Category</th>

          <th className="p-3 text-left">Image</th>

          <th className="p-3 text-right">Actions</th>
        </tr>
      </thead>

      <tbody>
        {skills.map((skill) => (
          <tr
            key={skill.id}
            className="border-b last:border-b-0"
          >
            <td className="p-3 font-medium">
              {skill.name}
            </td>

            <td className="p-3">
              <Badge>
                {getCategoryLabel(skill.category)}
              </Badge>
            </td>

            <td className="p-3">
              {skill.imageUrl ? (
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  className="h-8 w-8 rounded object-cover"
                />
              ) : (
                <span className="text-slate-400">
                  —
                </span>
              )}
            </td>

            <td className="space-x-2 p-3 text-right">
              <Button
                variant="ghost"
                onClick={() => onEdit(skill)}
              >
                Edit
              </Button>

              <Button
                variant="ghost"
                className="text-red-600"
                onClick={() => onDelete(skill)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}