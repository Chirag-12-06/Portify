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

export default function RagQuestionTable({
  questions,
  onEdit,
  onDelete,
}) {
  if (!questions.length) {
    return (
      <EmptyState
        title="No RAG questions found"
        description="You can add a new question by clicking the 'Add Question' button."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-96">Question</TableHead>

          <TableHead className="w-64">Category</TableHead>

          <TableHead className="w-32">Status</TableHead>

          <TableHead className="w-28" align="center">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {questions.map((question) => (
          <TableRow key={question.id}>
            <TableCell>
              <p className="font-medium line-clamp-2">
                {question.question}
              </p>
            </TableCell>

            <TableCell>
              {question.category || (
                <span className="text-slate-400">—</span>
              )}
            </TableCell>

            <TableCell>
              <span
                className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                  question.isPublished
                    ? "bg-green-100 text-green-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {question.isPublished ? "Published" : "Draft"}
              </span>
            </TableCell>

            <TableCell align="right" className="w-28">
              <TableActions
                onEdit={() => onEdit(question)}
                onDelete={() => onDelete(question)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}