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

export default function CertificateTable({ certificates, onEdit, onDelete }) {
  if (!certificates.length) {
    return (
      <EmptyState
        title="No certificates found"
        description="You can add a new certificate by clicking the 'Add Certificate' button."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-48">Certificate</TableHead>

          <TableHead className="w-40">Issuer</TableHead>

          <TableHead className="w-28" align="center">
            Featured
          </TableHead>

          <TableHead className="w-24" align="center">
            Skills
          </TableHead>

          <TableHead className="w-36" align="center">
            Issue Date
          </TableHead>

          <TableHead className="w-36" align="center">
            Expiry Date
          </TableHead>

          <TableHead className="w-28" align="center">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {certificates.map((certificate) => (
          <TableRow key={certificate.id}>
            <TableCell>
              <div>
                <p className="font-medium">{certificate.title}</p>

              </div>
            </TableCell>

            <TableCell>{certificate.issuer?.name}</TableCell>

            <TableCell align="center">
              {certificate.featured ? (
                <Badge variant="success">Yes</Badge>
              ) : (
                "—"
              )}
            </TableCell>

            <TableCell align="center">{certificate.skills.length}</TableCell>

            <TableCell align="center">
              {new Date(certificate.issueDate).toLocaleDateString()}
            </TableCell>

            <TableCell align="center">
              {certificate.expiryDate
                ? new Date(certificate.expiryDate).toLocaleDateString()
                : "Never"}
            </TableCell>

            <TableCell align="right">
              <TableActions
                onEdit={() => onEdit(certificate)}
                onDelete={() => onDelete(certificate)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
