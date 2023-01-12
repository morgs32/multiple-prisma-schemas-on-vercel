#!/usr/bin/env zx
/* global $ */
// noinspection UnusedCatchParameterJS
import { glob } from 'zx'

$.verbose = false

const pwd = await $`pwd`
console.log('pwd', pwd.stdout.trim())

const files = await glob([
  '**/*_engine*',
])

const engineDir = '.prisma/client'
await $`mkdir -p ${engineDir}`

await Promise.all(
  files.map(async (file) => {
    console.log('file', file)
    await $`cp -f ${file} ${engineDir}`
    await $`rm ${file}`
  })
)

const newLocation = await glob([
  `${engineDir}/*_engine*`,
])

console.log('newLocation', newLocation)