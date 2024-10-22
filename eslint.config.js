module.exports = [
	{
	  files: ['*.js'],
	  languageOptions: {
		ecmaVersion: 2021, // Use the latest ECMAScript version
		sourceType: 'module' // Enable ECMAScript modules
	  },
	  rules: {
		'no-unused-vars': 'warn', // Warn about unused variables
		'no-console': 'off', // Allow console statements
		'eqeqeq': 'error', // Enforce strict equality (=== and !==)
		'semi': ['error', 'always'], // Require semicolons at the end of statements
		'quotes': ['error', 'single'] // Enforce single quotes for strings
	  }
	}
  ];
  