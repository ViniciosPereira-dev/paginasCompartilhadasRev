import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("E-mail inválido")
    .required("Informe o e-mail"),
  senha: Yup.string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("Informe a senha"),
});
