module.exports = {
	root: true,
	plugins: ['jest'],
	extends: ['eslint:recommended', 'prettier'],
	env: {
		node: true,
		es6: true,
	},
	rules: {
		complexity: ['warn'],
		curly: ['error'],
		'default-case': ['error'],
		'guard-for-in': ['error'],
		'no-array-constructor': ['error'],
		'no-else-return': [
			'warn',
			{
				allowElseIf: false,
			},
		],
		'no-implicit-coercion': ['warn'],
		'no-lonely-if': ['error'],
		'no-loop-func': ['error'],
		'no-magic-numbers': ['warn', { ignore: [0, 1, 2, 8] }],
		'no-nested-ternary': ['warn'],
		'no-new-object': ['error'],
		'no-param-reassign': ['warn'],
		'no-process-env': ['error'],
		'no-return-assign': ['error'],
		'no-self-compare': ['error'],
		'no-sequences': ['error'],
		'no-unmodified-loop-condition': ['error'],
		'no-unneeded-ternary': ['warn'],
		'no-useless-call': ['error'],
		'no-useless-computed-key': ['warn'],
		'no-useless-rename': ['warn'],
		'no-warning-comments': [
			'error',
			{
				terms: ['fixme', 'fix'],
			},
		],
		'object-shorthand': ['warn'],
		'prefer-const': ['error'],
		'prefer-rest-params': ['error'],
		'prefer-spread': ['warn'],
		'prefer-template': ['warn'],
		radix: ['error'],
		'spaced-comment': ['warn'],
		yoda: ['warn'],
	},
	overrides: [
		{
			files: ['*.ts'],
			plugins: ['@typescript-eslint'],
			parser: '@typescript-eslint/parser',
			parserOptions: {
				project: `${__dirname}/tsconfig.json`,
				sourceType: 'module',
			},
			extends: [
				'plugin:@typescript-eslint/recommended',
				'plugin:@typescript-eslint/recommended-requiring-type-checking',
			],
			rules: {
				'@typescript-eslint/array-type': [
					'error',
					{
						'array-simple': true,
					},
				],
				'@typescript-eslint/strict-boolean-expressions': [
					'error',
					{
						allowString: false,
						allowNumber: false,
					},
				],
			},
		},
		{
			files: ['tests/**/*.ts'],
			rules: {
				'no-magic-numbers': 'off',
			},
		},
	],
}
