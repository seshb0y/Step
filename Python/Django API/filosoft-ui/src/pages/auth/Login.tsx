import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormValues = z.infer<typeof schema>;

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  function onSubmit() {
    localStorage.setItem("token", "dev");
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <div className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-semibold">{t("login")}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="space-y-1">
            <label className="text-sm">{t("email")}</label>
            <Input
              type="email"
              {...register("email")}
              aria-invalid={!!errors.email}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm">{t("password")}</label>
            <Input
              type="password"
              {...register("password")}
              aria-invalid={!!errors.password}
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {t("signIn")}
          </Button>
        </form>
      </div>
    </div>
  );
}
