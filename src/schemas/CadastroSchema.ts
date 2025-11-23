import * as Yup from "yup";

export const cadastroSchema = Yup.object({
  nome: Yup.string()
    .required("Informe o nome completo")
    .min(3, "Nome muito curto"),

  email: Yup.string()
    .required("Informe o e-mail")
    .email("E-mail inválido"),

  senha: Yup.string()
    .required("Informe a senha")
    .min(6, "A senha deve ter no mínimo 6 caracteres"),

  confirmacao: Yup.string()
    .required("Confirme a senha")
    .oneOf([Yup.ref("senha")], "As senhas não conferem"),

  tipoUsuario: Yup.string()
    .required("Selecione o tipo de usuário")
    .oneOf(["doador", "receptor", "ambos"], "Opção inválida"),

  nascimento: Yup.date()
    .required("Informe a data de nascimento")
    .test("maior-idade", "É necessário ter 18 anos ou mais", (value) => {
      if (!value) return false;
      const hoje = new Date();
      const nasc = new Date(value);
      const idade = hoje.getFullYear() - nasc.getFullYear();
      const m = hoje.getMonth() - nasc.getMonth();
      return idade > 18 || (idade === 18 && m >= 0);
    }),

  cpfCnpj: Yup.string()
    .transform((val) => val.replace(/\D/g, "")) // remove máscara automaticamente
    .required("Informe o CPF ou CNPJ")
    .test("cpf-cnpj-valid", "CPF ou CNPJ inválido", function (value) {
      const tipo = this.parent.tipoUsuario;
      if (!value) return false;

      if (tipo === "doador") return /^\d{11}$/.test(value);
      if (tipo === "receptor") return /^\d{14}$/.test(value);

      // ambos: pode ser 11 ou 14
      return /^\d{11}$/.test(value) || /^\d{14}$/.test(value);
    }),

  endereco: Yup.string().required("Informe o endereço"),
});
