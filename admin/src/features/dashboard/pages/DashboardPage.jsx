import {
  FolderKanban,
  Wrench,
  GraduationCap,
  Briefcase,
  School,
  Mail,
} from "lucide-react";

import PageHeader from "../../../components/ui/PageHeader";
import Spinner from "../../../components/ui/Spinner";

import StatsCard from "../components/StatsCard";
import { useDashboard } from "../hooks/useDashboard";

export default function DashboardPage() {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <p>Failed to load dashboard.</p>;
  }

  const stats = data.data;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
  <StatsCard
    title="Projects"
    value={stats.projects}
    icon={FolderKanban}
  />

  <StatsCard
    title="Skills"
    value={stats.skills}
    icon={Wrench}
  />

  <StatsCard
    title="Certificates"
    value={stats.certificates}
    icon={GraduationCap}
  />

  <StatsCard
    title="Experience"
    value={stats.experiences}
    icon={Briefcase}
  />

  <StatsCard
    title="Education"
    value={stats.education}
    icon={School}
  />

  <StatsCard
    title="Unread Messages"
    value={stats.unreadMessages}
    icon={Mail}
  />
</div>
  );
}