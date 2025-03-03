// import assert from 'node:assert'
import {configr} from '@watchmen/configr'
import _ from 'lodash'
import debug from '@watchmen/debug'
import {withImages} from '@watchmen/containr'
import {getPackage, pretty} from '@watchmen/helpr'
import {
  getUid,
  initWork,
  getHostWork,
  getContainerWork,
} from '@watchmen/containr/util'
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

  const {stdout: lslad} = await $`ls -lad`
  dbg('ls-lad=%s', lslad)

  dbg('work=%s', getHostWork())

  const {stdout: lsla} = await $({lines: true})`ls -la`
  dbg('ls-la=%s', pretty(lsla))

  const cWork = getContainerWork()
  const {stdout: lslaWork} = await $({lines: true})`ls -la ${cWork}`
  dbg('ls-la-cwork=%s', pretty(lslaWork))

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
