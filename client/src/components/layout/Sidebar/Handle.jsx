export default function Handle({ open }) {
  return (
    <div
      className="
        absolute
        -right-8
        top-[40%]
        -translate-y-1/2
        h-30
        w-8
        rounded-r-full
        bg-slate-800
        text-white
        flex
        items-center
        justify-center
        cursor-pointer
        select-none
        text-2xl font-light
      "
    >
      {open ? "⟨" : "⟩"}
    </div>
  );
}
