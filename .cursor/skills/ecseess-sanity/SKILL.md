---
name: ecseess-sanity
description: Query Sanity CMS for the ECSESS website using GROQ in SvelteKit load functions. Use when adding or editing CMS content types, +page.server.ts load functions, image URL transforms, or Sanity-related types in $lib/schemas.ts.
---

# ECSESS Sanity CMS

## Client

Defined in `$lib/utils.ts`. Import `getFromCMS(query)` — never instantiate `@sanity/client` elsewhere.

```ts
import { getFromCMS } from '$lib/utils.js';
import type { EventPost } from '$lib/schemas';

const query = `*[_type == "events"]{
  name, category, date, location, description,
  "links": links[]{ kind, title, url },
  "thumbnail": thumbnail.asset->url+"?h=800&fm=webp"
}`;

export const load = async ({ url }) => ({
	events: (await getFromCMS(query)) as EventPost[],
	canonical: url.href
});
```

## Rules

- Queries live in `+page.server.ts` or `+layout.server.ts` only
- Add/update TypeScript types in `$lib/schemas.ts` before use
- Image fields: dereference with `asset->url` and append `?h=N&fm=webp`
- Reference fields: dereference inline — `"name": member->name`
- Combined queries: wrap in `{ ... }` and destructure the response
- Coerce inconsistent CMS shapes in the load function (see `resources/+page.server.ts` for `category`)

## Document types

`homepage`, `officeHours`, `sponsors`, `members`, `events`, `resources`, `devTeam`, `redirects`

Homepage nested fields include `faqs` and `subcommittees[]` (`name`, `description`, `highlights`, `instagram`, `website`, `icon`).

See `AGENTS.md` for field details per type.
