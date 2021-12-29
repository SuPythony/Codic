<script lang="ts">
	import { openedIndex } from "$lib/stores";

	export let openIndex: number = undefined;

	$openedIndex = openIndex;
</script>

<slot />
