export default function Table({ children }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-fixed">{children}</table>
    </div>
  );
}
