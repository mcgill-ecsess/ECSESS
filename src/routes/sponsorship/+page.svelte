<script lang="ts">
	import Section from 'components/layout/Section.svelte';
	import SeoMetaTags from 'components/layout/SeoMetaTags.svelte';
	import {
		Award,
		Building2,
		Users,
		GraduationCap,
		TrendingUp,
		Rocket,
		Megaphone,
		Handshake
	} from '@lucide/svelte';
	import Button from 'components/Button.svelte';
	import Link from 'components/Link.svelte';
	import demographicImage from '/src/assets/demographic.png';
	// load company logos from src/assets/company_logo — alphabetical order
	// use Vite glob to return URLs; duplicate array for seamless marquee
	const _logoModules = import.meta.glob('/src/assets/company_logo/*.{png,jpg,jpeg,svg}', {
		eager: true,
		query: '?url',
		import: 'default'
	});
	const _logos = Object.keys(_logoModules).map((p) => {
		const filename = p.split('/').pop() || '';
		const nameOnly = filename.replace(/\.[^.]+$/, '');
		// @ts-ignore
		return { name: nameOnly.toLowerCase(), url: _logoModules[p] };
	});
	_logos.sort((a, b) => a.name.localeCompare(b.name));
	const logos = _logos.map((l) => l.url);
	const loopLogos = [...logos, ...logos];

	const externalEvents = [
		{
			title: 'ECSESScapade',
			month: 'September',
			location: 'Ottawa',
			students: '~50 Students',
			description:
				'Our LARGEST industry trip: 3-day trip branding · Merchandise bags · Exclusive CV pool',
			image: '/src/assets/events/ecsesscapade.png'
		},
		{
			title: 'Speed Networking',
			month: 'November',
			location: 'On Campus',
			students: '~100 Students',
			description:
				'Timed networking sessions with students: 40+ mini-interviews / rep · CV bundle · Speech slot',
			image: '/src/assets/events/speednetworking.png'
		},
		{
			title: 'ECC Internship Panel',
			month: 'January',
			location: 'On Campus',
			students: '~30 Students',
			description: 'Early-talent Q&A · Panel branding · Targeted interns',
			image: '/src/assets/events/eccinternshippanel.png'
		},
		{
			title: 'Company Crawl',
			month: 'October',
			location: 'Montreal',
			students: '~30 Students',
			description: 'Host on-site tour · 30 top students · Showcase culture · Exclusive CV pool',
			image: '/src/assets/events/companycrawl.png'
		},
		{
			title: 'Wine and Cheese',
			month: 'February',
			location: 'Montreal',
			students: '~100 Students',
			description: 'Casual mingling · Branded table · CV access · Speech slot',
			image: '/src/assets/events/wineandcheese.png'
		},
		{
			title: 'Themed Speaker Panel',
			month: 'March',
			location: 'On Campus',
			students: '~70 Students',
			description:
				'Thought-leadership talk · Demo spotlight · Recruit niche talent (Theme example: Product Management)',
			image: '/src/assets/events/themedspeakerpanel.png'
		}
	];
</script>

<SeoMetaTags
	title="Sponsorship — ECSESS"
	description="Support ECSESS by sponsoring our community, events, and student initiatives at McGill."
	canonical="https://ecsess.mcgilleus.ca/sponsorship"
/>

<Section
	from="from-ecsess-black"
	to="to-ecsess-black"
	via="via-ecsess-600"
	direction="to-b"
	contentStart={true}
