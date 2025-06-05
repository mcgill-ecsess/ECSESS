import { createClient } from '@sanity/client';
import { SANITY_ID } from '$env/static/private';

const client = createClient({
    projectId: SANITY_ID,
    dataset: 'production',
    useCdn: true,
    apiVersion: '2025-02-06'
});

/**
 * 
 * @param {String} query the GROQ query from Sanity CMS
 */
export async function getFromCMS(query) {
   return await client.fetch(query);
}

