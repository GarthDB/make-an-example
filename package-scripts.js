module.exports = {
  scripts: {
    commit: {
      description: 'This uses commitizen to help us generate well formatted commit messages',
      script: 'git-cz',
    },
    test: {
      default: {
        description: 'Runs AVA with nyc (which is configured in package.json)',
        script: 'nyc ava',
      },
      watch: {
        description: 'Run AVA in watch mode',
        script: 'ava -w',
      },
    },
    build: {
      description: 'Transpiles es2015 in src to lib for publishing',
      script: 'babel -d lib/ src/',
    },
    lint: {
      description: 'lint the entire project',
      script: 'eslint .',
    },
    reportCoverage: {
      description: 'Report coverage stats to codecov. This should be run after the `test` script',
      script: 'nyc report -r lcovonly && codecov',
    },
    release: {
      description: 'We automate releases with semantic-release. This should only be run on travis',
      script: 'semantic-release pre && npm publish && semantic-release post',
    },
    validate: {
      description: 'This runs several scripts to make sure things look good before committing',
      script: 'p-s -p lint,build,test',
    },
  },
  options: {
    silent: false,
  },
};
