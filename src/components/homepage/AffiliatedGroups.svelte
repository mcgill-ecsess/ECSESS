<script lang="ts">
	import { Globe, Instagram, Wrench, Users, CodeXml, Cpu } from '@lucide/svelte';
	import Button from 'components/Button.svelte';

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
		<h2 id="affiliated-clubs-title" class="text-base-content mb-2 text-5xl font-bold">
			Subcommittees & Affiliated Groups
		</h2>
		<p class="text-base-content mx-auto max-w-2xl text-lg leading-relaxed">
			Explore opportunities to enhance your skills, build innovative projects, and connect with the
			engineering community through our subcommittees and affiliated groups.
		</p>
	</div>

	<!-- Clubs Grid: 2x2 on large screens -->
	<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
		{#each groups as group, i (group.name)}
			{@const Icon = group.icon}
			<article
				class="bg-primary-background border-primary-soft flex flex-col overflow-hidden rounded-lg border text-left"
				aria-labelledby={`group-${i}-title`}
			>
				<div class="flex flex-1 flex-col p-7 md:p-8">
					<!-- Header: icon + name -->
					<header class="mb-5 flex items-center justify-start gap-4">
						<div
							class="bg-primary-soft flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
						>
							<Icon
								class="text-primary-content size-7"
								strokeWidth={2.5}
								aria-hidden="true"
								focusable="false"
							/>
						</div>
						<h3 id={`group-${i}-title`} class="text-primary-content text-2xl font-bold">
							{group.name}
						</h3>
					</header>

					<!-- Description -->
					<p class="text-base-content mb-5 text-lg leading-relaxed">
						{group.description}
					</p>

					<!-- Features -->
					<ul class="mb-5 list-none space-y-2 ps-0 text-lg" role="list">
						{#each group.features as feature (feature)}
							<li class="flex items-center gap-2">
								<span class="bg-primary h-1.5 w-1.5 shrink-0 rounded-full" aria-hidden="true"
								></span>
								<span class="text-base-content font-medium">{feature}</span>
							</li>
						{/each}
					</ul>

					<!-- Links -->
					<div class="border-primary-soft mt-auto flex flex-wrap items-center gap-3 border-t pt-5">
						{#if group.instagram}
							<Button
								href={group.instagram}
								external
								variant="secondary"
								size="md"
								class="inline-flex items-center gap-2"
								ariaLabel={`Follow ${group.name} on Instagram`}
							>
								<Instagram class="size-5" strokeWidth={2.5} aria-hidden="true" focusable="false" />
								<span>Instagram</span>
							</Button>
						{/if}
						{#if group.website}
							<Button
								href={group.website}
								external
								variant="secondary"
								size="md"
								class="inline-flex items-center gap-2"
								ariaLabel={`Visit ${group.name} website`}
							>
								<Globe class="size-5" strokeWidth={2.5} aria-hidden="true" focusable="false" />
								<span>Website</span>
							</Button>
						{/if}
					</div>
				</div>
			</article>
		{/each}
	</div>
</div>
