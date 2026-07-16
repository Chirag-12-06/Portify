import clsx from "clsx";

export default function TableHead({ children, className, align = "left" }) {
  return (
    <th
      className={clsx(
        "p-3 font-semibold",
        className,
        {
          "text-left": align === "left",
          "text-center": align === "center",
          "text-right": align === "right",
        },
      )}
    >
      {children}
    </th>
  );
}
