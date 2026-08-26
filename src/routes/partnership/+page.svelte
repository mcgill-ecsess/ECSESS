<script lang="ts">
	import Section from '$lib/components/layout/Section.svelte';
	import SeoMetaTags from '$lib/components/layout/SeoMetaTags.svelte';
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
	import Button from '$lib/components/Button.svelte';
	import Link from '$lib/components/Link.svelte';
	import StudentDemographicsChart from './components/StudentDemographicsChart.svelte';
	import { getCompanyLogos, getEventImageUrl } from '$lib/assets';

	let { data } = $props();

	const logos = getCompanyLogos();
	const loopLogos = [...logos, ...logos];

	const externalEvents = [
		{
			title: 'ECSESScapade',
			location: 'Ottawa',
			students: '~50 Students',
			description:
				'Our LARGEST industry trip: 3-day trip branding · Merchandise bags · Exclusive CV pool',
			image: getEventImageUrl('ecsesscapade')
		},
		{
			title: 'Speed Networking',
			location: 'On Campus',
			students: '~100 Students',
			description:
				'Timed networking sessions with students: 40+ mini-interviews / rep · CV bundle · Speech slot',
			image: getEventImageUrl('speednetworking')
		},
		{
			title: 'ECC Internship Panel',
			location: 'On Campus',
			students: '~30 Students',
			description: 'Early-talent Q&A · Panel branding · Targeted interns',
			image: getEventImageUrl('eccinternshippanel')
		},
		{
			title: 'Company Crawl',
			location: 'Montreal',
			students: '~30 Students',
			description: 'Host on-site tour · 30 top students · Showcase culture · Exclusive CV pool',
			image: getEventImageUrl('companycrawl')
		},
		{
			title: 'Wine and Cheese',
			location: 'Montreal',
			students: '~100 Students',
			description: 'Casual mingling · Branded table · CV access · Speech slot',
			image: getEventImageUrl('wineandcheese')
		},
		{
			title: 'Themed Speaker Panel',
			location: 'On Campus',
			students: '~70 Students',
			description:
				'Thought-leadership talk · Demo spotlight · Recruit niche talent (Theme example: Product Management)',
			image: getEventImageUrl('themedspeakerpanel')
		}
	];
</script>

<SeoMetaTags
	title="Partnership — ECSESS"
	description="Support ECSESS through partnership with our community, events, and student initiatives at McGill."
	canonical={data.canonical}
/>

