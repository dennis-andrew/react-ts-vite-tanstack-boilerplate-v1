const commitlintConfig = {
  /*
   * Resolve and load @commitlint/config-conventional from node_modules.
   * Referenced packages must be installed
   */
  extends: ['@commitlint/config-conventional'],
  /*
   * Resolve and load conventional-changelog-atom from node_modules.
   * Referenced packages must be installed
   */
  parserPreset: 'conventional-changelog-atom',
  /*
   * Resolve and load @commitlint/format from node_modules.
   * Referenced package must be installed
   */
  formatter: '@commitlint/format',
  /*
   * Any rules defined here will override rules from @commitlint/config-conventional
   */
  rules: {
    // enforce commit types relevant to monorepo
    'type-enum': [
      2,
      'always',
      [
        'setup', // Initial project setup (repo structure, CI tools)
        'config', // Configuration changes (e.g., ESLint, Husky, Docker)
        'info', // Documentation or metadata updates (README, LICENSE, etc.)
        'release', // Version releases (e.g., v1.0.0)
        'task', // Generic task or ticket-related work
        'pipeline', // CI/CD pipeline-related changes (GitHub Actions, Azure, etc.)
        'deploy', // Deployment scripts/config updates
        'merge', // Explicit merge commits (not auto-generated)
        'pr-fix', // Fixes or tweaks after PR review
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation changes
        'style', // Code style fixes (formatting, spacing, etc.)
        'refactor', // Code refactoring (no behavior change)
        'perf', // Performance improvements
        'test', // Adding or updating tests
        'build', // Build system or dependency changes
        'chore', // Maintenance, housekeeping, or non-feature tasks
        'revert', // Reverting a previous commit
        'cr', // Change request
      ],
    ],
  },
  /*
   * Array of functions that return true if commitlint should ignore the given message.
   * Given array is merged with predefined functions, which consist of matchers like:
   *
   * - 'Merge pull request', 'Merge X into Y' or 'Merge branch X'
   * - 'Revert X'
   * - 'v1.2.3' (ie semver matcher)
   * - 'Automatic merge X' or 'Auto-merged X into Y'
   *
   * To see full list, check https://github.com/conventional-changelog/commitlint/blob/master/%40commitlint/is-ignored/src/defaults.ts.
   * To disable those ignores and run rules always, set `defaultIgnores: false` as shown below.
   */
  ignores: [(message) => message.trim() === ''],
  /*
   * Whether commitlint uses the default ignore rules, see the description above.
   */
  defaultIgnores: true,
  /*
   * Custom URL to show upon failure
   */
  helpUrl:
    'https://github.com/conventional-changelog/commitlint/#what-is-commitlint',
  /*
   * Custom prompt configs
   */
  prompt: {
    messages: {},
    questions: {
      type: {
        description: 'Select the type of change you’re committing:',
      },
    },
  },
}

export default commitlintConfig
