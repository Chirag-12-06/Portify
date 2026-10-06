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

import { formatDateRange } from "../../../utils/formatDateRange";

export default function EducationTable({ educations, onEdit, onDelete }) {
  if (!educations.length) {
    return (
      <EmptyState
        title="No education found"
        description="You can add a new education entry by clicking the 'Add Education' button."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-35">Institution Type</TableHead>

          <TableHead className="w-64">Institution Name</TableHead>

          <TableHead className="w-56">Degree</TableHead>

          <TableHead className="w-44">Duration</TableHead>

          <TableHead className="w-28">Grade</TableHead>

          <TableHead className="w-28" align="center">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {educations.map((education) => (
          <TableRow key={education.id}>
            <TableCell>
              {education.institutionType ? (
                education.institutionType.charAt(0) +
                education.institutionType.slice(1).toLowerCase()
              ) : (
                <span className="text-slate-400">—</span>
              )}
            </TableCell>
            <TableCell>
              <div>
                <p className="font-medium">{education.institutionName}</p>

                {education.location && (
                  <p className="text-sm text-slate-500">{education.location}</p>
                )}
              </div>
            </TableCell>

            <TableCell>
              <div>
                <p className="font-medium">{education.degree}</p>

                <p className="text-sm text-slate-500">
                  {education.fieldOfStudy}
                </p>
              </div>
            </TableCell>

            <TableCell>
              {formatDateRange(
                education.startDate,
                education.endDate,
                education.currentlyStudying,
              )}
            </TableCell>

            <TableCell>
              {education.grade || <span className="text-slate-400">—</span>}
            </TableCell>

            <TableCell align="right" className="w-28">
              <TableActions
                onEdit={() => onEdit(education)}
                onDelete={() => onDelete(education)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
