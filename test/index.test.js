import test from 'ava'
import debug from '@watchmen/debug'
import fs from 'fs-extra'

const dbg = debug(import.meta.url)
dbg('here')

test('one', async (t) => {
  const dir = 'work'
  const file = 'foo.txt'
  const content = 'bar'
  dbg('volume: dir=%o, file=%o, content=%o', dir, file, content)

  await fs.emptyDir(dir)
  await fs.writeFile(`${dir}/${file}`, content)
  t.is(await fs.readFile(`${dir}/${file}`, 'utf8'), content)
})
