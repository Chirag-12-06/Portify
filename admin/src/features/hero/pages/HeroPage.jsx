import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/ui/PageHeader";
import LoadingScreen from "../../../components/common/LoadingScreen";

import HeroForm from "../components/HeroForm";

import { useHeroes } from "../hooks/useHero";
import { useUpdateHero } from "../hooks/useUpdateHero";

export default function HeroPage() {
  const { data, isLoading, isError } = useHeroes();

  const updateHero = useUpdateHero();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <p>Failed to load hero.</p>;
  }

  return (
    <>
      <PageHeader
        title="Hero"
        description="Manage your hero section."
      />

      <Card>
        <HeroForm
          hero={data.data}
          isSubmitting={updateHero.isPending}
          onSubmit={(values) =>
            updateHero.mutate(values)
          }
        />
      </Card>
    </>
  );
}