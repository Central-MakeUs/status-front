/** @type {import("stylelint").Config} */
export default {
  "extends": ["stylelint-config-standard-scss"],
  "rules": {
    "selector-pseudo-class-no-unknown": [
      true,
      {
        "ignorePseudoClasses": ["global"]
      }
    ],
    "no-descending-specificity": null
  }
};