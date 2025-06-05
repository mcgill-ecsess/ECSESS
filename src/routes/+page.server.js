import { createClient } from '@sanity/client';
import { SANITY_ID } from '$env/static/private';

const client = createClient({
    projectId: SANITY_ID,
    dataset: 'production',
    useCdn: true,
    apiVersion: '2025-02-06'
});

// needs to concat and format this text
const query = `*[_type == "homepage"].description[].children[].text`;

async function getPost() {
    return await client.fetch(query);
}

export const load = async () => {
	return {
		description: await getPost(),
	};
};



