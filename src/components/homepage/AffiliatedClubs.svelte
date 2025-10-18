<script lang="ts">
	import { ExternalLink, Wrench, Zap, CodeXml } from '@lucide/svelte';

	// All icons from @lucide/svelte share the same component type; reuse one for typing
	type IconComponent = typeof Wrench;

	type Club = {
		name: string;
		description: string;
		website: string;
		icon: IconComponent;
		features: string[];
	};

	const clubs: Club[] = [
		{
			name: 'The Factory',
			description:
				'A hardware design lab run by students, for students. A dedicated space for developing personal projects, gaining experience with cutting-edge hardware, and fostering innovation.',
			website: 'https://factory.mcgilleus.ca/',
			icon: Wrench,
			features: ['Hardware Lab Space', '3D Printing', 'Equipment Rental', 'Hardware Workshops']
		},
		{
			name: 'IEEE McGill',
			description:
				'One of the largest IEEE student branches in Eastern Canada. Dedicated to professional development through networking, workshops, competitions, and industry connections.',
			website: 'https://ieee.mcgilleus.ca/',
			icon: Zap,
			features: ['Technical Talks', 'Arduino Workshops', 'IEEEXtreme Competition', 'Networking Events']
		},
		{
			name: 'CodeJam',
			description:
				"McGill Engineering's largest and longest-running hackathon. A 36-hour programming competition where students create innovative solutions to real-world problems.",
			website: 'https://codejam.mcgilleus.ca/',
			icon: CodeXml,
			features: ['Annual Hackathon', 'Industry Mentors', 'Networking Opportunities', "Big Prize Pool"]
		}
	];
</script>

<div class="container mx-auto px-4">
	<!-- Section Header -->
	<div class="mb-12 text-center">
		<h2
			id="affiliated-clubs-title"
			class="text-ecsess-800 dark:text-ecsess-100 mb-4 text-4xl font-bold md:text-5xl"
		>
			Affiliated Clubs & Labs
		</h2>
		<p class="text-ecsess-700 dark:text-ecsess-200 mx-auto max-w-2xl text-lg">
			Explore opportunities to enhance your skills, build innovative projects, and connect with the
			engineering community through our affiliated organizations.
		</p>
	</div>

	<!-- Clubs Grid -->
	<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each clubs as club, i (club.name)}
			{@const Icon = club.icon}
			<article
				class="group bg-ecsess-950 relative flex flex-col overflow-hidden rounded-2xl shadow-ecsess-800 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
				aria-labelledby={`club-${i}-title`}
			>
				<!-- Decorative gradient bar -->
				<div class="from-ecsess-400 via-ecsess-500 to-ecsess-600 h-2 bg-gradient-to-r"></div>

				<div class="flex flex-1 flex-col p-6">
					<!-- Icon and Name -->
					<div class="mb-4 flex items-center gap-4">
						<div
							class="group-hover:bg-ecsess-500 bg-ecsess-800 flex h-14 w-14 items-center justify-center rounded-xl shadow-md transition-all duration-300 group-hover:scale-110"
						>
							<Icon
								class="text-ecsess-600 dark:text-ecsess-300 h-7 w-7 transition-colors group-hover:text-white"
								strokeWidth={2.5}
								aria-hidden="true"
								focusable="false"
							/>
						</div>
						<h3
							id={`club-${i}-title`}
							class="text-ecsess-800 dark:text-ecsess-50 text-2xl font-bold"
						>
							{club.name}
						</h3>
					</div>

					<!-- Description -->
					<p class="text-ecsess-700 dark:text-ecsess-200 mb-6 flex-1 text-base leading-relaxed">
						{club.description}
					</p>

					<!-- Features -->
					<ul class="mb-6 space-y-2" role="list">
						{#each club.features as feature (feature)}
							<li class="flex items-center gap-2 pl-3">
								<div class="bg-ecsess-500 h-1.5 w-1.5 rounded-full" aria-hidden="true"></div>
								<span class="text-ecsess-600 dark:text-ecsess-300 text-base font-semibold">
									{feature}
								</span>
							</li>
						{/each}
					</ul>

					<!-- Visit Button -->
					<a
						href={club.website}
						target="_blank"
						rel="noopener noreferrer external"
						aria-label={`Visit ${club.name} website`}
						class="bg-ecsess-500 hover:bg-ecsess-600 dark:bg-ecsess-400 dark:hover:bg-ecsess-500 flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg active:scale-95"
					>
						Visit Website
						<ExternalLink class="h-4 w-4" strokeWidth={2.5} aria-hidden="true" focusable="false" />
					</a>
				</div>
			</article>
		{/each}
	</div>

	<!-- Bottom CTA -->
	<div class="mt-12 text-center">
		<p class="text-ecsess-600 dark:text-ecsess-300 text-sm">
			Want to get involved? Visit their websites to learn about upcoming events and how to join!
		</p>
	</div>
</div>
