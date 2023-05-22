module.exports = {
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:import/recommended',
      // 'plugin:jsx-a11y/recommended',
      'plugin:@typescript-eslint/recommended',
      // 'eslint-config-prettier',
    ],
    plugins: ['unused-imports', '@typescript-eslint', 'import'],
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {},
        node: {
          paths: ['src'],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
      // lint code blocks
      // 'mdx/code-blocks': true,
      // optional, if you want to disable language mapper, set it to `false`
      // if you want to override the default language mapper inside, you can provide your own
      'mdx/language-mapper': {}
    },
    // parser: '@typescript-eslint/parser',
    rules: {
      // Add your own rules here to override ones from the extended configs.
      'no-unused-vars': 'off', // or '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ],
      semi: 'warn',
      'react/react-in-jsx-scope': 'off',
      'import/no-unresolved': [2, { ignore: ['.png$', '.webp$', '.jpg$', '.svg$'] }],
      'sort-imports': [
        'error',
        {
          ignoreDeclarationSort: true,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
    overrides: [
      {
        'files': ['*.tsx', '*.ts'],
        'extends': ['plugin:@typescript-eslint/recommended-requiring-type-checking'],
        'parser': '@typescript-eslint/parser',
        'parserOptions': {
          'project': './tsconfig.json',
          'tsconfigRootDir': './',
        },
      },
      {
        'files': ['*.mdx', '*.md'],
        'parser': 'eslint-mdx',
        'extends': 'plugin:mdx/recommended',
        'plugins': ['prettier'],
        'rules': {
          'prettier/prettier': 'off',
          'semi': 'off',
          'react/jsx-no-undef': 'off'
        }
      },
      {
        // disable typescript on mdx code blocks
        "files": "**/*.mdx/**",
        "rules": {}
      }
    ]
  };