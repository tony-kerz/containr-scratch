// import assert from 'node:assert'
import {configr} from '@watchmen/configr'
import _ from 'lodash'
import debug from '@watchmen/debug'
import {withImages} from '@watchmen/containr'
import {getPackage} from '@watchmen/helpr'
import {getUid, initWork, getHostWork} from '@watchmen/containr/util'
import {$} from 'execa'

const dbg = debug(import.meta.url)

async function main() {
  const pack = await getPackage()
  dbg('package.version=%s', pack.version)

  await initWork()

  const uid = await getUid()
  dbg('uid=%s', uid)

  const {stdout: pwd} = await $`pwd`
  dbg('pwd=%s', pwd)

  const {stdout: ls} = await $`ls -lad`
  dbg('ls=%s', ls)

  dbg('work=%s', getHostWork())

  const images = configr.containr.images
  await withImages({
    images,

    async closure(withContainer) {
      const ls = await withContainer({image: 'ubuntu', input: 'ls -lad'})
      dbg('ls=%s', ls)
    },
  })
}

await main()
