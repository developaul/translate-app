module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      url: ['http://localhost:3000/'],
      startServerCommand: 'bun run start'
    },
    upload: {
      target: 'temporary-public-storage'
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'button-name': 'off',
        'errors-in-console': 'off',
        'link-name': 'off',
        'unused-javascript': 'off'
      }
    }
  }
};