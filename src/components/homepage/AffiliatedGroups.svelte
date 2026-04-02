<script lang="ts">
	type Group = {
		name: string;
		description: string;
		website: string;
		instagram?: string;
		icon: string;
		features: string[];
	};

	const groups: Group[] = [
		{
			name: 'Code.Jam()',
			description:
				"McGill Engineering's largest annual hackathon, a 36-hour programming competition where students create innovative projects!",
			website: 'https://codejam.mcgilleus.ca/',
			instagram: 'https://www.instagram.com/mcgillcodejam/',
			icon: '💻',
			features: ['Biggest Hackathon in Engineering', 'Great prizes', 'Networking opportunities']
		},
		{
			name: 'The Factory',
			description:
				'A student-run lab space for developing personal projects, gaining experience with cutting-edge hardware, and fostering innovation.',
			website: 'https://factory.mcgilleus.ca/',
			instagram: 'https://www.instagram.com/thefactory_mcgill/',
			icon: '🔧',
			features: ['Student-run Lab Space', '3D Printing', 'Hardware Workshops']
		},
		{
			name: 'ECSESSBits',
			description:
				'First Year Council of the McGill Electrical, Computer, Software Engineering Student Society.',
			website: '',
			instagram: 'https://www.instagram.com/ecsessbits/',
			icon: '🎓',
			features: ['First Year Council', 'Fun Events', 'Study Sessions']
		},
		{
			name: 'IEEE McGill',
			description:
				'One of the largest IEEE student branches in Eastern Canada, offering professional development, networking, and industry connections.',
			website: 'https://ieee.mcgilleus.ca/',
			instagram: 'https://www.instagram.com/ieeemcgill/',
			icon: '⚡',
			features: ['Technical Talks', 'Arduino Workshops', 'Networking Events']
		}
	];
</script>

<div>
	<!-- Section header -->
	<div style="margin-bottom: 12px; padding-bottom: 8px; border-bottom: 2px solid #808080;">
		<h2 id="affiliated-clubs-title" style="font-size: 15px; font-weight: bold; color: #000080; margin: 0 0 4px 0;">
			Subcommittees &amp; Affiliated Groups
		</h2>
		<p style="font-size: 11px; color: #444; margin: 0;">
			Explore opportunities to enhance your skills and connect with the engineering community.
		</p>
	</div>

	<!-- Win2k icon-view style grid (like My Computer / Windows Explorer) -->
	<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
		{#each groups as group, i (group.name)}
			<!-- Each group is a Win2k window with its own title bar -->
			<div class="win-window" style="margin: 0;" aria-labelledby={`group-${i}-title`}>
				<!-- Mini title bar -->
				<div
					class="win-titlebar"
					style="font-size: 11px; padding: 2px 5px;"
				>
					<span style="font-size: 13px;">{group.icon}</span>
					<span id={`group-${i}-title`} class="flex-1">{group.name}</span>
					<button class="win-titlebar-btn" style="font-size:8px;">✕</button>
				</div>

				<!-- Content -->
				<div style="padding: 10px; background: #ffffff; font-size: 12px;">
					<p style="color: #333; line-height: 1.5; margin-bottom: 8px;">{group.description}</p>

					<!-- Feature list as Win2k checkboxes -->
					<ul style="list-style: none; padding: 0; margin: 0 0 8px 0;">
						{#each group.features as feature}
							<li style="display: flex; align-items: center; gap: 4px; margin-bottom: 2px; font-size: 11px;">
								<span style="color: #0a246a; font-size: 12px;">✔</span>
								<span>{feature}</span>
							</li>
						{/each}
					</ul>

					<!-- Link buttons -->
					<div style="display: flex; gap: 4px; flex-wrap: wrap; padding-top: 6px; border-top: 1px solid #d4d0c8;">
						{#if group.instagram}
							<a
								href={group.instagram}
								target="_blank"
								rel="noopener noreferrer external"
								class="win-btn"
								style="font-size: 10px; min-width: auto; padding: 2px 6px; text-decoration: none; color: #000;"
							>
								📸 Instagram
							</a>
						{/if}
						{#if group.website}
							<a
								href={group.website}
								target="_blank"
								rel="noopener noreferrer external"
								class="win-btn"
								style="font-size: 10px; min-width: auto; padding: 2px 6px; text-decoration: none; color: #000;"
							>
								🌐 Website
							</a>
						{/if}
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
