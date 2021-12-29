<script lang="ts" context="module">
	let index = 0;
</script>

<script lang="ts">
	import { openedIndex } from "$lib/stores";
	import { slide } from "svelte/transition";
	import { keyClick } from "$lib/actions";
	import ChevronDown from "svelte-icons/fa/FaChevronDown.svelte";

	const thisIndex = index++;
	let opened = false;

	$: if (thisIndex === $openedIndex) {
		opened = true;
	} else {
		opened = false;
	}

	export let title: string;
</script>

<div
	class="cursor-pointer bg-blue-400 w-full md:w-[75%] px-[20px] py-[10px] flex justify-between items-center mb-[10px] text-[0.9em]"
	role="button"
	tabindex="0"
	use:keyClick={() => {
		if (opened) {
			$openedIndex = undefined;
		} else {
			$openedIndex = thisIndex;
		}
	}}
	on:click={() => {
		if (opened) {
			$openedIndex = undefined;
		} else {
			$openedIndex = thisIndex;
		}
	}}
>
	<h1 class="m-0 text-3xl font-bold">{title}</h1>
	<i
		class="transition-transform duration-500 w-4"
		style={opened ? "transform: rotate(180deg);" : ""}><ChevronDown /></i
	>
</div>
{#if opened}
	<div transition:slide class="mb-[20px]">
		<slot />
	</div>
{/if}
