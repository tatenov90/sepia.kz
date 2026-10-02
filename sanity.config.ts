import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { projectId, dataset } from './src/sanity/env';
import { schema } from './src/sanity/schemaTypes';
import { structure } from './src/sanity/structure';

export default defineConfig({
  basePath: '/studio',
  projectId: projectId!,
  dataset: dataset!,
  plugins: [structureTool({ structure })],
  schema,
});
