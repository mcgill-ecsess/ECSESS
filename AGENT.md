# ECSESS Agent Guidelines

This document outlines the standards, technology stack, and best practices for the **ECSESS (Engineering and Computer Science Students' Society)** website project. All AI agents and developers should follow these guidelines strictly.

## 1. Technology Stack

-   **Runtime & Package Manager**: **Bun**.
    -   Use `bun install`, `bun run dev`, `bun run build`.
    -   Do NOT use `npm` or `yarn` unless explicitly instructed.
-   **Framework**: **SvelteKit v2** with **Svelte 5**.
    -   **Runes**: The project is configured with `runes: true`. ALWAYS use Svelte 5 Runes (`$state`, `$derived`, `$effect`, `$props`) for reactivity. Avoid legacy `export let` or `store` syntax for new components.
-   **Styling**: **TailwindCSS v4**.
    -   Configuration is largely handled in CSS (`@theme` in `app.css`) rather than `tailwind.config.js`.
-   **CMS**: **Sanity**.
    -   Content is managed via Sanity. Content schemas and fetching logic are critical parts of the app.
-   **Icons**: **Lucide Svelte** (`@lucide/svelte`).

## 2. Setup Instructions

1.  **Install Dependencies**: Run `bun install` in the project root.
2.  **Environment Setup**:
    -   Copy `.env.example` to `.env` if it doesn't exist.
    -   Ensure Sanity CMS credentials (project ID, dataset) are correctly populated.
3.  **Development**: Run `bun run dev` to start the local server.

## 3. Project Structure & Imports

-   **Aliases**: Always use the configured import aliases:
    -   `import X from 'components/...'` (mapped to `src/components`)
    -   `import X from 'utils/...'` (mapped to `src/utils`)
    -   `import X from 'assets/...'` (mapped to `src/assets`)
    -   `$lib` is available for `src/lib`.

## 4. Styling & Design System

-   **Global Styles**: Refer to [`src/app.css`](file:///src/app.css) for the design system.
-   **Custom Styles**: For custom css styling, please use `<style></style>` tags in the component.
-   **Color Palette**: Use the ECSESS brand colors defined in CSS variables. Do not hardcode hex values if a variable exists.
    -   Light: `--color-ecsess-50` to `--color-ecsess-200`
    -   Mid: `--color-ecsess-300` to `--color-ecsess-600`
    -   Dark: `--color-ecsess-700` to `--color-ecsess-950`
    -   Black: `--color-ecsess-black`
-   **Typography**:
    -   Primary Font: 'Saira', sans-serif.
    -   Classes: Use the `.typography` global class for prose content (CMS text, blogs) to ensure consistent formatting of headers, lists, and quotes.
    -   Use Tailwind utility classes for layout and spacing.

## 5. Coding Standards

-   **Specification & Clarification (CRITICAL)**:
    -   **Ask Questions**: The agent **MUST** ask for clarification if the prompt is ambiguous, vague, or lacks sufficient detail.
    -   **Maximize Detail**: Require as much detail as possible from the user regarding functionality, design preferences, and edge cases before coding.
    -   **Confirm Plan**: Before implementing complex changes, re-state the requirements to the user to ensure alignment.
-   **Svelte Components**:
    -   Use `snippets` for repeated markup within a file.
    -   Ensure accessibility (a11y) attributes are present.
    -   Type all props using `$props()`.
-   **TypeScript**:
    -   Strict typing is encouraged. Avoid `any`.
    -   Define interfaces/types in `src/lib/types` or colocated with components if specific.

## 6. UI/UX Philosophy

-   **Premium & Modern**: The design should feel high-quality. Use smooth transitions, subtle hover states, and the specific color palette to maintain brand identity.
-   **Responsive**: Mobile responsiveness is a strict requirement. Always verify layouts on small screens.
-   **Consistency**: Maintain consistency in design and functionality throughout the website.

## 7. Workflow

-   **Development**: `bun run dev`
-   **Formatting**: `bun run format` (Prettier)
-   **Linting**: `bun run check`
