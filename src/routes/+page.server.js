import { getFromCMS } from 'utils/utils.js';

// needs to concat and format this text
const descQuery = `*[_type == "homepage"].description[].children[].text`;

const ohQuery = `*[_type=="oh"].schedule[]{
  day,
  startTime,
  endTime,
  "host": member->name
}`;

export const load = async () => {
	return {
		description: await getFromCMS(descQuery),
		ohs: await getFromCMS(ohQuery),
		pictures: "",
		FAQs: "",
	};
};
