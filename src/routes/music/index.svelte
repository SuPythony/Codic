<script lang="ts">
	import Music from "$lib/components/Music.svelte";

	let div: HTMLDivElement;
</script>

<div bind:this={div} class="overflow-y-scroll h-[100vh]">
	<Music scroll={() => (div.scrollTop = 0)} />
</div>
