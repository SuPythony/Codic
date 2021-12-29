<script lang="ts">
	import Editor from "$lib/components/Editor.svelte";
	import Split from "split.js";
	import { onMount } from "svelte";

	onMount(() => {
		Split(["#panel1", "#panel2"], {
			minSize: 0,
		});
	});
</script>

<div class="flex">
	<div class="bg-blue-400 h-[100vh] w-[50%]" id="panel1">
		<slot />
	</div>
	<div class="w-[50%]" id="panel2">
		<Editor />
	</div>
</div>

<style>
	:global(.gutter) {
		@apply cursor-col-resize bg-slate-500;
	}
</style>
