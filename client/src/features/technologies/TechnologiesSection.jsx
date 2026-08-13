import Section from "../../shared/components/ui/Section";
import { useTechnologies } from "./hooks/useTechnologies";
import { useState, useMemo } from "react";
import { technologyLabels } from "./constants/technologyLabels";
import SectionCategory from "../../shared/components/ui/SectionCategory";

export default function Technologies() {
  const [activeCategory, setActiveCategory] = useState(null);

  const { data: technologies = [] } = useTechnologies();

  const groupedTechnologies = useMemo(() => {
    return technologies.reduce((acc, technology) => {
      if (!acc[technology.category]) {
        acc[technology.category] = [];
      }

      acc[technology.category].push(technology);

      return acc;
    }, {});
  }, [technologies]);

  const categories = Object.keys(groupedTechnologies);

  const selectedCategory = activeCategory ?? categories[0] ?? null;

  const technologyColors = {
    Blue: {
      glow: "bg-blue-500/25 group-hover:bg-blue-500/50",
      text: "group-hover:text-blue-300",
    },
    Green: {
      glow: "bg-green-500/25 group-hover:bg-green-500/50",
      text: "group-hover:text-green-300",
    },
    Purple: {
      glow: "bg-purple-500/25 group-hover:bg-purple-500/50",
      text: "group-hover:text-purple-300",
    },
    Cyan: {
      glow: "bg-cyan-500/25 group-hover:bg-cyan-500/50",
      text: "group-hover:text-cyan-300",
    },
    Red: {
      glow: "bg-red-500/25 group-hover:bg-red-500/50",
      text: "group-hover:text-red-300",
    },
    Yellow: {
      glow: "bg-yellow-500/25 group-hover:bg-yellow-500/50",
      text: "group-hover:text-yellow-300",
    },
    White: {
      glow: "bg-white/25 group-hover:bg-white/50",
      text: "group-hover:text-white",
    },
    Orange: {
      glow: "bg-orange-500/25 group-hover:bg-orange-500/50",
      text: "group-hover:text-orange-300",
    },
  };

  return (
//     <Section id="technologies" title="Technologies">
//       <div className=" flex flex-col gap-8">
//         {/* Categories */}
//         <SectionCategory
//           categories={categories}
//           Labels={technologyLabels}
//           selectedCategory={selectedCategory}
//           setActiveCategory={setActiveCategory}
//           sectionId="technologies"
//         />

//         <div className="flex flex-wrap justify-center gap-15">
//           {groupedTechnologies[selectedCategory]?.map((technology) => {
//             const color = technologyColors[technology.color] ?? {
//               glow: "bg-gray-500/25 group-hover:bg-gray-500/50",
//               text: "group-hover:text-gray-300",
//             };

//             return (
//               // <div
//               //   key={technology.id}
//               //   className="group flex flex-col items-center"
//               // >
//               //   <div className="relative flex h-56 w-56 items-center justify-center">
//               //     <div
//               //       className={`absolute h-32 w-32 rounded-full blur-3xl transition-all duration-300 group-hover:h-40 group-hover:w-40 ${color.glow}`}
//               //     />

//               //     <img
//               //       src={technology.imageUrl}
//               //       alt={technology.name}
//               //       className="relative h-40 w-40 transition-all duration-300 group-hover:scale-110"
//               //     />
//               //   </div>

//               //   <p
//               //     className={`mt-3 text-center text-3xl font-medium transition-all duration-300 ${color.text}`}
//               //   >
//               //     {technology.name}
//               //   </p>
//               // </div>
//               <div className="space-y-8">
//   {Array.from(
//     { length: Math.ceil(technologies.length / 4) },
//     (_, rowIndex) => {
//       const row = technologies.slice(rowIndex * 4, rowIndex * 4 + 4);

//       return (
//         <div
//           key={rowIndex}
//           className={`flex justify-center gap-8 ${
//             rowIndex % 2 === 1 ? "xl:gap-8" : ""
//           }`}
//         >
//           {row.map((technology) => {
//             const color = technologyColors(technology.color);

//             return (
//               <div
//                 key={technology.id}
//                 className="group flex w-56 flex-col items-center"
//               >
//                 <div className="relative flex h-56 w-56 items-center justify-center">
//                   <div
//                     className={`absolute h-32 w-32 rounded-full blur-3xl transition-all duration-300 group-hover:h-40 group-hover:w-40 ${color.glow}`}
//                   />

//                   <img
//                     src={technology.imageUrl}
//                     alt={technology.name}
//                     className="relative h-40 w-40 transition-all duration-300 group-hover:scale-110"
//                   />
//                 </div>

//                 <p
//                   className={`mt-3 text-center text-3xl font-medium transition-all duration-300 ${color.text}`}
//                 >
//                   {technology.name}
//                 </p>
//               </div>
//             );
//           })}
//         </div>
//       );
//     }
//   )}
// </div>
//             );
//           })}
//         </div>
//       </div>
//     </Section>

<Section id="technologies" title="Technologies">
  <div className="flex flex-col gap-8">
    {/* Categories */}
    <SectionCategory
      categories={categories}
      Labels={technologyLabels}
      selectedCategory={selectedCategory}
      setActiveCategory={setActiveCategory}
      sectionId="technologies"
    />

    <div className="flex flex-col gap-8">
      {(() => {
        const technologies =
          groupedTechnologies[selectedCategory] ?? [];

        const rows = [];
        let index = 0;
        let rowIndex = 0;

        while (index < technologies.length) {
          const rowSize = rowIndex % 2 === 0 ? 4 : 3;

          rows.push(technologies.slice(index, index + rowSize));

          index += rowSize;
          rowIndex++;
        }

        return rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex justify-center gap-15"
          >
            {row.map((technology) => {
              const color = technologyColors[technology.color] ?? {
                glow: "bg-gray-500/25 group-hover:bg-gray-500/50",
                text: "group-hover:text-gray-300",
              };

              return (
                <div
                  key={technology.id}
                  className="group flex w-56 flex-col items-center"
                >
                  <div className="relative flex h-56 w-56 items-center justify-center">
                    <div
                      className={`absolute h-32 w-32 rounded-full blur-3xl transition-all duration-300 group-hover:h-40 group-hover:w-40 ${color.glow}`}
                    />

                    <img
                      src={technology.imageUrl}
                      alt={technology.name}
                      className="relative h-40 w-40 transition-all duration-300 group-hover:scale-110"
                    />
                  </div>

                  <p
                    className={`mt-3 text-center text-3xl font-medium transition-all duration-300 ${color.text}`}
                  >
                    {technology.name}
                  </p>
                </div>
              );
            })}
          </div>
        ));
      })()}
    </div>
  </div>
</Section>
  );
}
