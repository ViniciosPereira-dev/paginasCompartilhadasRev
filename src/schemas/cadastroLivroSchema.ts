import * as Yup from "yup";

export const cadastroLivroSchema = Yup.object().shape({
  titulo: Yup.string().required("Título obrigatório"),
  autor: Yup.string().required("Autor obrigatório"),
  genero: Yup.string().required("Gênero obrigatório"),
  ano: Yup.number()
    .required("Ano obrigatório")
    .min(0, "Ano inválido"),
  editora: Yup.string().required("Editora obrigatória"),
  disponivel: Yup.boolean(),
  imagem: Yup.string().url("URL inválida").required("Imagem obrigatória"),
  sinopse: Yup.string().required("Sinopse obrigatória"),
  observacoes: Yup.string(),
  doador: Yup.string().required("Nome do doador obrigatório"),
});