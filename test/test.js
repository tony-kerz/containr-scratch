import test from 'ava'
import debug from '@watchmen/debug'
// import fs from 'fs-extra'
import _ from 'lodash'
import {initWork} from '@watchmen/containr/util'

const dbg = debug(import.meta.url)

test.beforeEach(async () => {
  await initWork()
})

test('dummy', (t) => {
  dbg('dummy')
  t.pass()
})
