import test from 'ava'
import debug from '@watchmen/debug'

const dbg = debug(import.meta.url)
dbg('here')

test('one', (t) => {
  t.true(true)
})
