import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/ui/PageHeader";
import LoadingScreen from "../../../components/common/LoadingScreen";

import ProfileForm from "../components/ProfileForm";

import { useProfile } from "../hooks/useProfile";
import { useUpdateProfile } from "../hooks/useUpdateProfile";

export default function ProfilePage() {
  const { data, isLoading, isError } = useProfile();

  const updateProfile = useUpdateProfile();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <p>Failed to load profile.</p>;
  }

  return (
    <>
      <PageHeader
        title="Profile"
        description="Manage your portfolio profile."
      />

      <Card>
        <ProfileForm
          profile={data.data}
          isSubmitting={updateProfile.isPending}
          onSubmit={(values) =>
            updateProfile.mutate(values)
          }
        />
      </Card>
    </>
  );
}