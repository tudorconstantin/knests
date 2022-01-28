module.exports = {
  client: {
    service: {
      name: 'knests',
      url: 'http://localhost:8080/graphql',
      // optional headers
      // headers: {
      //   authorization: 'Bearer lkjfalkfjadkfjeopknavadf'
      // },
      // optional disable SSL validation check
      skipSSLValidation: true
    },
    includes: ['pages/**.tsx'],
    excludes: ['**/node_modules/**/*']

  }
};