import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import Textarea from "../../../components/ui/Textarea";

import { profileSchema } from "../schemas/profile.schema";

export default function ProfileForm({
  profile,
  onSubmit,
  isSubmitting,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      title: "",
      tagline: "",
      about: "",
      email: "",
      phone: "",
      location: "",
      resumeUrl: "",
      profileImageUrl: "",
      heroImageUrl: "",
    },
  });

  useEffect(() => {
    if (profile) {
      reset(profile);
    }
  }, [profile, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <Input
        label="Name"
        error={errors.name?.message}
        {...register("name")}
      />

      <Input
        label="Title"
        error={errors.title?.message}
        {...register("title")}
      />

      <Input
        label="Tagline"
        error={errors.tagline?.message}
        {...register("tagline")}
      />

      <Input
        label="Email"
        type="email"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        label="Phone"
        error={errors.phone?.message}
        {...register("phone")}
      />

      <Input
        label="Location"
        error={errors.location?.message}
        {...register("location")}
      />

      <Input
        label="Resume URL"
        error={errors.resumeUrl?.message}
        {...register("resumeUrl")}
      />

      <Input
        label="Profile Image URL"
        error={errors.profileImageUrl?.message}
        {...register("profileImageUrl")}
      />

      <Input
        label="Hero Image URL"
        error={errors.heroImageUrl?.message}
        {...register("heroImageUrl")}
      />

      <Textarea
  label="About"
  rows={6}
  error={errors.about?.message}
  {...register("about")}
/>

      <Button
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}