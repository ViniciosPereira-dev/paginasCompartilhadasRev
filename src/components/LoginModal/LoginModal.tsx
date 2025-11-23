"use client";
import React from "react";
import styles from './LoginModal.module.css';
import { LogIn } from "lucide-react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { Formik, Form, ErrorMessage } from "formik";
import { loginSchema } from "@/src/schemas/LoginSchema";

export function LoginModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const initialValues = {
    email: "",
    senha: "",
    manterConectado: false,
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log("Login enviado:", values);
    resetForm();
    setOpen(false);
  };

  return (
    <>
      <Button
        title="Entrar"
        onClick={handleOpen}
        className=""
      >
        <LogIn size={22} />
      </Button>

      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <div className="mx-auto w-full max-w-[24rem] rounded-lg overflow-hidden shadow-lg bg-gray-900 text-white">
          {/* Título */}
          <div className="flex justify-center items-center py-4">
            <Typography variant="h4" className="text-white font-semibold">
              Entrar
            </Typography>
          </div>

          <Card className="rounded-t-none shadow-none p-0">
            <Formik
              initialValues={initialValues}
              validationSchema={loginSchema}
              onSubmit={handleSubmit}
            >
              {({ handleChange, handleBlur, values }) => (
                <Form>
                  <CardBody className="flex flex-col gap-4 p-6">
                    {/* E-mail */}
                    <Typography className="-mb-2" variant="h6">
                      Seu E-mail
                    </Typography>
                    <Input
                      name="email"
                      label="E-mail"
                      size="lg"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />

                    {/* Senha */}
                    <Typography className="-mb-2" variant="h6">
                      Sua Senha
                    </Typography>
                    <Input
                      type="password"
                      name="senha"
                      label="Senha"
                      size="lg"
                      value={values.senha}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="senha"
                      component="div"
                      className="text-red-500 text-sm"
                    />

                    {/* Checkbox */}
                    <div className="-ml-2.5 -mt-3">
                      <Checkbox
                        name="manterConectado"
                        label="Manter conectado"
                        checked={values.manterConectado}
                        onChange={handleChange}
                      />
                    </div>
                  </CardBody>

                  <CardFooter className="pt-4 px-6 pb-6 flex flex-col gap-4">
                    {/* Botão Entrar */}
                    <Button type="submit" fullWidth>
                      Entrar
                    </Button>

                    {/* Separador com CSS */}
                    <div className={styles.separator}>
                      <div className={styles['separator-line']}></div>
                      <span className={styles['separator-text']}>ou</span>
                      <div className={styles['separator-line']}></div>
                    </div>

                    {/* Login Social */}
                    <div className="flex flex-col gap-2">
                      {/* Google */}
                      <Button
                        variant="outlined"
                        className="flex items-center justify-center gap-2"
                      >
                        <FcGoogle size={22} /> Entrar com Google
                      </Button>

                      {/* Facebook */}
                      <Button
                        variant="outlined"
                        className="flex items-center justify-center gap-2 text-blue-600"
                      >
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Facebook_icon.svg"
                          alt="Facebook"
                          className="w-5 h-5"
                        />
                        Entrar com Facebook
                      </Button>
                    </div>

                    {/* Link para cadastro */}
                    <Typography
                      variant="small"
                      className="mt-4 flex justify-center gap-2"
                    >
                      Não possui conta?
                    <Link href="/cadastro" className={styles.customLink}>
                      Cadastrar
                    </Link>
                    </Typography>
                  </CardFooter>
                </Form>
              )}
            </Formik>
          </Card>
        </div>
      </Dialog>
    </>
  );
}
