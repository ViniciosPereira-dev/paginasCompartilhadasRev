import * as Yup from "yup";

export const cadastroSchema = Yup.object({
  tipoUsuario: Yup.string().required("Selecione o tipo de usuário"),

  nome: Yup.string()
    .required("Informe o nome completo")
    .min(3, "Nome muito curto"),

  email: Yup.string()
    .required("Informe o e-mail")
    .email("E-mail inválido"),

  senha: Yup.string()
    .required("Informe a senha")
    .min(6, "Senha muito curta"),

  confirmacao: Yup.string()
    .oneOf([Yup.ref("senha"), null], "Senhas não conferem")
    .required("Confirme a senha"),

  nascimento: Yup.string()
    .required("Informe a data de nascimento")
    .test(
      "maior-idade",
      "Você precisa ter pelo menos 18 anos",
      (value) => {
        if (!value) return false;
        const hoje = new Date();
        const nascimento = new Date(value);
        const idade = hoje.getFullYear() - nascimento.getFullYear();
        const mesDiff = hoje.getMonth() - nascimento.getMonth();
        const diaDiff = hoje.getDate() - nascimento.getDate();
        if (mesDiff < 0 || (mesDiff === 0 && diaDiff < 0)) {
          return idade - 1 >= 18;
        }
        return idade >= 18;
      }
    ),

  cpfCnpj: Yup.string()
    .when("tipoUsuario", {
      is: (val: string) => val === "doador",
      then: Yup.string()
        .required("Informe seu CPF")
        .matches(/^\d{11}$/, "CPF deve ter 11 dígitos"),
    })
    .when("tipoUsuario", {
      is: (val: string) => val === "receptor",
      then: Yup.string()
        .required("Informe seu CNPJ")
        .matches(/^\d{14}$/, "CNPJ deve ter 14 dígitos"),
    })
    .when("tipoUsuario", {
      is: (val: string) => val === "ambos",
      then: Yup.string()
        .required("Informe CPF ou CNPJ")
        .test(
          "cpf-ou-cnpj",
          "Informe um CPF (11 dígitos) ou CNPJ (14 dígitos) válido",
          (val) => !!val && (/^\d{11}$/.test(val) || /^\d{14}$/.test(val))
        ),
    }),

  endereco: Yup.string().required("Informe o endereço"),
});
