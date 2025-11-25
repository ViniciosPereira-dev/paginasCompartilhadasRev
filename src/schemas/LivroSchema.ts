import * as Yup from "yup";

export const LivroSchema = Yup.object().shape({
  titulo: Yup.string().required("Título obrigatório"),
  autor: Yup.string().required("Autor obrigatório"),
  editora: Yup.string().required("Editora obrigatória"),
  genero: Yup.string().required("Gênero obrigatório"),
  ano: Yup.number()
    .required("Ano obrigatório")
    .max(new Date().getFullYear(), "Ano inválido")
    .min(new Date().getFullYear() - 10, "Máximo 10 anos de publicação"),
  sinopse: Yup.string().required("Sinopse obrigatória"),
});