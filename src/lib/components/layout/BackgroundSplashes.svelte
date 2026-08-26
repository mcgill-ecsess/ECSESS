<!--
	Fixed decorative SVG ink-splashes around the viewport.
	Uses ecsess palette tokens; sits behind page content.
-->
<svg
	class="pointer-events-none fixed inset-0 z-0 h-dvh w-dvw"
	viewBox="0 0 1440 900"
	preserveAspectRatio="xMidYMid slice"
	aria-hidden="true"
	xmlns="http://www.w3.org/2000/svg"
>
	<defs>
		<filter id="splash-soft" x="-25%" y="-25%" width="150%" height="150%">
			<feGaussianBlur in="SourceGraphic" stdDeviation="10" />
		</filter>
		<filter id="splash-soft-sm" x="-35%" y="-35%" width="170%" height="170%">
			<feGaussianBlur in="SourceGraphic" stdDeviation="4" />
		</filter>
	</defs>

	<!-- Top-left wash -->
	<path
		filter="url(#splash-soft)"
		fill="var(--color-ecsess-500)"
		opacity="0.72"
		d="M-80,-40 C40,20 120,-30 210,80 C280,170 160,210 60,250 C-40,290 -120,180 -140,80 C-155,10 -120,-60 -80,-40 Z"
	/>
	<path
		filter="url(#splash-soft-sm)"
		fill="var(--color-ecsess-300)"
		opacity="0.55"
		d="M180,40 C210,55 225,95 200,125 C175,150 140,130 135,95 C130,60 155,28 180,40 Z"
	/>

	<!-- Top-right wash -->
	<path
		filter="url(#splash-soft)"
		fill="var(--color-ecsess-450)"
		opacity="0.65"
		d="M1320,-60 C1480,-20 1520,120 1460,240 C1410,330 1280,300 1220,220 C1160,140 1200,20 1280,-20 C1300,-35 1305,-50 1320,-60 Z"
	/>
	<path
		filter="url(#splash-soft-sm)"
		fill="var(--color-ecsess-250)"
		opacity="0.5"
		d="M1180,90 C1225,70 1280,95 1270,145 C1260,190 1200,195 1175,160 C1155,130 1150,105 1180,90 Z"
	/>
	<circle
		filter="url(#splash-soft-sm)"
		cx="1365"
		cy="175"
		r="22"
		fill="var(--color-ecsess-350)"
		opacity="0.7"
	/>

	<!-- Mid-left drip cluster -->
	<path
		filter="url(#splash-soft)"
		fill="var(--color-ecsess-600)"
		opacity="0.7"
		d="M-100,380 C-20,340 80,360 110,440 C140,520 40,580 -40,560 C-110,545 -150,470 -130,420 C-120,395 -115,390 -100,380 Z"
	/>
	<path
		filter="url(#splash-soft-sm)"
		fill="var(--color-ecsess-400)"
		opacity="0.58"
		d="M70,500 C95,490 115,515 105,545 C95,570 65,575 55,550 C45,525 50,508 70,500 Z"
	/>

	<!-- Bottom-right wash -->
	<path
		filter="url(#splash-soft)"
		fill="var(--color-ecsess-500)"
		opacity="0.68"
		d="M1180,720 C1280,680 1420,700 1500,780 C1560,850 1480,960 1340,940 C1220,925 1120,860 1130,790 C1135,755 1150,735 1180,720 Z"
	/>
	<path
		filter="url(#splash-soft-sm)"
		fill="var(--color-ecsess-300)"
		opacity="0.52"
		d="M1260,640 C1295,625 1335,650 1325,690 C1315,725 1270,730 1245,705 C1225,685 1235,650 1260,640 Z"
	/>
	<circle
		filter="url(#splash-soft-sm)"
		cx="1410"
		cy="700"
		r="16"
		fill="var(--color-ecsess-250)"
		opacity="0.65"
	/>
	<circle
		filter="url(#splash-soft-sm)"
		cx="1345"
		cy="820"
		r="12"
		fill="var(--color-ecsess-400)"
		opacity="0.6"
	/>

	<!-- Bottom-left wash -->
	<path
		filter="url(#splash-soft)"
		fill="var(--color-ecsess-550)"
		opacity="0.7"
		d="M-60,780 C40,740 160,780 200,860 C230,920 140,980 20,970 C-80,960 -130,880 -110,830 C-100,805 -85,790 -60,780 Z"
	/>

	<!-- Upper mid soft streak -->
	<path
		filter="url(#splash-soft)"
		fill="var(--color-ecsess-450)"
		opacity="0.45"
		d="M520,40 C620,10 760,30 820,90 C870,140 820,200 720,195 C620,190 540,140 510,90 C495,65 495,50 520,40 Z"
	/>

	<!-- Lower mid accent -->
	<path
		filter="url(#splash-soft-sm)"
		fill="var(--color-ecsess-350)"
		opacity="0.48"
		d="M640,780 C700,760 770,785 760,830 C750,870 690,880 650,855 C620,835 615,795 640,780 Z"
	/>
</svg>
