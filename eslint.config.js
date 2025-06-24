import antfu from '@antfu/eslint-config';

export default antfu({
  // Vue specific configuration
  vue: true,
  typescript: true,

  // Customizable rules
  rules: {
    // Example of customizing specific rules
    'vue/max-attributes-per-line': [
      'off',
      {
        singleline: 3,
        multiline: 1,
      },
    ],

    // TypeScript specific rules
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',

    // Potential additional customizations
    'vue/component-name-in-template-casing': ['off', 'PascalCase'],
    'vue/require-prop-types': 'error',
    // '@typescript-eslint/no-unused-vars': ['off'],
    'vue/multi-word-component-names': 'off',
    // 'no-unused-vars': 'off',
    // '@typescript-eslint/no-unused-vars': ['off'],
    'prefer-promise-reject-errors': 'off',
    '@typescript-eslint/no-var-requires': 'off',

    'no-unused-vars': ['off'],
    '@typescript-eslint/no-unused-vars': ['warn'],
    'unused-imports/no-unused-vars': 'warn',
    'unused-imports/no-unused-imports': 'off',
    'vue/block-order': 'off',
    'vue/padding-line-between-blocks': 'off',
    'perfectionist/sort-named-imports': 'off',
    'vue/eqeqeq': 'off',
    'no-console': 'off',
    'style/semi': 'off',
    'ts/no-use-before-define': 'off',
    'antfu/top-level-function': 'off',
    'perfectionist/sort-imports': 'off',
    'import/newline-after-import': 'off',
    'vue/html-self-closing': 'off',
    'vue/attributes-order': 'off',
    'ts/no-explicit-any': 'off',
    'style/comma-dangle': 'off',
    'style/space-infix-ops': 'off',
    'prefer-template': 'off',
    'style/indent': 'off',
    'style/no-multiple-empty-lines': 'off',
    'vue/space-infix-ops': 'off',
    'vue/html-comment-content-spacing': 'off',
    'node/prefer-global/process': 'off',
    'style/brace-style': 'off',
    'vue/html-indent': 'off',
    'style/arrow-parens': 'off',
    'vue/first-attribute-linebreak': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/prefer-template': 'off',
    'vue/custom-event-name-casing': 'off',
    'vue/attribute-hyphenation': 'off',
    'style/key-spacing': 'warn',
    'vue/no-template-shadow': 'off',
    'antfu/consistent-list-newline': 'off',
    'style/eol-last': 'off',
    'style/no-trailing-spaces': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/define-macros-order': 'off',
    'style/operator-linebreak': 'off',
    'style/quote-props': 'off',
    'style/member-delimiter-style': 'off',
    'style/indent-binary-ops': 'off',
    'vue/operator-linebreak': 'off',
    'style/quotes': 'warn',
    'style/padding-line-between-statements': 'off',
    eqeqeq: 'off',
  },
});