<Section contentStart={true}>
	<div class="w-full max-w-6xl px-4 py-6 text-center sm:px-6">
		<h1 class="page-title text-ecsess-50 text-balance">Partnership with ECSESS</h1>
		<div class="flex justify-center">
			<Link href="/r/partnership" external>
				<Button class="text-xl">ECSESS Partnership Package</Button>
			</Link>
		</div>
		<div
			class="relative mx-auto mt-6 w-full rounded-[2rem] px-2 py-6 text-left sm:px-4 sm:py-8 md:px-6"
		>
			<div class="text-ecsess-100 space-y-6 text-center">
				<div class="mx-auto w-full max-w-6xl space-y-6">
					<hr class="bg-ecsess-100/30 h-px w-full border-0" />
					<h2 class="text-ecsess-50 text-xl font-bold sm:text-2xl">Our community / audience</h2>
					<div
						class="mx-auto grid w-full max-w-5xl items-center justify-items-center gap-10 md:grid-cols-2 md:gap-8 lg:gap-12"
					>
						<div
							class="flex w-full min-w-0 flex-col items-center justify-center overflow-visible px-2 sm:px-4"
						>
							<StudentDemographicsChart />
						</div>
						<div
							class="grid w-full max-w-md min-w-0 gap-2 text-left md:max-w-none md:justify-self-center"
						>
							<div
								class="grid w-full grid-cols-[auto_1fr] items-start gap-3 py-3 sm:items-center sm:gap-4"
							>
								<div class="flex shrink-0 items-center justify-center pt-0.5 sm:pt-0">
									<Award class="text-ecsess-50" size="32" />
								</div>
								<p class="text-ecsess-50 text-sm font-semibold sm:text-base">
									3rd in Canada for Engineering
								</p>
							</div>
							<div
								class="grid w-full grid-cols-[auto_1fr] items-start gap-3 py-3 sm:items-center sm:gap-4"
							>
								<div class="flex shrink-0 items-center justify-center pt-0.5 sm:pt-0">
									<GraduationCap class="text-ecsess-50" size="32" />
								</div>
								<p class="text-ecsess-50 text-sm font-semibold sm:text-base">
									Electrical, Computer, and Software Engineering (Co-op)
								</p>
							</div>
							<div
								class="grid w-full grid-cols-[auto_1fr] items-start gap-3 py-3 sm:items-center sm:gap-4"
							>
								<div class="flex shrink-0 items-center justify-center pt-0.5 sm:pt-0">
									<Building2 class="text-ecsess-50" size="32" />
								</div>
								<p class="text-ecsess-50 text-sm font-semibold sm:text-base">
									40 Professors, 20 Staff Members
								</p>
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

		<div class="w-full max-w-6xl px-4 py-10 text-center sm:px-6 sm:py-12">
			<h2 class="text-ecsess-50 mb-6 text-2xl font-bold sm:text-3xl md:text-4xl">
				External Events
			</h2>
			<div class="grid gap-5 sm:gap-6 md:grid-cols-2">
				{#each externalEvents as event}
					<div
						class="border-ecsess-700 bg-ecsess-900/70 rounded-3xl border p-5 text-left shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-6"
					>
						<div class="grid items-center gap-5 sm:gap-6 lg:grid-cols-[1fr_minmax(0,16rem)]">
							<div class="order-2 lg:order-1">
								<h3 class="text-ecsess-50 text-lg font-bold sm:text-xl">{event.title}</h3>
								<p class="text-ecsess-400 text-sm">{event.location} · {event.students}</p>
								<p class="text-ecsess-300 mt-3 text-sm sm:mt-4 sm:text-base">{event.description}</p>
							</div>
							<div
								class="bg-ecsess-800 order-1 h-40 w-full overflow-hidden rounded-3xl sm:h-44 lg:order-2 lg:h-52"
							>
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

		<!-- Why partner with us section -->
		<div class="w-full max-w-6xl px-4 py-10 text-center sm:px-6 sm:py-12">
			<h2 class="text-ecsess-50 mb-6 text-2xl font-bold sm:mb-8 sm:text-3xl md:text-4xl">
				Why partner with us?
			</h2>

			<hr class="bg-ecsess-100/30 my-6 h-px w-full border-0" />

			<div class="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
				<div class="border-0 bg-transparent p-0">
					<div class="mb-2 flex justify-center">
						<Users class="text-ecsess-50" size="48" />
					</div>
					<p class="text-ecsess-50 mx-auto max-w-xs text-center text-sm font-semibold sm:text-base">
						40+ company reps across ECSESS events in 24-25
					</p>
				</div>

				<div class="border-0 bg-transparent p-0">
					<div class="mb-2 flex justify-center">
						<GraduationCap class="text-ecsess-50" size="48" />
					</div>
					<p class="text-ecsess-50 mx-auto max-w-xs text-center text-sm font-semibold sm:text-base">
						100+ students at our largest external events
					</p>
				</div>

				<div class="border-0 bg-transparent p-0 sm:col-span-2 md:col-span-1">
					<div class="mb-2 flex justify-center">
						<TrendingUp class="text-ecsess-50" size="48" />
					</div>
					<p class="text-ecsess-50 mx-auto max-w-xs text-center text-sm font-semibold sm:text-base">
						20000+ monthly social media impressions
					</p>
				</div>
			</div>

			<hr class="bg-ecsess-100/30 my-6 h-px w-full border-0" />
		</div>

		<!-- Bordered feature columns -->
		<div class="w-full max-w-6xl px-4 py-10 text-center sm:px-6 sm:py-12">
			<div class="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
				<div class="bg-ecsess-900/40 border-ecsess-700 rounded-2xl border p-5 sm:p-6 lg:col-span-1">
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

				<div class="bg-ecsess-900/40 border-ecsess-700 rounded-2xl border p-5 sm:p-6 lg:col-span-1">
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

				<div
					class="bg-ecsess-900/40 border-ecsess-700 rounded-2xl border p-5 sm:p-6 md:col-span-2 lg:col-span-1"
				>
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
							>, or partnership awards
						</li>
						<li>Pull targeted CVs, all year, anytime</li>
					</ul>
				</div>
			</div>

			<p class="text-ecsess-300 mx-auto mt-8 max-w-3xl px-2 text-sm sm:text-base">
				Whether you're looking to host one event or support our entire year, ECSESS makes it easy.<br
				/>All logistics are handled by our council. Just show up — we'll bring the students.
			</p>
		</div>
	</div>
</Section>
