import assert from 'node:assert'
import config from 'config'
import _ from 'lodash'
import debug from '@watchmen/debug'
import {withImages} from '@watchmen/containr'
import {stringify} from '@watchmen/helpr'
import {getUid, initHostWork} from '@watchmen/containr/util'
import {pullOci} from '@watchmen/containr/oci'

const dbg = debug(import.meta.url)

async function main() {
  await initHostWork()

  const uid = await getUid()

  await pullOci({image: process.env.OCI_IMAGE, user: uid})

  const images = _.omit(config.containr.images, ['oras'])

  dbg('images=%o', images)

  await withImages({
    images,

    volumes: {
      ...(process.env.IS_LOCAL && {
        '/root/.config/gcloud': `${process.env.HOME}/.config/gcloud`,
      }),
    },

    async closure(withContainer) {
      const image = 'gcloud'
      const withGcloud = (args) => withContainer({...args, image})

      const which = await withGcloud({input: 'which gcloud'})
      dbg('which=%s', which)
      assert(which, 'gcloud binary should b on path')

      const oci = await withGcloud({input: 'ls -la scratch.txt'})
      dbg('oci=%s', stringify(oci))
      assert(oci, 'oci files should b found')

      const {stdout, stderr} = await withGcloud({
        input: 'gcloud auth list',
        // don't throw on error here as this is expected to fail when not authenticated locally
        // so in this case just capture stdout and stderr and dump to console
        throwOnError: false,
      })
      dbg('out=%o, err=%o', stdout, stderr)
    },
  })
}

await main()
