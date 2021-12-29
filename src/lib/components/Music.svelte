<script lang="ts">
	import { onMount } from "svelte";
	import { DoubleBounce } from "svelte-loading-spinners";
	import Search from "svelte-icons/md/MdSearch.svelte";
	import Home from "svelte-icons/fa/FaHome.svelte";
	import { goto } from "$app/navigation";

	let query = "the beatles";

	let options = {
		headers: {
			"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
			"x-rapidapi-key": "7088aa8bdfmsh4cdf38d56f0a9f4p1511cajsndbfeed5b65be",
		},
	};

	let loading = true;
	let data;
	let songAudios: HTMLAudioElement[] = [];
	export let scroll;
	let autoPlay = false;

	async function search(index = 0) {
		loading = true;
		let temp = await fetch(
			`https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}&index=${index}`,
			options,
		);
		data = await temp.json();
		songAudios = [];
		for (let song of data.data.filter((el) => el.type === "track" && el.readable)) {
			songAudios.push(new Audio(song.preview));
		}
		loading = false;
		scroll();
	}

	onMount(() => {
		search();
	});
</script>

<div class="flex justify-around mb-8 mt-2 items-center">
	<button class="w-[2em]" on:click={() => goto("/")}>
		<Home />
	</button>
	<h1 class="text-[1.5em] md:text-[3em] font-bold">Music</h1>
	<div class="self-centre">
		<form on:submit|preventDefault>
			<div class="flex items-center gap-1">
				<input class="rounded-md h-[2.5em] w-[5em] md:w-[12.5em] p-2" bind:value={query} />
				<button class="rounded-md bg-green-600 p-2" on:click={() => search()}
					><div class="flex gap-[2px] items-center">
						<div class="w-[1em]"><Search /></div>
						Search
					</div>
				</button>
			</div>
		</form>
	</div>
</div>
<div class="h-[100vh] break-words">
	{#if loading}
		<div class="flex items-center justify-center h-full">
			<DoubleBounce size="40" unit="px" />
		</div>
	{:else if data.data.length === 0}
		<div class="flex justify-center">
			<p>No music matches your search</p>
		</div>
	{:else}
		{#each data.data.filter((el) => el.type === "track" && el.readable) as track, index (index)}
			<div class="flex gap-3 mb-5 mt-5 justify-around" title={track.title}>
				<img src={track.album.cover} alt={track.title} />
				<div class="flex flex-col justify-around">
					<div class="flex items-baseline gap-2">
						<h2 class="font-bold text-2xl">{track.title_short}</h2>
						<h3>by {track.artist.name}</h3>
					</div>
					<audio
						controls
						bind:this={songAudios[index]}
						on:canplay={() => {
							if (autoPlay && index === 0) {
								songAudios[index].play();
							}
						}}
						on:ended={() => {
							if (index < songAudios.length - 1) {
								songAudios[index + 1].play();
							} else {
								if (data.next) {
									search(Number(data.next.split("index=").reverse()[0]));
									autoPlay = true;
								}
							}
						}}
						on:play={() => {
							let ind = 0;
							for (let audio of songAudios) {
								if (ind !== index) {
									audio.pause();
								}
								ind += 1;
							}
						}}
					>
						<source src={track.preview} />
					</audio>
				</div>
			</div>
			<div class="flex justify-center">
				<div class="border-b-2 border-b-black w-[75%]" />
			</div>
		{/each}
		{#if data.prev || data.next}
			<div class="flex items-center justify-around mt-4 mb-4">
				{#if data.prev}
					<button
						class="rounded-md bg-green-600 p-2"
						on:click={() => {
							autoPlay = false;
							search(Number(data.prev.split("index=").reverse()[0]));
						}}>Previous</button
					>
				{/if}
				{#if data.next}
					<button
						class="rounded-md bg-green-600 p-2"
						on:click={() => {
							autoPlay = false;
							search(Number(data.next.split("index=").reverse()[0]));
						}}>Next</button
					>
				{/if}
			</div>
		{/if}
		<div class="relative bottom-0 bg-yellow-400 p-2 flex justify-center">
			<p>Made by Sumanyu Aggarwal</p>
		</div>
	{/if}
</div>
