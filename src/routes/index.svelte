<script lang="ts">
	import Typewriter from "svelte-typewriter";
	import Pause from "svelte-icons/fa/FaRegPauseCircle.svelte";
	import Play from "svelte-icons/fa/FaRegPlayCircle.svelte";
	import Accordion from "$lib/components/Accordion.svelte";
	import AccordionItem from "$lib/components/AccordionItem.svelte";
	import Github from "svelte-icons/fa/FaGithub.svelte";
	import { goto } from "$app/navigation";
	import { DoubleBounce } from "svelte-loading-spinners";
	import { onMount } from "svelte";

	let openingAnimationPause = true;
	let loading = false;

	onMount(() => {
		if (!window.matchMedia("(prefers-reduced-motion)").matches) {
			openingAnimationPause = false;
		}
	});
</script>

{#if loading}
	<div class="flex w-[100vw] h-[100vh] justify-center items-center">
		<DoubleBounce size="40" unit="px" />
	</div>
{:else}
	<div class="flex flex-col max-w-[100%] overflow-x-hidden overflow-y-hidden">
		<button
			class="bg-blue-400 p-3 font-bold rounded-md absolute top-3 right-3"
			on:click={() => {
				loading = true;
				goto("/music");
			}}>Start Codicing &#8594;</button
		>
		<div class="flex items-center justify-center">
			<h1 class="font-bold text-8xl md:text-9xl">Codic</h1>
		</div>
		<div class="flex text-2xl md:text-5xl justify-center mt-5 group items-baseline">
			<p>Combining</p>
			&nbsp;
			{#if openingAnimationPause}
				<p>Coding</p>
			{:else}
				<Typewriter interval={300} loop>
					<p>Coding</p>
				</Typewriter>
			{/if}
			&nbsp;and&nbsp;
			<p id="music" style="animation-play-state: {openingAnimationPause ? 'paused' : 'running'};">
				Music
			</p>
			&nbsp;&nbsp;
			<button
				on:click={() => (openingAnimationPause = !openingAnimationPause)}
				class="opacity-0 group-hover:opacity-100 transition-all duration-200 w-[0.75em]"
				id="anim-button"
			>
				{#if openingAnimationPause}
					<Play />
				{:else}
					<Pause />
				{/if}
			</button>
		</div>
		<br /><br />
		<div id="grid-container" class="p-2 mb-3">
			<p class="text-xl md:text-3xl [grid-area:text-1] text-right">
				Search for your favorite artist and presss the play button on any song, Codic will do the
				rest! Listen to the songs continuously while you code and weave the next great product.
			</p>
			<img
				src="/musicPanel.jpg"
				alt="Music Panel"
				class="border-dashed border-2 border-yellow-400 [grid-area:pic-1]"
			/>
			<img
				src="/editor.jpg"
				alt="Editor"
				class="border-dashed border-2 border-yellow-400 [grid-area:pic-2]"
			/>
			<p class="text-xl md:text-3xl [grid-area:text-2] text-left">
				Code in an integrated editor with javascript support with an integrated console. Enjoy the
				dark mode and put less stress on your eyes!
			</p>
		</div>
		<hr />
		<div class="flex flex-col items-center mt-5 gap-2 mb-5">
			<video controls class="w-[75%] border-dashed border-2 border-yellow-400">
				<source src="/resize.mp4" />
				<track kind="captions" />
			</video>
			<p class="text-xl md:text-3xl row-start-2 col-start-2 text-center">
				Easily resize and snap the music panel and the editor.
			</p>
		</div>
		<hr />
		<div class="flex flex-col items-center mt-5 gap-2 mb-5">
			<h1 class="font-bold text-3xl md:text-5xl mb- mb-5">Recommended Configuration</h1>
			<video controls class="w-[75%] border-dashed border-2 border-yellow-400">
				<source src="/config.mp4" />
				<track kind="captions" />
			</video>
			<p class="text-xl md:text-3xl row-start-2 col-start-2 text-center">
				Search for your favorite artist, start playing any song, hide the music panel and you are
				good to go! Listen to music without interruptions and code simultaneously with distractions.
			</p>
		</div>
		<hr />
		<div class="flex flex-col items-center mt-5 gap-2 mb-5">
			<h1 class="font-bold text-3xl md:text-5xl mb- mb-5">Cool New Features Coming Soon</h1>
			<Accordion>
				<AccordionItem title="Complete IDE Integration">
					<p class="text-xl md:text-2xl row-start-2 col-start-2 text-center">
						A complete VS Code like IDE with file system and extensions.
					</p>
				</AccordionItem>
				<AccordionItem title="More Programming Languages">
					<p class="text-xl md:text-2xl row-start-2 col-start-2 text-center">
						More programming languages including Python, Go, Ruby etc.
					</p>
				</AccordionItem>
				<AccordionItem title="Accounts Integration">
					<p class="text-xl md:text-2xl row-start-2 col-start-2 text-center">
						Save your code and favorite songs online on the cloud.
					</p>
				</AccordionItem>
			</Accordion>
		</div>
		<div class="w-full flex justify-center items-center bg-yellow-400 p-2 gap-2">
			<h3 class="font-bold text-xl">Made by Sumanyu Aggarwal</h3>
			<a href="https://github.com/SuPythony/Codic" class="w-5 cursor-pointer">
				<Github />
			</a>
		</div>
	</div>
{/if}

<style>
	#grid-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto;
		grid-gap: 10px;
		grid-template-areas:
			"text-1 pic-1 "
			". pic-1"
			"pic-2 pic-1"
			"pic-2 text-2";
	}

	@keyframes up-down {
		0% {
			opacity: 0;
			transform: translateY(-50px);
		}

		25%,
		75% {
			opacity: 1;
			transform: translateY(0);
		}

		100% {
			opacity: 0;
			transform: translateY(50px);
		}
	}

	#music {
		animation-name: up-down;
		animation-duration: 1500ms;
		animation-iteration-count: infinite;
	}

	@media (prefers-reduced-motion) {
		#music {
			animation: none;
		}

		#anim-button {
			display: none;
		}
	}
</style>
