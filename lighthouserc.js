module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      url: ['http://localhost:3000/'],
      startServerCommand: 'npm run start'
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};