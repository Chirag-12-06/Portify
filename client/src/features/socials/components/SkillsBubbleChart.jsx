import { useEffect, useRef } from "react";
import { hierarchy, pack } from "d3-hierarchy";
import { forceSimulation, forceX, forceY, forceCollide } from "d3-force";

const levelColors = {
  fundamental: "#14B8A6",
  intermediate: "#FACC15",
  advanced: "#EF4444",
};

export default function SkillsBubbleChart({ skills }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!skills || !containerRef.current) return;

    const container = containerRef.current;

    const render = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      // Wait until the container has a real size
      if (width === 0 || height === 0) return;

      const data = Object.entries(skills).flatMap(([level, topics]) =>
        topics.map((topic) => ({
          name: topic.tagName,
          value: topic.problemsSolved,
          level,
        })),
      );

      const root = hierarchy({ children: data })
        .sum((d) => d.value)
        .sort((a, b) => b.value - a.value);

      const bubbles = pack().size([width, height]).padding(5)(root).leaves();

      // Create nodes for the force simulation
      const nodes = bubbles.map((bubble) => {
        const radius = Math.min(bubble.r * 1.5, width / 2 - 5, height / 2 - 5);

        return {
          ...bubble.data,
          r: radius,

          // Spread horizontally
          x: radius + Math.random() * (width - radius * 2),

          // Keep initial positions around the vertical center
          y: height / 2 + (Math.random() - 0.5) * height * 0.3,

          // Random horizontal target
          targetX: radius + Math.random() * (width - radius * 2),
        };
      });

      container.innerHTML = "";

      const elements = nodes.map((node) => {
        const element = document.createElement("div");

        element.style.position = "absolute";
        element.style.width = `${node.r * 2}px`;
        element.style.height = `${node.r * 2}px`;
        element.style.borderRadius = "50%";

        element.style.display = "flex";
        element.style.alignItems = "center";
        element.style.justifyContent = "center";
        element.style.textAlign = "center";

        element.style.padding = "9px";
        element.style.boxSizing = "border-box";

        element.style.color = "#000000";
        element.style.overflow = "hidden";
        element.style.cursor = "pointer";
        element.style.fontWeight = "400";

        const color = levelColors[node.level];

        element.style.background = color;
        element.style.border = `1px solid ${color}`;

        element.innerHTML = `
          <div>
            <div style="
              font-size: ${Math.max(9, Math.min(15, node.r / 4))}px;
              line-height: 1.1;
              bold: 600;
            ">
              ${node.name}
            </div>
          </div>
        `;

        const tooltip = document.createElement("div");

        tooltip.style.position = "fixed";
        tooltip.style.display = "none";
        tooltip.style.zIndex = "100";
        tooltip.style.pointerEvents = "none";
        tooltip.style.padding = "8px 12px";
        tooltip.style.borderRadius = "8px";
        tooltip.style.background = "#0F172A";
        tooltip.style.border = "1px solid #334155";
        tooltip.style.color = "#FFFFFF";
        tooltip.style.textAlign = "center";
        tooltip.style.whiteSpace = "nowrap";

        tooltip.innerHTML = `
          <div style="
            font-size: 14px;
            font-weight: 600;
          ">
            ${node.name}
          </div>

          <div style="
            margin-top: 2px;
            font-size: 11px;
            color: #94A3B8;
          ">
            ${node.value} problems
          </div>
        `;

        document.body.appendChild(tooltip);

        element.addEventListener("mouseenter", () => {
          tooltip.style.display = "block";
        });

        element.addEventListener("mousemove", (event) => {
          tooltip.style.left = `${event.clientX + 12}px`;
          tooltip.style.top = `${event.clientY + 12}px`;
        });

        element.addEventListener("mouseleave", () => {
          tooltip.style.display = "none";
        });
        container.appendChild(element);

        return element;
      });

      const simulation = forceSimulation(nodes)
        .force("x", forceX(() => width / 2).strength(0.015))
        .force("y", forceY(() => height / 2).strength(0.015))
        .force(
          "collision",
          forceCollide((d) => d.r + 8)
            .strength(1)
            .iterations(3),
        )
        .force("legend", () => {
          const legendWidth = 160;
          const legendHeight = 120;

          const legendLeft = width - legendWidth - 12;
          const legendRight = width - 12;
          const legendTop = 4;
          const legendBottom = legendTop + legendHeight;

          nodes.forEach((node) => {
            const nodeLeft = node.x - node.r;
            const nodeRight = node.x + node.r;
            const nodeTop = node.y - node.r;
            const nodeBottom = node.y + node.r;

            const overlaps =
              nodeRight > legendLeft &&
              nodeLeft < legendRight &&
              nodeBottom > legendTop &&
              nodeTop < legendBottom;

            if (overlaps) {
              node.x -= 2;
              node.y += 2;
            }
          });
        })
        .alphaDecay(0.02);

      simulation.on("tick", () => {
        nodes.forEach((node, index) => {
          const element = elements[index];

          node.x = Math.max(node.r, Math.min(width - node.r, node.x));

          node.y = Math.max(node.r, Math.min(height - node.r, node.y));

          element.style.left = `${node.x - node.r}px`;
          element.style.top = `${node.y - node.r}px`;
        });
      });

      return simulation;
    };

    // Render once the browser has completed layout
    let simulation = null;

    const observer = new ResizeObserver(() => {
      if (simulation) {
        simulation.stop();
      }

      simulation = render();
    });

    observer.observe(container);

    // Also attempt immediately
    simulation = render();

    return () => {
      observer.disconnect();

      if (simulation) {
        simulation.stop();
      }

      container.innerHTML = "";
    };
  }, [skills]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Bubble area */}
      <div
        ref={containerRef}
        className="absolute bottom-0 left-0 top-0 right-4"
      />

      {/* Legend */}
      <div className="absolute right-3 w-40 rounded-xl border border-slate-700 bg-slate-900/90 px-4 py-3 backdrop-blur-sm">
        <div className="flex flex-col gap-2 text-sm">
          {Object.entries(levelColors).map(([level, color]) => (
            <div key={level} className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="capitalize text-slate-300">{level}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
