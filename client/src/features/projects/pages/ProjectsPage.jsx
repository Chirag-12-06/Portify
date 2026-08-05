import {
  ArrowLeft,
  Search,
  Database,
  Server,
  FolderGit2,
  ListFilter,
  LayoutGrid,
  Rocket,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../../footer/FooterSection";
import ProjectCard from "../components/ProjectCard";
import Button from "../../../shared/components/ui/Button";
import Input from "../../../shared/components/ui/Input";
import Select from "../../../shared/components/ui/Select";
import LoadingScreen from "../../../shared/components/ui/LoadingScreen";

import { useProjectCards } from "../hooks/useProjectCards";
import { useTechnologies } from "../../technologies/hooks/useTechnologies";

import { technologyLabels } from "../../technologies/constants/technologyLabels";

const LOADING_STEPS = [
  { icon: Database, text: "Connecting to backend" },
  { icon: Server, text: "Fetching project data" },
  { icon: FolderGit2, text: "Loading repositories" },
  { icon: ListFilter, text: "Applying filters" },
  { icon: LayoutGrid, text: "Forming project cards" },
  { icon: Rocket, text: "Ready to explore" },
];

export default function ProjectsPage() {
  const navigate = useNavigate();

  const [booting, setBooting] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [technologyCategory, setTechnologyCategory] = useState("");
  const [technology, setTechnology] = useState("");

  const { data: projectCards = [], isLoading } = useProjectCards();
  const { data: technologies = [] } = useTechnologies();

  const categories = [...new Set(technologies.map((tech) => tech.category))];

  const filteredTechnologies =
    technologyCategory === ""
      ? technologies
      : technologies.filter((tech) => tech.category === technologyCategory);

  const filteredProjects = projectCards.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.shortDescription.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status === "" || project.status === status;

    const matchesCategory =
      technologyCategory === "" ||
      project.techs.some((tech) => tech.category === technologyCategory);

    const matchesTechnology =
      technology === "" ||
      project.techs.some(
        (tech) => tech.name.toLowerCase() === technology.toLowerCase(),
      );

    return (
      matchesSearch && matchesStatus && matchesTechnology && matchesCategory
    );
  });

  return (
    <>
      {booting && (
        <LoadingScreen
          steps={LOADING_STEPS}
          isReady={!isLoading}
          onDone={() => setBooting(false)}
        />
      )}

      <main className="flex h-screen flex-col bg-slate-950 text-white">
      {/* Header */}
      <div className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold">Projects</h1>

              <p className="mt-2 text-slate-400">
                Explore all projects, experiments and applications.
              </p>
            </div>

            <Button
              variant="secondary"
              icon={ArrowLeft}
              iconPosition="left"
              onClick={() =>
                navigate("/", {
                  state: { scrollTo: "projects" },
                })
              }
            >
              Home
            </Button>
          </div>

          <div className="space-y-4">
            {/* Search */}
            <Input
              icon={Search}
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* Filters */}
            <div className="grid gap-4 md:grid-cols-3">
              {/* Status */}
              <Select
                value={status}
                onChange={setStatus}
                options={[
                  { value: "", label: "All Status" },
                  { value: "COMPLETED", label: "Completed" },
                  { value: "IN_PROGRESS", label: "In Progress" },
                ]}
              />

              {/* Category */}
              <Select
                value={technologyCategory}
                onChange={(value) => {
                  setTechnologyCategory(value);
                  setTechnology(""); // Reset selected technology
                }}
                options={[
                  { value: "", label: "Technology Categories" },
                  ...categories.map((category) => ({
                    value: category,
                    label: technologyLabels[category],
                  })),
                ]}
              />

              {/* Technology */}
              <Select
                value={technology}
                onChange={setTechnology}
                options={[
                  { value: "", label: "All Technologies" },
                  ...filteredTechnologies.map((tech) => ({
                    value: tech.name,
                    label: tech.name,
                  })),
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl px-6 py-10">
          {filteredProjects.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-slate-900/50 py-24 text-center">
              <p className="text-lg font-medium text-white">
                No projects match your filters
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Try adjusting your search or filters.
              </p>
            </div>
          )}

          <Footer />
        </div>
      </div>
      </main>
    </>
  );
}
