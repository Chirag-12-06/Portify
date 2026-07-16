import { forwardRef } from "react";

const Checkbox = forwardRef(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className={className}>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            ref={ref}
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            {...props}
          />

          {label && (
            <span className="text-sm font-medium text-slate-700">
              {label}
            </span>
          )}
        </label>

        {error && (
          <p className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;