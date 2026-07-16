import Button from "../../../components/ui/Button";

export default function SocialLinkTable({ socialLinks, onEdit, onDelete }) {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="p-3 text-left">Platform</th>

          <th className="p-3 text-left">URL</th>

          <th className="p-3 text-left">Order</th>

          <th className="p-3 text-right">Actions</th>
        </tr>
      </thead>

      <tbody>
        {socialLinks.map((link) => (
          <tr key={link.id} className="border-b">
            <td className="p-3">{link.platform}</td>

            <td className="p-3">{link.url}</td>

            <td className="p-3">{link.displayOrder}</td>

            <td className="p-3 text-right space-x-3">
              <Button variant="ghost" onClick={() => onEdit(link)}>
                Edit
              </Button>

              <Button
                variant="ghost"
                className="text-red-600"
                onClick={() => onDelete(link.id)}
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
