<script>
	let { name, position, email, positionDescription, yearProgram, image } = $props();
	import { Mail, NotepadText } from '@lucide/svelte';
	import placeholder from 'assets/placeholderAvatar.png';
	import { slide } from 'svelte/transition';
</script>

<div
	class="text-ecsess-800 m-4 flex h-[275px] max-w-[564px]
			items-center gap-3 rounded-2xl border-transparent bg-transparent
			bg-[linear-gradient(to_bottom_right,_#E8FFD9,_#97C583)] p-6"
	transition:slide
>
	<!-- AVATAR -->
	<div class="avatar">
		<div class="size-36 justify-center place-self-center-safe overflow-hidden rounded-lg shadow-md">
			<img src={image || placeholder} alt={name} class="h-full w-full object-cover" />
		</div>
		<span class="yearProgram justify-center text-sm"> Major: {yearProgram} </span>
	</div>
	<!-- CONTENT -->
	<div class="content">
		<div class="my-2">
			<p class="text-2xl font-bold lg:text-3xl">{name}</p>
			<p class="text-base italic">{position}</p>
		</div>
		<hr class="hr border-ecsess-600 border-1 border-dashed" />
		<div class="my-2 text-left">
			<ul>
				<li>
					<p class="py-2 text-base">{positionDescription}</p>
				</li>
				<li class="flex flex-row place-items-center gap-2">
					<Mail class="size-4" />
					<p>
						Email: <a href="mailto:{email}" class="py-2 text-base underline">{email}</a>
					</p>
				</li>
			</ul>
		</div>
	</div>
</div>
