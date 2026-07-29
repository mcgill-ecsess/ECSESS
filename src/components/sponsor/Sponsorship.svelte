<script lang="ts">
  import Section from 'components/layout/Section.svelte';
  import SeoMetaTags from 'components/layout/SeoMetaTags.svelte';
  import { Award, Building2, Users, GraduationCap, TrendingUp, Rocket, Megaphone, Handshake } from '@lucide/svelte';
  import Button from 'components/Button.svelte';
  import Link from 'components/Link.svelte';
  import demographicImage from '/src/assets/demographic.png';
  // load company logos from src/assets/company_logo — alphabetical order
  // use Vite glob to return URLs; duplicate array for seamless marquee
  const _logoModules = import.meta.glob('/src/assets/company_logo/*.{png,jpg,jpeg,svg}', { eager: true, query: '?url', import: 'default' });
  const _logos = Object.keys(_logoModules).map((p) => {
    const filename = p.split('/').pop() || '';
    const nameOnly = filename.replace(/\.[^.]+$/, '');
    // @ts-ignore
    return { name: nameOnly.toLowerCase(), url: _logoModules[p] };
  });
  _logos.sort((a, b) => a.name.localeCompare(b.name));
  const logos = _logos.map((l) => l.url);
  const loopLogos = [...logos, ...logos];
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
    <h1 class="text-ecsess-50 mb-0 text-5xl font-bold text-balance md:text-6xl lg:text-7xl">SPONSORSHIP</h1>

    <div class="relative mx-auto grid w-full gap-8 overflow-hidden rounded-[2rem] p-8 text-left">
      <div class="space-y-6 text-center text-ecsess-100">
        <div class="space-y-4 bg-transparent p-8 mx-auto max-w-2xl">
          <div class="mb-5 flex items-center gap-3 justify-center">
            <span class="bg-ecsess-800 h-px flex-1"></span>
            <h2 class="text-ecsess-300 text-2xl md:text-3xl lg:text-3xl font-bold tracking-[0.2em] uppercase">
              What is ECSESS?
            </h2>
            <span class="bg-ecsess-800 h-px flex-1"></span>
          </div>
          <h2 class="text-ecsess-50 mb-6 text-2xl font-bold md:text-2xl text-center">Our community / audience</h2>
          <div class="grid gap-8 lg:grid-cols-[1fr_1fr] items-start justify-items-center">
            <div class="flex h-full w-full max-w-[30rem] flex-col items-center justify-start gap-0 bg-transparent p-0">
              <img src={demographicImage} alt="Demographics visual" class="max-h-[400px] w-full object-contain p-0 mt-0" />
              <h3 class="text-ecsess-50 text-xl font-bold mt-0">Student Demographics</h3>
            </div>
            <div class="grid h-full w-full max-w-[30rem] gap-3 text-left">
              <div class="grid grid-cols-[auto_1fr] items-center gap-4 py-3 w-full">
                <div class="flex items-center justify-center">
                  <Award class="text-ecsess-50" size="32" />
                </div>
                <p class="text-ecsess-50 font-semibold">3rd in Canada for Engineering</p>
              </div>
              <div class="grid grid-cols-[auto_1fr] items-center gap-4 py-3 w-full">
                <div class="flex items-center justify-center">
                  <GraduationCap class="text-ecsess-50" size="32" />
                </div>
                <p class="text-ecsess-50 font-semibold">Electrical, Computer, Software Engineering (Co-op)</p>
              </div>
              <div class="grid grid-cols-[auto_1fr] items-center gap-4 py-3 w-full">
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
      <h2 class="text-ecsess-50 mb-4 text-2xl font-bold md:text-3xl text-center">WHERE OUR GRADS GO?</h2>
    </div>
    {#if logos.length}
      <div class="mt-6 mb-6 w-full overflow-hidden">
        <div class="marquee">
          <div class="marquee-track">
            {#each loopLogos as src, i}
              <div class="marquee-item" style="--i:{i}">
                <img src={src} alt="company logo" class="h-12 object-contain" />
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

    <style>
      .marquee { width: 100%; }
      .marquee-track { display:flex; gap:1.5rem; align-items:center; width:max-content; animation: marquee linear infinite; animation-duration: 40s; animation-play-state: running; }
      .marquee-item { display:flex; align-items:center; }
      @keyframes marquee {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }
    </style>

    <!-- Why sponsor us section -->
    <div class="w-full max-w-6xl px-4 py-12 text-center">
      <h2 class="text-ecsess-50 mb-8 text-3xl font-bold md:text-4xl">Why sponsor us?</h2>

      <hr class="w-full border-0 h-px bg-ecsess-100/30 my-6" />

      <div class="grid gap-8 sm:grid-cols-3">
        <div class="bg-transparent border-0 p-0">
          <div class="flex justify-center mb-2">
            <Users class="text-ecsess-50" size="48" />
          </div>
          <p class="whitespace-pre-line text-ecsess-50 text-center font-semibold">40+ company reps
across ECSESS
events in 24-25</p>
        </div>

        <div class="bg-transparent border-0 p-0">
          <div class="flex justify-center mb-2">
            <GraduationCap class="text-ecsess-50" size="48" />
          </div>
          <p class="whitespace-pre-line text-ecsess-50 text-center font-semibold">100+ students at our
largest external events</p>
        </div>

        <div class="bg-transparent border-0 p-0">
          <div class="flex justify-center mb-2">
            <TrendingUp class="text-ecsess-50" size="48" />
          </div>
          <p class="whitespace-pre-line text-ecsess-50 text-center font-semibold">20000+ monthly
social media
impressions</p>
        </div>
      </div>

      <hr class="w-full border-0 h-px bg-ecsess-100/30 my-6" />
    </div>

    <!-- Bordered feature columns -->
    <div class="w-full max-w-6xl px-4 py-12 text-center">
      <div class="grid gap-6 sm:grid-cols-3">
        <div class="rounded-2xl bg-ecsess-900/40 border border-ecsess-700 p-6">
          <div class="flex flex-col items-center">
            <h3 class="text-ecsess-50 font-bold mb-2 text-center">RECRUIT FASTER</h3>
            <Rocket class="text-ecsess-100 mb-4" size="48" />
          </div>
          <ul class="list-inside list-disc space-y-2 text-ecsess-300 mt-4 text-left">
            <li>Speed Networking = <span class="text-ecsess-50 font-semibold">40+ mini-interviews</span> per rep</li>
            <li><span class="text-ecsess-50 font-semibold">Résumé bundles</span> delivered post-events</li>
            <li>Priority access to internship-seeking students</li>
            <li>Announce opportunities on our <span class="text-ecsess-50 font-semibold">Newsletter</span></li>
          </ul>
        </div>

        <div class="rounded-2xl bg-ecsess-900/40 border border-ecsess-700 p-6">
          <div class="flex flex-col items-center">
            <h3 class="text-ecsess-50 font-bold mb-2 text-center">AMPLIFY YOUR BRAND</h3>
            <Megaphone class="text-ecsess-100 mb-4" size="48" />
          </div>
          <ul class="list-inside list-disc space-y-2 text-ecsess-300 mt-4 text-left">
            <li>Logo on <span class="text-ecsess-50 font-semibold">15+ event materials</span>, slides, and socials</li>
            <li><span class="text-ecsess-50 font-semibold">Product placement</span> options at Banquets, Wine & Cheese, and Speed Networking</li>
            <li>Highlights, signage, and post-event thank-you</li>
          </ul>
        </div>

        <div class="rounded-2xl bg-ecsess-900/40 border border-ecsess-700 p-6">
          <div class="flex flex-col items-center">
            <h3 class="text-ecsess-50 font-bold mb-2 text-center">BUILD RELATIONSHIPS</h3>
            <Handshake class="text-ecsess-100 mb-4" size="48" />
          </div>
          <ul class="list-inside list-disc space-y-2 text-ecsess-300 mt-4 text-left">
            <li>Host <span class="text-ecsess-50 font-semibold">company tours</span> (Company Crawl, ECSESScapade)</li>
            <li>Present at <span class="text-ecsess-50 font-semibold">technical panels, speaker series</span>, or sponsor awards</li>
            <li>Pull targeted CVs, all year, anytime</li>
          </ul>
        </div>
      </div>

      <p class="mt-8 text-ecsess-300 max-w-3xl mx-auto">Whether you're looking to host one event or support our entire year, ECSESS makes it easy.<br />All logistics are handled by our council. Just show up — we'll bring the students.</p>
    </div>
  </div>
</Section>
