import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  identifier: Yup.string()
    .email("Digite um email válido")
    .required("Campo obrigatório"),
  password: Yup.string().required("Campo obrigatório"),
});