import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
    basePath: '/studio',
    name: 'Gabriel_Dalmoro_Personal_Brand',
    title: 'Gabriel Dalmoro CMS',

    projectId,
    dataset,

    plugins: [deskTool(), visionTool()],

    schema: {
        types: schemaTypes,
    },
});
