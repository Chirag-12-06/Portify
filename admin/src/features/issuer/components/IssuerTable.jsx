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

export default function IssuerTable({ issuers, onEdit, onDelete }) {
  if (!issuers.length) {
    return (
      <EmptyState
        title="No issuers found"
        description="You can add a new issuer by clicking the 'Add Issuer' button."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-20" align="center">
            Logo
          </TableHead>

          <TableHead>Name</TableHead>

          <TableHead className="w-28" align="right">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {issuers.map((issuer) => (
          <TableRow key={issuer.id}>
            <TableCell align="center">
              {issuer.logo ? (
                <img
                  src={issuer.logo}
                  alt={issuer.name}
                  className="mx-auto h-8 w-8 object-contain"
                />
              ) : (
                "—"
              )}
            </TableCell>

            <TableCell>
              <span className="font-medium">{issuer.name}</span>
            </TableCell>

            <TableCell align="right">
              <TableActions
                onEdit={() => onEdit(issuer)}
                onDelete={() => onDelete(issuer)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}