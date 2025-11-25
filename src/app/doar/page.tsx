"use client";

import { useState } from "react";
import { Typography, Input, Textarea, Button, Card } from "@material-tailwind/react";
import { Formik, Form, ErrorMessage } from "formik";
import { LivroSchema } from "@/src/schemas/LivroSchema";
import { CheckCircleIcon, ExclamationCircleIcon, BookOpenIcon, UserIcon } from "@heroicons/react/24/solid";



interface LivroForm {
  titulo: string;
  autor: string;
  editora: string;
  genero: string;
  ano: string;
  sinopse: string;
  observacoes: string;
  imagem?: string;
}

export default function DoarLivroPage() {
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const initialValues: LivroForm = {
    titulo: "",
    autor: "",
    editora: "",
    genero: "",
    ano: "",
    sinopse: "",
    observacoes: "",
    imagem: "",
  };

  const handleSave = async (values: LivroForm, { resetForm }: any) => {
    console.log("Submit chamado", values); // depuração

    try {
      const res = await fetch("/api/livrosDoacao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Erro ao cadastrar livro");

      setAlert({ type: "success", message: "Livro cadastrado com sucesso!" });
      resetForm();
    } catch (err) {
      console.error(err);
      setAlert({ type: "error", message: "Falha ao cadastrar livro" });
    }


    setTimeout(() => setAlert(null), 4000);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">

      {alert && (
        <div
          className={`
            fixed top-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white z-50
            transition-all duration-500 ease-out
            ${alert.type === "success" ? "bg-green-600" : "bg-red-600"}
            opacity-100 translate-y-0
          `}
          key={alert.message}
        >
          {alert.type === "success" ? (
            <CheckCircleIcon className="w-5 h-5 inline mr-2" />
          ) : (
            <ExclamationCircleIcon className="w-5 h-5 inline mr-2" />
          )}
          <span className="font-medium">{alert.message}</span>
        </div>
      )}



      <Card className="p-6 bg-blue-50 border border-blue-200 shadow-sm">
        <Typography variant="h5" className="font-bold text-blue-700 mb-2">
          Requisitos para Doação
        </Typography>
        <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
          <li>Máximo de 10 anos de publicação.</li>
          <li>Foto visível da capa obrigatória.</li>
          <li>Livro em bom estado de conservação.</li>
        </ul>
      </Card>


      <Formik initialValues={initialValues} validationSchema={LivroSchema} onSubmit={handleSave}>
        {({ values, handleChange, isSubmitting }) => (
          <Form className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <Input
                icon={<BookOpenIcon className="w-5 h-5 text-gray-500" />}
                name="titulo"
                label="Título"
                value={values.titulo}
                onChange={handleChange}
              />
              <ErrorMessage name="titulo" component="div" className="text-red-500 text-xs mt-1" />

              <Input
                icon={<UserIcon className="w-5 h-5 text-gray-500" />}
                name="autor"
                label="Autor"
                value={values.autor}
                onChange={handleChange}
              />
              <ErrorMessage name="autor" component="div" className="text-red-500 text-xs mt-1" />

              <Input name="editora" label="Editora" value={values.editora} onChange={handleChange} />
              <Input name="genero" label="Gênero" value={values.genero} onChange={handleChange} />
              <Input name="ano" type="number" label="Ano" value={values.ano} onChange={handleChange} />
            </div>

            <div className="flex flex-col gap-4">
              <Textarea name="sinopse" label="Sinopse" value={values.sinopse} onChange={handleChange} />
              <ErrorMessage name="sinopse" component="div" className="text-red-500 text-xs mt-1" />

              <Textarea name="observacoes" label="Observações" value={values.observacoes} onChange={handleChange} />
              <Input type="file" label="Foto da capa" onChange={(e) => console.log(e.target.files?.[0])} />
            </div>

            <div className="lg:col-span-2 mt-2">
              <Button type="submit" disabled={isSubmitting} fullWidth color="blue">
                {isSubmitting ? "Salvando..." : "Doar Livro"}
              </Button>

              
            </div>
          </Form>
        )}
      </Formik>

      
    </div>
  );
}
