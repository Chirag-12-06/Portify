import clsx from "clsx";

export default function TableRow({
  children,
  className,
}) {
  return (
    <tr
      className={clsx(
        "border-b transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 last:border-b-0",
        className
      )}
    >
      {children}
    </tr>
  );
}