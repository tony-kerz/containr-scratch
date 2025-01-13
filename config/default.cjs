module.exports = {
  images: {
    gcloud: {
      name: 'google/cloud-sdk:503.0.0-alpine',
      volumes: {
        ...(process.env.IS_LOCAL && {
          '/root/.config/gcloud': `${process.env.HOME}/.config/gcloud`,
        }),
      },
    },
    oras: {
      name: 'bitnami/oras:1.2.1',
      hasShell: false,
    },
  },
}
