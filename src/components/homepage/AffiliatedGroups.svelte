<script lang="ts">
	import { Globe, Instagram, Wrench, Zap, CodeXml, Podcast } from '@lucide/svelte';

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
				"McGill Engineering's largest annual hackathon. A 48-hour programming competition where students create innovative solutions to real-world problems.",
			website: 'https://codejam.mcgilleus.ca/',
			instagram: 'https://www.instagram.com/mcgillcodejam/',
			icon: CodeXml,
			features: [
				'Biggest Hackathon in Engineering',
				'Great prizes',
				'Cool swags and merch',
				'Networking opportunities'
			]
		},
		{
			name: 'The Factory',
			description:
				'A student-run lab space for developing personal projects, gaining experience with cutting-edge hardware, and fostering innovation.',
			website: 'https://factory.mcgilleus.ca/',
			instagram: 'https://www.instagram.com/thefactory_mcgill/',
			icon: Wrench,
			features: ['Student-run Lab Space', '3D Printing', 'Equipment Rental', 'Hardware Workshops']
		},
		{
			name: 'IEEE McGill',
			description:
				'One of the largest IEEE student branches in Eastern Canada, offering professional development, networking, and industry connections.',
			website: 'https://ieee.mcgilleus.ca/',
			instagram: 'https://www.instagram.com/ieeemcgill/',
			icon: Zap,
			features: [
				'Technical Talks',
				'Arduino Workshops',
				'IEEEXtreme Competition',
				'Networking Events'
			]
		},
	];
</script>

<div class="container mx-auto px-4">
	<!-- Section Header -->
	<div class="mb-12 text-center">
		<h2 id="affiliated-clubs-title" class="text-ecsess-100 mb-4 text-4xl font-bold md:text-5xl">
			Subcommittees & Affiliated Groups
		</h2>
		<p class="text-ecsess-200 mx-auto max-w-2xl text-lg">
			Explore opportunities to enhance your skills, build innovative projects, and connect with the
			engineering community through our subcommittees and affiliated groups.
		</p>
	</div>

	<!-- Clubs Grid -->
	<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each groups as group, i (group.name)}
			{@const Icon = group.icon}
			<article
				class="group bg-ecsess-950 shadow-ecsess-800 relative flex flex-col overflow-hidden rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
				aria-labelledby={`group-${i}-title`}
			>
				<!-- Decorative gradient bar -->
				<div class="from-ecsess-400 via-ecsess-500 to-ecsess-600 h-2 bg-gradient-to-r"></div>

				<div class="flex flex-1 flex-col p-6">
					<!-- Icon and Name -->
					<div class="mb-4 flex items-center justify-between gap-4">
						<div class="flex items-center gap-4">
							<div
								class="group-hover:bg-ecsess-500 bg-ecsess-800 flex h-14 w-14 items-center justify-center rounded-xl shadow-md transition-all duration-300 group-hover:scale-110"
							>
								<Icon
									class="text-ecsess-300 h-7 w-7 transition-colors group-hover:text-white"
									strokeWidth={2.5}
									aria-hidden="true"
									focusable="false"
								/>	
							</div>
							<h3 id={`group-${i}-title`} class="text-ecsess-50 text-2xl font-bold">
								{group.name}
							</h3>
						</div>
						<!-- Action Buttons -->
						<div class="flex gap-2">
							<a
								href={group.website}
								target="_blank"
								rel="noopener noreferrer external"
								aria-label={`Visit ${group.name} website`}
								class="bg-ecsess-800 hover:bg-ecsess-500 flex h-10 w-10 items-center justify-center rounded-lg text-ecsess-100 hover:text-ecsess-50 shadow-md transition-all hover:shadow-lg active:scale-95"
							>
								<Globe class="h-5 w-5" strokeWidth={2.5} aria-hidden="true" focusable="false" />
							</a>
							{#if group.instagram}
								<a
									href={group.instagram}
									target="_blank"
									rel="noopener noreferrer external"
									aria-label={`Follow ${group.name} on Instagram`}
									class="bg-ecsess-800 hover:bg-ecsess-500 flex h-10 w-10 items-center justify-center rounded-lg text-ecsess-100 hover:text-ecsess-50 shadow-md transition-all hover:shadow-lg active:scale-95"
								>
									<Instagram class="h-5 w-5" strokeWidth={2.5} aria-hidden="true" focusable="false" />
								</a>
							{/if}
						</div>
					</div>

					<!-- Description -->
					<p class="text-ecsess-100 mb-6 flex-1 text-base leading-relaxed">
						{group.description}
					</p>

					<!-- Features -->
					<ul class="mb-6 space-y-2" role="list">
						{#each group.features as feature (feature)}
							<li class="flex items-center gap-2 pl-3">
								<div class="bg-ecsess-500 h-1.5 w-1.5 rounded-full" aria-hidden="true"></div>
								<span class="text-ecsess-100 text-base font-semibold">
									{feature}
								</span>
							</li>
						{/each}
					</ul>
				</div>
			</article>
		{/each}
	</div>

	<!-- Bottom CTA -->
	<div class="mt-12 text-center">
		<p class="text-ecsess-300 text-sm">
			Want to get involved? Visit their websites and social media pages to learn about upcoming events and how to join!
		</p>
	</div>
</div>
