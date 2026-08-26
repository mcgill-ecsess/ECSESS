<script lang="ts">
	import { Globe, Instagram, Wrench, Users, CodeXml, Cpu } from '@lucide/svelte';
	import type { Subcommittee } from '$lib/schemas';

	type IconComponent = typeof Wrench;

	let { groups = [] }: { groups?: Subcommittee[] } = $props();

	const ICON_MAP: Record<string, IconComponent> = {
		code: CodeXml,
		codexml: CodeXml,
		'code-xml': CodeXml,
		hackathon: CodeXml,
		wrench: Wrench,
		factory: Wrench,
		tool: Wrench,
		users: Users,
		people: Users,
		bits: Users,
		cpu: Cpu,
		chip: Cpu,
		ieee: Cpu,
		processor: Cpu
	};

	function resolveIcon(icon?: string): IconComponent {
		if (!icon) return Users;
		const key = icon
			.trim()
			.toLowerCase()
			.replace(/[_\s]+/g, '-');
		return ICON_MAP[key] ?? ICON_MAP[key.replace(/-/g, '')] ?? Users;
	}
</script>

{#if groups.length}
	<div class="container mx-auto px-4" id="AffiliatedGroups" data-component="AffiliatedGroups">
		<!-- Section Header -->
		<div class="my-12 text-center">
			<h2 id="affiliated-clubs-title" class="text-ecsess-50 mb-2 text-4xl font-bold md:text-5xl">
				Subcommittees & Affiliated Groups
			</h2>
			<p class="text-ecsess-300 mx-auto max-w-2xl text-base leading-relaxed">
				Explore opportunities to enhance your skills, build innovative projects, and connect with
				the engineering community through our subcommittees and affiliated groups.
			</p>
		</div>

		<!-- Clubs Grid: 2x2 on large screens -->
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
			{#each groups as group, i (group.name)}
				{@const Icon = resolveIcon(group.icon)}
				<article
					class="border-ecsess-800/60 bg-ecsess-950/40 flex flex-col overflow-hidden rounded-2xl border text-left"
					aria-labelledby={`group-${i}-title`}
				>
					<div class="flex flex-1 flex-col p-6 md:p-8">
						<!-- Header: icon + name -->
						<header class="mb-5 flex items-center justify-start gap-4">
							<div
								class="bg-ecsess-800/50 border-ecsess-700/40 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border"
							>
								<Icon
									class="text-ecsess-200 size-7"
									strokeWidth={2}
									aria-hidden="true"
									focusable="false"
								/>
							</div>
							<h3 id={`group-${i}-title`} class="text-ecsess-50 text-2xl font-bold">
								{group.name}
							</h3>
						</header>

						<!-- Description -->
						{#if group.description}
							<p class="text-ecsess-200 mb-5 text-base leading-relaxed md:text-lg">
								{group.description}
							</p>
						{/if}

						<!-- Highlights -->
						{#if group.highlights.length}
							<ul class="mb-5 list-none space-y-2 ps-0 text-base md:text-lg" role="list">
								{#each group.highlights as feature (feature)}
									<li class="flex items-center gap-2">
										<span
											class="bg-ecsess-500/70 h-1.5 w-1.5 shrink-0 rounded-full"
											aria-hidden="true"
										></span>
										<span class="text-ecsess-200 font-medium">{feature}</span>
									</li>
								{/each}
							</ul>
						{/if}

						<!-- Links -->
						{#if group.instagram || group.website}
							<div
								class="border-ecsess-800/50 mt-auto flex flex-wrap items-center gap-3 border-t pt-5"
							>
								{#if group.instagram}
									<a
										href={group.instagram}
										target="_blank"
										rel="noopener noreferrer external"
										aria-label={`Follow ${group.name} on Instagram`}
										class="text-ecsess-200 hover:text-ecsess-50 border-ecsess-700/50 bg-ecsess-900/40 hover:bg-ecsess-800/50 inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-base transition-colors"
									>
										<Instagram
											class="size-5"
											strokeWidth={2}
											aria-hidden="true"
											focusable="false"
										/>
										<span>Instagram</span>
									</a>
								{/if}
								{#if group.website}
									<a
										href={group.website}
										target="_blank"
										rel="noopener noreferrer external"
										aria-label={`Visit ${group.name} website`}
										class="text-ecsess-200 hover:text-ecsess-50 border-ecsess-700/50 bg-ecsess-900/40 hover:bg-ecsess-800/50 inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-base transition-colors"
									>
										<Globe class="size-5" strokeWidth={2} aria-hidden="true" focusable="false" />
										<span>Website</span>
									</a>
								{/if}
							</div>
						{/if}
					</div>
				</article>
			{/each}
		</div>
	</div>
{/if}
