module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'revert',
        'ci',
        'build',
      ],
    ],
    'scope-enum': [
      2,
      'always',
      [
        'landing',
        'docs-hub',
        'solutions-portal',
        'ui',
        'config',
        'utils',
        'docker',
        'ci',
        'deps',
        'release',
      ],
    ],
  },
};