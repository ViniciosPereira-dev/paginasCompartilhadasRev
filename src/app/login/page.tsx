"use client";

import { Input, Button } from "@material-tailwind/react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema } from "../../schemas/LoginSchema";

export default function loginPage() {
  const initialValues = {
    identifier: "",
    password: "",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">

        <div className="flex flex-col items-center mb-6">
          <img
            src="/imagens/logo.png"
            alt="logo"
            className="w-28 h-28 mb-4 object-contain"
          />
          <h1 className="text-2xl font-semibold">Entrar</h1>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            setTimeout(() => {
              console.log(values);
              setSubmitting(false);
            }, 900);
          }}
        >
          {({ isSubmitting }) => (
            <Form>

              {/* EMAIL */}
              <Field name="identifier">
                {({ field, meta }) => (
                  <div className="mb-4">
                    <Input
                      {...field}
                      type="email"
                      label="Email"
                      error={meta.touched && Boolean(meta.error)}
                    />
                    {meta.touched && meta.error && (
                      <span className="text-red-500 text-xs">{meta.error}</span>
                    )}
                  </div>
                )}
              </Field>

              {/* SENHA */}
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">
                  Senha
                </label>

                <Link
                  href="#"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Esqueceu a senha?
                </Link>
              </div>

              <Field name="password">
                {({ field, meta }) => (
                  <div className="mb-4">
                    <Input
                      {...field}
                      type="password"
                      label="Senha"
                      error={meta.touched && Boolean(meta.error)}
                    />
                    {meta.touched && meta.error && (
                      <span className="text-red-500 text-xs">{meta.error}</span>
                    )}
                  </div>
                )}
              </Field>

              {/* BOTÃO ENTRAR */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 rounded-md text-white font-medium ${
                  isSubmitting
                    ? "bg-green-500/70"
                    : "bg-green-700 hover:bg-green-800"
                }`}
              >
                {isSubmitting ? "Carregando..." : "Entrar"}
              </button>

              {/* separador */}
              <div className="flex items-center my-6">
                <div className="flex-1 h-px bg-gray-200" />
                <div className="px-3 text-sm text-gray-400">ou</div>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* botões sociais */}
              <div className="space-y-3">
                <Button
                  variant="outlined"
                  className="flex items-center justify-center gap-2"
                  fullWidth
                >
                  <FcGoogle size={22} /> Entrar com Google
                </Button>

                <Button
                  variant="outlined"
                  className="flex items-center justify-center gap-2 text-blue-600"
                  fullWidth
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Facebook_icon.svg"
                    alt="Facebook"
                    className="w-5 h-5"
                  />
                  Entrar com Facebook
                </Button>
              </div>

              {/* links finais */}
              <p className="mt-6 text-center text-sm text-gray-600">
                Novo por aqui?{" "}
                <Link href="/cadastro" className="text-blue-600 hover:underline">
                  Crie uma conta
                </Link>
              </p>

              <p className="mt-3 text-center text-sm">
                <Link href="/" className="text-blue-600 hover:underline">
                  Voltar para home
                </Link>
              </p>

            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
