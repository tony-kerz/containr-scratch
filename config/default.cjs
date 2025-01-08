// const raw = require('config/raw').raw;

module.exports = {
  images: {
    gcloud: {
      name: 'google/cloud-sdk:503.0.0-alpine',
    },
    oras: {
      name: 'bitnami/oras:1.2.1',
      hasShell: false,
    },
  },
  work: {
    container: 'work',
    local: 'work',
  },
}
