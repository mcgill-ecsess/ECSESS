<script lang="ts">
	import { Globe, Instagram, Wrench, Users, CodeXml, Cpu } from '@lucide/svelte';

	// All icons from @lucide/svelte share the same component type; reuse one for typing
	type IconComponent = typeof Wrench;

	type Group = {
		name: string;
		description: string;
		website: string;
		instagram?: string;
		icon: IconComponent;
		features: string[];
	};

	const groups: Group[] = [
		{
			name: 'Code.Jam()',
			description:
				"McGill Engineering's largest annual hackathon, a 36-hour programming competition where students create innovative projects!",
			website: 'https://codejam.mcgilleus.ca/',
			instagram: 'https://www.instagram.com/mcgillcodejam/',
			icon: CodeXml,
			features: ['Biggest Hackathon in Engineering', 'Great prizes', 'Networking opportunities']
		},
		{
			name: 'The Factory',
			description:
				'A student-run lab space for developing personal projects, gaining experience with cutting-edge hardware, and fostering innovation.',
			website: 'https://factory.mcgilleus.ca/',
			instagram: 'https://www.instagram.com/thefactory_mcgill/',
			icon: Wrench,
			features: ['Student-run Lab Space', '3D Printing', 'Hardware Workshops']
		},
		{
			name: 'ECSESSBits',
			description:
				'First Year Council of the McGill Electrical, Computer, Software Engineering Student Society.',
			website: '',
			instagram: 'https://www.instagram.com/ecsessbits/',
			icon: Users,
			features: ['First Year Council', 'Fun Events', 'Study Sessions']
		},
		{
			name: 'IEEE McGill',
			description:
				'One of the largest IEEE student branches in Eastern Canada, offering professional development, networking, and industry connections.',
			website: 'https://ieee.mcgilleus.ca/',
			instagram: 'https://www.instagram.com/ieeemcgill/',
			icon: Cpu,
			features: ['Technical Talks', 'Arduino Workshops', 'Networking Events']
		}
	];
</script>

<div class="container mx-auto px-4">
	<!-- Section Header -->
	<div class="my-12 text-center">
		<h2 id="affiliated-clubs-title" class="text-ecsess-100 mb-2 text-4xl font-bold md:text-5xl">
			Subcommittees & Affiliated Groups
		</h2>
		<p class="text-ecsess-200 mx-auto max-w-2xl text-base">
			Explore opportunities to enhance your skills, build innovative projects, and connect with the
			engineering community through our subcommittees and affiliated groups.
		</p>
	</div>

	<!-- Clubs Grid: 2x2 on large screens -->
	<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
		{#each groups as group, i (group.name)}
			{@const Icon = group.icon}
			<article
				class="bg-ecsess-950 border-ecsess-800 flex flex-col overflow-hidden rounded-lg border text-left"
				aria-labelledby={`group-${i}-title`}
			>
				<div class="flex flex-1 flex-col p-7 md:p-8">
					<!-- Header: icon + name -->
					<header class="mb-5 flex items-center justify-start gap-4">
						<div
							class="bg-ecsess-800 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
						>
							<Icon
								class="text-ecsess-300 size-7"
								strokeWidth={2.5}
								aria-hidden="true"
								focusable="false"
							/>
						</div>
						<h3 id={`group-${i}-title`} class="text-ecsess-50 text-2xl font-bold">
							{group.name}
						</h3>
					</header>

					<!-- Description -->
					<p class="text-ecsess-200 mb-5 text-base leading-relaxed md:text-lg">
						{group.description}
					</p>

					<!-- Features -->
					<ul class="mb-5 list-none space-y-2 ps-0 text-base md:text-lg" role="list">
						{#each group.features as feature (feature)}
							<li class="flex items-center gap-2">
								<span class="bg-ecsess-500 h-1.5 w-1.5 shrink-0 rounded-full" aria-hidden="true"
								></span>
								<span class="text-ecsess-100 font-medium">{feature}</span>
							</li>
						{/each}
					</ul>

					<!-- Links -->
					<div class="border-ecsess-800 mt-auto flex flex-wrap items-center gap-3 border-t pt-5">
						{#if group.instagram}
							<a
								href={group.instagram}
								target="_blank"
								rel="noopener noreferrer external"
								aria-label={`Follow ${group.name} on Instagram`}
								class="text-ecsess-300 hover:text-ecsess-100 border-ecsess-700 bg-ecsess-900/50 hover:bg-ecsess-800/80 inline-flex items-center gap-2 rounded-md border px-4 py-2 text-base"
							>
								<Instagram class="size-5" strokeWidth={2.5} aria-hidden="true" focusable="false" />
								<span>Instagram</span>
							</a>
						{/if}
						{#if group.website}
							<a
								href={group.website}
								target="_blank"
								rel="noopener noreferrer external"
								aria-label={`Visit ${group.name} website`}
								class="text-ecsess-300 hover:text-ecsess-100 border-ecsess-700 bg-ecsess-900/50 hover:bg-ecsess-800/80 inline-flex items-center gap-2 rounded-md border px-4 py-2 text-base"
							>
								<Globe class="size-5" strokeWidth={2.5} aria-hidden="true" focusable="false" />
								<span>Website</span>
							</a>
						{/if}
					</div>
				</div>
			</article>
		{/each}
	</div>
</div>
