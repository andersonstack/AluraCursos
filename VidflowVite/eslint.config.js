export default [
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        console: "readonly", // Permite usar 'console' sem erros
        fetch: "readonly",  // Permite usar 'fetch' sem erros
        window: "readonly", // Outras globais do navegador (opcional)
        document: "readonly", // Outras globais do navegador (opcional)
        process: "readonly", // Globais do Node.js
        global: "readonly", // Globais do Node.js
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      "no-unused-vars": "warn", // Aviso para variáveis não usadas
      "no-undef": "error",      // Erro para variáveis não definidas
    },
  },
];
