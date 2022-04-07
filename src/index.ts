#!/usr/bin/env node
import fs from 'fs-extra'
import * as path from 'path'

import { ColorsProcessor } from './colors'
import { ImportsProcessor } from './imports'
import { SpacingsProcessor } from './spacings'
import { Schema } from './types'

const coolImport = require('@nikifilini/maiden-config-loader')

async function main() {
  const root = process.cwd()
  let schema: Schema
  if (fs.existsSync(path.join(root, 'schema.maiden.js'))) {
    schema = require(path.join(root, 'schema.maiden.js'))
  } else if (fs.existsSync(path.join(root, 'schema.maiden.ts'))) {
    schema = await coolImport(root, 'schema.maiden.ts', 'schema.maiden.mjs')
  } else {
    throw new Error('Config not found')
  }
  const outDir = path.join(root, schema.out)

  await fs.ensureDir(outDir)

  if ('spacings' in schema) {
    const spacingsGenerator = new SpacingsProcessor(schema)
    await fs.writeFile(
      path.join(outDir, 'spacings.css'),
      spacingsGenerator.content,
    )
  }

  if ('colors' in schema) {
    const colorsGenerator = new ColorsProcessor(schema)
    await fs.writeFile(path.join(outDir, 'colors.css'), colorsGenerator.content)
  }

  const importsGenerator = new ImportsProcessor(schema)
  await fs.writeFile(path.join(outDir, 'index.css'), importsGenerator.content)
}

main()

export * from './utils'
