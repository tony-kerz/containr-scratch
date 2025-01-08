import debug from '@watchmen/debug'
import config from 'config'
import _ from 'lodash'
import {withImages, withContainer} from '@watchmen/containr'
import {initWorkDir, getUid} from '@watchmen/containr/util'
import {pullOci} from '@watchmen/containr/oci'

const dbg = debug(import.meta.url)

async function main() {
  await initWorkDir()

  const uid = await getUid()

  await pullOci({image: process.env.OCI_IMAGE, user: uid})

  const images = _.omit(config.images, ['oras'])

  dbg('images=%o', images)

  await withImages({
    images,

    volumes: {
      ...(process.env.IS_LOCAL && {
        '/root/.config/gcloud': `${process.env.HOME}/.config/gcloud`,
      }),
    },

    async closure(containers) {
      dbg('closure: containers=%o', containers)
      const {stdout} = await withContainer({
        container: containers.gcloud,
        input: 'gcloud auth list',
        isLines: true,
      })
      dbg('out=%o', stdout)
    },
  })
}

await main()
