import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/ui/PageHeader";
import LoadingScreen from "../../../components/common/LoadingScreen";

import AboutForm from "../components/AboutForm";

import { useAbout } from "../hooks/useAbout";
import { useUpdateAbout } from "../hooks/useUpdateAbout";

export default function AboutPage() {
  const { data, isLoading, isError } = useAbout();

  const updateAbout = useUpdateAbout();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <p>Failed to load about information.</p>;
  }

  return (
    <>
      <PageHeader
        title="About"
        description="Manage your about information."
      />

      <Card>
        <AboutForm
          about={data.data}
          isSubmitting={updateAbout.isPending}
          onSubmit={(values) =>
            updateAbout.mutate(values)
          }
        />
      </Card>
    </>
  );
}