"use client";

import { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { Input, Button, Select, Option, Typography } from "@material-tailwind/react";
import Image from "next/image";
import { cadastroSchema } from "../../schemas/CadastroSchema";
import styles from "../../styles/Cadastro.module.css";
import { FcGoogle } from "react-icons/fc";
import  Link  from "next/link";


export default function Cadastro() {
  const [showToast, setShowToast] = useState(false);

  const initialValues = {
    nome: "",
    email: "",
    senha: "",
    confirmacao: "",
    tipoUsuario: "",
    cpfCnpj: "",
    nascimento: "",
    endereco: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    console.log("ENVIADO:", values);

    // Simula envio
    await new Promise((r) => setTimeout(r, 600));

    // Mostra o toast
    setShowToast(true);

    // Limpa o form
    resetForm();

    // Esconde o toast após 2,5s
    setTimeout(() => setShowToast(false), 2500);
  };

  return (
    <div className={styles.page}>
      {/* LADO ESQUERDO - IMAGEM */}
<div className={styles.left}>
  <Image
    src="/imagens/cadastro2.jpg"
    alt="Cadastro"
    fill
    className={styles.image}
  />
  <div className={styles.imageOverlay}></div> {/* overlay escuro */}
  <div className={styles.overlayText}>
    <h2>Doe livros, transforme vidas!</h2>
    <p>Compartilhe conhecimento e faça a diferença na comunidade.</p>
  </div>
</div>


      {/* LADO DIREITO - FORM */}
      <div className={styles.right}>
        <div className={styles.card}>
          <h2 className={styles.title}>Criar conta</h2>

          {/* ALERT / TOAST */}
          {showToast && (
            <div className={styles.toast}>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Conta criada com sucesso!
            </div>
          )}


          <Formik
            initialValues={initialValues}
            validationSchema={cadastroSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleBlur, isSubmitting }) => (
              <Form className={styles.form}>
                {/* BOTÕES SOCIAIS */}
                <div className={styles.socialBtns}>
                  <Button variant="outlined" className={styles.googleBtn}>
                    <FcGoogle size={22} /> Entrar com Google
                  </Button>

                <Button variant="outlined" className="flex items-center justify-center gap-2 text-blue-600">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Facebook_icon.svg"
                    alt="Facebook"
                    className="w-5 h-5"
                  />
                  Entrar com Facebook
                </Button>

                </div>

                {/* Separador */}
                <div className={styles.separator}>
                  <div className={styles.line}></div>
                  <span className={styles.or}>ou</span>
                  <div className={styles.line}></div>
                </div>

                {/* Campos do Formulário */}
                {/* NOME + EMAIL */}
                <div className={styles.grid2}>
                  <div className={styles.field}>
                    <Input
                      label="Nome completo"
                      name="nome"
                      value={values.nome}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage name="nome" component="p" className={styles.error} />
                  </div>
                  <div className={styles.field}>
                    <Input
                      label="Email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage name="email" component="p" className={styles.error} />
                  </div>
                </div>

                {/* SENHAS */}
                <div className={styles.grid2}>
                  <div className={styles.field}>
                    <Input
                      type="password"
                      label="Senha"
                      name="senha"
                      value={values.senha}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage name="senha" component="p" className={styles.error} />
                  </div>
                  <div className={styles.field}>
                    <Input
                      type="password"
                      label="Confirmar senha"
                      name="confirmacao"
                      value={values.confirmacao}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage name="confirmacao" component="p" className={styles.error} />
                  </div>
                </div>

                {/* TIPO USUÁRIO + CPF/CNPJ */}
                <div className={styles.grid2}>
                  <div className={styles.field}>
                    <Select
                      label="Tipo de usuário"
                      value={values.tipoUsuario}
                      onChange={(val) =>
                        handleChange({ target: { name: "tipoUsuario", value: val } })
                      }
                      onBlur={() => handleBlur({ target: { name: "tipoUsuario" } })}
                    >
                      <Option value="doador">Doador</Option>
                      <Option value="receptor">Receptor</Option>
                      <Option value="ambos">Ambos</Option>
                    </Select>
                    <ErrorMessage name="tipoUsuario" component="p" className={styles.error} />
                  </div>

                  <div className={styles.field}>
                    <Input
                      name="cpfCnpj"
                      value={values.cpfCnpj}
                      label={
                        values.tipoUsuario === "receptor"
                          ? "CNPJ"
                          : values.tipoUsuario === "doador"
                          ? "CPF"
                          : "CPF ou CNPJ"
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage name="cpfCnpj" component="p" className={styles.error} />
                  </div>
                </div>

                {/* DATA + ENDEREÇO */}
                <div className={styles.grid2}>
                  <div className={styles.field}>
                    <Input
                      type="date"
                      name="nascimento"
                      label="Nascimento"
                      value={values.nascimento}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage name="nascimento" component="p" className={styles.error} />
                  </div>
                  <div className={styles.field}>
                    <Input
                      name="endereco"
                      label="Endereço"
                      value={values.endereco}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage name="endereco" component="p" className={styles.error} />
                  </div>
                </div>

                <Button type="submit" color="green" disabled={isSubmitting}>
                  Criar conta
                </Button>  

                  <div className=" text-center">
                    <p className="text-gray-600">
                      Já possui uma conta?{" "}
                    <Link href="/" className={styles.loginLink}>
                      Faça login
                    </Link>
                    </p>
                  </div>            
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
