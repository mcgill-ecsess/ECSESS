# ECSESS Website

> Made by ECSESS 2024-2025

# Prerequisite knowledge

- `npm` knowledge. We use `bun` for this project. See https://bun.sh for installation guide.
- Svelte & SvelteKit: Follow the tutorial here: https://svelte.dev/tutorial/svelte/welcome-to-svelte

# Tech stack

## Frontend

- SvelteKit (Svelte v5, Kit v2)
  - JavaScript with JSDoc
  - [Svelte Auto Adapter](https://svelte.dev/docs/kit/adapters)
- TailwindCSS (v4.0)

- [`bun`](https://bun.sh) as Node.js package manager (similar to `npm`, `yarn`, `pnpm`, and `deno` v2)

## Content Management System (CMS)

- Sanity CMS

# Development guide

- Clone the repo, install dependencies, and start dev environment:

```bash
git clone https://github.com/mcgill-ecsess/ecsess-site.git
bun i
bun run dev
```

- Branches:
  | name | purpose |
  | - | - |
  |`main` | The development of the site, default branch on ECSESS org.|
  |`master`| Deployment of the site, default branch on EUS org.|
  | development branches | If you're working on an issue, **name your branch accordingly** so that we know what feature it is |

- To create a production version of the website:

```bash
bun run build
bun run preview # to preview the production build
```

# Deployment
- Other than the deployment on EUS server with AWS Caddy, there are alternative ways to deploy the website!
## Docker
- Edit the `.env` file to include the `SANITY_ID` of the CMS
- From the root directory of the project
```sh
# Build the website with `nightly` tag
docker build -t ecsess-website:nightly .
docker run -p 4173:4173 ecsess-website:nightly
```
- The site should now be running on `localhost:4173`


# Development Notes

> Documentation is important !!

## Development Stack

- SvelteKit: 2
- Svelte: 5
- TailwindCSS: 4
- `bun` (https://bun.sh) - it's `npm` and `node` for JavaScript/TypeScript runtime. Feel free to use `npm`, `pnpm`, or even `deno` if you wish, but I built this project with `bun` hehe :smile:

```sh
bun i # install dependencies
bun run dev   # development server
bun run build # test build
```

## Design:

- Figma: https://www.figma.com/design/tomzJ7nLU4KCkojf2vM6xq/ECSESS-Website?node-id=1-1375&t=IxVyjZTYTlztEEpK-0

## Libraries I considered to use:

- Styling:
  - [x] SkelentonUI
- Components:
  - [ ] BitsUI
    - I think it's a bit painful and overkill to use this, tho it gives all the accessibility stuff... Could be a feature!
- Icons:
  - [ ] Lucide: https://lucide.dev/icons/
  - [ ] FontAwesome: https://fontawesome.com/icons

## ECSESS Colors

- I didn't use SkeletonUI custom colors or themes. I rely solely on TailwindCSS custom colors variable.

| ECSESS Colours    | HEX     | `var`                |
| ----------------- | ------- | -------------------- |
| Beigey Green      | #a9b7a0 | --color-ecsess-200   |
| Touching Grass    | #5c8a5c | --color-ecsess-400   |
| Simply Green      | #3b6a3a | --color-ecsess-600   |
| Iconic Dark Green | #0A3D2A | --color-ecsess-800   |
| Not quite black   | #1f1f1f | --color-ecsess-black |

## CMS Integration

- Edit `.env` in the project folder (see `.env.example` for template)
- Add the Sanity CMS's **Project ID**
- See the data when you run `bun run dev`

