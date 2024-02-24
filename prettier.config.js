/** @type {import("prettier").Config} */
export default {
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  importOrder: [
    "\\.css$",
    "<THIRD_PARTY_MODULES>",
    "^@/components/(.*)$",
    "^@/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
