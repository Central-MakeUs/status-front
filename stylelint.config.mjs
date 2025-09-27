/** @type {import("stylelint").Config} */
export default {
  "extends": ["stylelint-config-standard-scss"],
  "plugins": ["stylelint-prettier"],
  "rules": {
    "selector-pseudo-class-no-unknown": [
      true,
      {
        "ignorePseudoClasses": ["global"]
      }
    ],
    "no-descending-specificity": null,
    "prettier/prettier": [
      true,
      {
        "printWidth": 120,
        "tabWidth": 4
      }
    ]
  }
};