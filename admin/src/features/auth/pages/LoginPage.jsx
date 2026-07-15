import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "../schemas/login.schema";
import { useLogin } from "../hooks/useLogin";

import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

export default function LoginPage() {
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values) {
    loginMutation.mutate(values);
  }

  return (
    <div>
      <h1>Admin Login</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            label="Email"
            type="email"
            placeholder="Email"
            {...register("email")}
            error={errors.email?.message}
          />
        </div>

        <div>
          <Input
            label="Password"
            type="password"
            placeholder="Password"
            {...register("password")}
            error={errors.password?.message}
          />
        </div>

        <Button
          type="submit"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}