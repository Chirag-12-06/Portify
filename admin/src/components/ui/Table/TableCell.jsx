import clsx from "clsx";

export default function TableCell({ children, align = "left", className }) {
  return (
    <td
      className={clsx(
        "p-3",
        {
        "text-left": align === "left",
        "text-center": align === "center",
        "text-right": align === "right",
    },
        className,
      )}
    >
      {children}
    </td>
  );
}
