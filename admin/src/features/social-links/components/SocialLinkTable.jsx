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

export default function SocialLinkTable({ socialLinks, onEdit, onDelete }) {
  if (!socialLinks.length) {
    return (
      <EmptyState
        title="No social links found"
        description="You can add a new social link by clicking the 'Add Social Link' button."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-40">Platform</TableHead>

          <TableHead className="w-40">URL</TableHead>

          <TableHead className="w-20">Order</TableHead>

          <TableHead className="w-28" align="center">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {socialLinks.map((link) => (
          <TableRow key={link.id} className="border-b">
            <TableCell>{link.platform}</TableCell>

            <TableCell>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="truncate text-blue-600 hover:underline"
              >
                {new URL(link.url).hostname}
              </a>
            </TableCell>

            <TableCell>{link.displayOrder}</TableCell>

            <TableCell className="w-28" align="right">
              <TableActions
                onEdit={() => onEdit(link)}
                onDelete={() => onDelete(link)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
