"use client";

import { Formik, Form, ErrorMessage } from "formik";
import { cadastroSchema } from "../../schemas/CadastroSchema";
import { Input, Button } from "@material-tailwind/react";
import styles from "../../styles/Cadastro.module.css";

export default function CadastroPage() {
  const initialValues = {
    nome: "",
    email: "",
    senha: "",
    confirmacao: "",
  };

  const handleSubmit = (values) => {
    console.log("Enviado:", values);
  };

  return (
    <div className={styles.container}>

      {/* IMAGEM ESQUERDA */}
      <div className={styles.imageSide}></div>

      

      {/* FORMULÁRIO DIREITA */}
      <div className={styles.formSide}>
        <div className={styles.formWrapper}>
          <Formik
            initialValues={initialValues}
            validationSchema={cadastroSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, values }) => (
              <Form>

                {/* NOME */}
                <div className={styles.formGroup}>
                  <Input
                    label="Nome"
                    name="nome"
                    value={values.nome}
                    onChange={handleChange}
                  />
                  <ErrorMessage name="nome" component="div" className={styles.error} />
                </div>

                {/* EMAIL */}
                <div className={styles.formGroup}>
                  <Input
                    label="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                  <ErrorMessage name="email" component="div" className={styles.error} />
                </div>

                {/* SENHA */}
                <div className={styles.formGroup}>
                  <Input
                    type="password"
                    label="Senha"
                    name="senha"
                    value={values.senha}
                    onChange={handleChange}
                  />
                  <ErrorMessage name="senha" component="div" className={styles.error} />
                </div>

                {/* CONFIRMAR SENHA */}
                <div className={styles.formGroup}>
                  <Input
                    type="password"
                    label="Confirmar senha"
                    name="confirmacao"
                    value={values.confirmacao}
                    onChange={handleChange}
                  />
                  <ErrorMessage name="confirmacao" component="div" className={styles.error} />
                </div>

                <Button type="submit" color="blue" className="mt-2 w-full">
                  Criar conta
                </Button>

              </Form>
            )}
          </Formik>
        </div>
      </div>

    </div>
  );
}
