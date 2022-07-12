module.exports = (plop) => {
  plop.setGenerator("component", {
    description: "Create a component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your component name?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/core/components/{{pascalCase name}}/index.tsx",
        templateFile: "plop-templates/Component.tsx.hbs",
      },
      {
        path: "src/core/components/index.ts",
        pattern: /(\/\/ COMPONENT EXPORTS)/g,
        template: 'export { default as {{name}} } from "./{{name}}";\n$1',
        type: "modify",
      },
    ],
  });
  plop.setGenerator("page", {
    description: "Create a page",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your page name?",
      },
      {
        type: "confirm",
        name: "public",
        message: "Public this page ?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/pages/{{pascalCase name}}/index.tsx",
        templateFile: "plop-templates/Component.tsx.hbs",
      },
      {
        path: "src/pages/index.ts",
        pattern: /(\/\/ PAGE IMPORT)/g,
        template: 'const {{name}} = lazy(() => import("./{{name}}"));\n$1',
        type: "modify",
      },
      {
        path: "src/pages/index.ts",
        pattern: /(\/\/ PAGE EXPORT)/g,
        template: `{ path: "/{{lowerCase name}}", component: {{name}}, exact: true, public: {{public}} },\n$1`,
        type: "modify",
      },
    ],
  });
};