>
	<div class="w-full max-w-6xl px-4 py-6 text-center">
		<h1 class="text-ecsess-50 mb-0 text-5xl font-bold text-balance md:text-6xl lg:text-7xl">
			SPONSORSHIP
		</h1>

		<div class="relative mx-auto grid w-full gap-8 overflow-hidden rounded-[2rem] p-8 text-left">
			<div class="text-ecsess-100 space-y-6 text-center">
				<div class="mx-auto max-w-2xl space-y-4 bg-transparent p-8">
					<div class="mb-5 flex items-center justify-center gap-3">
						<span class="bg-ecsess-800 h-px flex-1"></span>
						<h2
							class="text-ecsess-300 text-2xl font-bold tracking-[0.2em] uppercase md:text-3xl lg:text-3xl"
						>
							What is ECSESS?
						</h2>
						<span class="bg-ecsess-800 h-px flex-1"></span>
					</div>
					<h2 class="text-ecsess-50 mb-6 text-center text-2xl font-bold md:text-2xl">
						Our community / audience
					</h2>
					<div class="grid items-start justify-items-center gap-8 lg:grid-cols-[1fr_1fr]">
						<div
							class="flex h-full w-full max-w-[30rem] flex-col items-center justify-start gap-0 bg-transparent p-0"
						>
							<img
								src={demographicImage}
								alt="Demographics visual"
								class="mt-0 max-h-[400px] w-full object-contain p-0"
							/>
							<h3 class="text-ecsess-50 mt-0 text-xl font-bold">Student Demographics</h3>
						</div>
						<div class="grid h-full w-full max-w-[30rem] gap-3 text-left">
							<div class="grid w-full grid-cols-[auto_1fr] items-center gap-4 py-3">
								<div class="flex items-center justify-center">
									<Award class="text-ecsess-50" size="32" />
								</div>
								<p class="text-ecsess-50 font-semibold">3rd in Canada for Engineering</p>
							</div>
							<div class="grid w-full grid-cols-[auto_1fr] items-center gap-4 py-3">
								<div class="flex items-center justify-center">
									<GraduationCap class="text-ecsess-50" size="32" />
								</div>
								<p class="text-ecsess-50 font-semibold">
									Electrical, Computer, Software Engineering (Co-op)
								</p>
							</div>
							<div class="grid w-full grid-cols-[auto_1fr] items-center gap-4 py-3">
								<div class="flex items-center justify-center">
									<Building2 class="text-ecsess-50" size="32" />
								</div>
								<p class="text-ecsess-50 font-semibold">40 Professors, 20 Staff Members</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Company logos marquee (alphabetical) -->
		<div class="w-full max-w-6xl px-4">
			<h2 class="text-ecsess-50 mb-4 text-center text-2xl font-bold md:text-3xl">
				WHERE OUR GRADS GO?
			</h2>
		</div>
		{#if logos.length}
			<div class="mt-6 mb-6 w-full overflow-hidden">
				<div class="marquee">
					<div class="marquee-track">
						{#each loopLogos as src, i}
							<div class="marquee-item" style="--i:{i}">
								<img {src} alt="company logo" class="h-12 object-contain" />
							</div>
						{/each}
					</div>
				</div>
			</div>
		{/if}

		<div class="mt-8 flex justify-center">
			<Link href="/r/sponsor">
				<Button>See Package</Button>
			</Link>
		</div>

		<div class="w-full max-w-6xl px-4 py-12 text-center">
			<h2 class="text-ecsess-50 mb-4 text-3xl font-bold md:text-4xl">External Events</h2>
			<div class="grid gap-6 md:grid-cols-2">
				{#each externalEvents as event}
					<div
						class="border-ecsess-700 bg-ecsess-900/70 rounded-3xl border p-6 text-left shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm"
					>
						<div class="grid items-center gap-6 lg:grid-cols-[1fr_16rem]">
							<div>
								<h3 class="text-ecsess-50 text-xl font-bold">{event.title}</h3>
								<p class="text-ecsess-400 text-sm">{event.location} · {event.students}</p>
								<p class="text-ecsess-300 mt-4">{event.description}</p>
							</div>
							<div class="bg-ecsess-800 h-44 w-full overflow-hidden rounded-3xl sm:h-52">
								<img
									src={event.image}
									alt={event.title + ' image'}
									class="h-full w-full object-cover"
								/>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<style>
			.marquee {
				width: 100%;
			}
			.marquee-track {
				display: flex;
				gap: 1.5rem;
				align-items: center;
				width: max-content;
				animation: marquee 40s linear infinite;
			}
			.marquee-item {
				display: flex;
				align-items: center;
			}
			@keyframes marquee {
				from {
					transform: translateX(0);
				}
				to {
					transform: translateX(-50%);
				}
			}
		</style>

		<!-- Why sponsor us section -->
		<div class="w-full max-w-6xl px-4 py-12 text-center">
			<h2 class="text-ecsess-50 mb-8 text-3xl font-bold md:text-4xl">Why sponsor us?</h2>

			<hr class="bg-ecsess-100/30 my-6 h-px w-full border-0" />

			<div class="grid gap-8 sm:grid-cols-3">
				<div class="border-0 bg-transparent p-0">
					<div class="mb-2 flex justify-center">
						<Users class="text-ecsess-50" size="48" />
					</div>
					<p class="text-ecsess-50 text-center font-semibold whitespace-pre-line">
						40+ company reps across ECSESS events in 24-25
					</p>
				</div>

				<div class="border-0 bg-transparent p-0">
					<div class="mb-2 flex justify-center">
						<GraduationCap class="text-ecsess-50" size="48" />
					</div>
					<p class="text-ecsess-50 text-center font-semibold whitespace-pre-line">
						100+ students at our largest external events
					</p>
				</div>

				<div class="border-0 bg-transparent p-0">
					<div class="mb-2 flex justify-center">
						<TrendingUp class="text-ecsess-50" size="48" />
					</div>
					<p class="text-ecsess-50 text-center font-semibold whitespace-pre-line">
						20000+ monthly social media impressions
					</p>
				</div>
			</div>

			<hr class="bg-ecsess-100/30 my-6 h-px w-full border-0" />
		</div>

		<!-- Bordered feature columns -->
		<div class="w-full max-w-6xl px-4 py-12 text-center">
			<div class="grid gap-6 sm:grid-cols-3">
				<div class="bg-ecsess-900/40 border-ecsess-700 rounded-2xl border p-6">
					<div class="flex flex-col items-center">
						<h3 class="text-ecsess-50 mb-2 text-center font-bold">RECRUIT FASTER</h3>
						<Rocket class="text-ecsess-100 mb-4" size="48" />
					</div>
					<ul class="text-ecsess-300 mt-4 list-inside list-disc space-y-2 text-left">
						<li>
							Speed Networking = <span class="text-ecsess-50 font-semibold"
								>40+ mini-interviews</span
							> per rep
						</li>
						<li>
							<span class="text-ecsess-50 font-semibold">Résumé bundles</span> delivered post-events
						</li>
						<li>Priority access to internship-seeking students</li>
						<li>
							Announce opportunities on our <span class="text-ecsess-50 font-semibold"
								>Newsletter</span
							>
						</li>
					</ul>
				</div>

				<div class="bg-ecsess-900/40 border-ecsess-700 rounded-2xl border p-6">
					<div class="flex flex-col items-center">
						<h3 class="text-ecsess-50 mb-2 text-center font-bold">AMPLIFY YOUR BRAND</h3>
						<Megaphone class="text-ecsess-100 mb-4" size="48" />
					</div>
					<ul class="text-ecsess-300 mt-4 list-inside list-disc space-y-2 text-left">
						<li>
							Logo on <span class="text-ecsess-50 font-semibold">15+ event materials</span>, slides,
							and socials
						</li>
						<li>
							<span class="text-ecsess-50 font-semibold">Product placement</span> options at Banquets,
							Wine & Cheese, and Speed Networking
						</li>
						<li>Highlights, signage, and post-event thank-you</li>
					</ul>
				</div>

				<div class="bg-ecsess-900/40 border-ecsess-700 rounded-2xl border p-6">
					<div class="flex flex-col items-center">
						<h3 class="text-ecsess-50 mb-2 text-center font-bold">BUILD RELATIONSHIPS</h3>
						<Handshake class="text-ecsess-100 mb-4" size="48" />
					</div>
					<ul class="text-ecsess-300 mt-4 list-inside list-disc space-y-2 text-left">
						<li>
							Host <span class="text-ecsess-50 font-semibold">company tours</span> (Company Crawl, ECSESScapade)
						</li>
						<li>
							Present at <span class="text-ecsess-50 font-semibold"
								>technical panels, speaker series</span
							>, or sponsor awards
						</li>
						<li>Pull targeted CVs, all year, anytime</li>
					</ul>
				</div>
			</div>

			<p class="text-ecsess-300 mx-auto mt-8 max-w-3xl">
				Whether you're looking to host one event or support our entire year, ECSESS makes it easy.<br
				/>All logistics are handled by our council. Just show up — we'll bring the students.
			</p>
		</div>
	</div>
</Section>
