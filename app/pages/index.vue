<template>
	<div class="flex items-center flex-col justify-center h-full w-full gap-5">
		<div class="max-w-4xl flex items-center flex-col justify-center h-full w-full gap-5 py-[4rem]">
			<div class="w-full flex gap-10 text-center justify-center text-lg">
				<div class="flex flex-col gap-1">
					<label>曲 <span class="text-sm text-gray-400">(Song)</span></label>
					<input v-model="song_name" class="rounded-lg p-2 text-black" type="text" placeholder="曲名" @keyup.enter="getMetaData" />
				</div>
				<div class="flex flex-col gap-1">
					<label>アーティスト <span class="text-sm text-gray-400">(Artist)</span></label>
					<input v-model="artist_name" class="rounded-lg p-2 text-black" type="text" placeholder="アーティスト名" @keyup.enter="getMetaData" />
				</div>
				<div class="flex flex-col gap-1">
					<!-- <label class="invisible">Easter egg!</label> -->
					<label class="w-[100px]"><span class="text-sm text-gray-400">(Search)</span></label>
					<button class="h-full rounded-lg hover:cursor-pointer border-2 border-gray-400 hover:border-white active:border-gray-400" @click="getMetaData">検索</button>
				</div>
			</div>
			<div v-if="fetchingMetaData" class="flex items-center gap-3">
				<Shuriken size="25px" />
				<h1>Fetching {{ song_name }} {{ artist_name !== "" ? `by ${artist_name}` : "" }}</h1>
			</div>
			<div class="w-full flex flex-col gap-5 overflow-y-auto">
				<div v-if="noTracksFound">
					<h1 class="text-center">No tracks could be found.</h1>
				</div>
				<div
					v-else
					v-for="(candidate, i) in trackCandidates" 
					:key="i"
					class="border-2 rounded-xl border-[#4d4e51] p-4"
				>
					<NuxtLink :to="`/${candidate.id}`">
						<h1 class="font-bold">
							{{ candidate.trackName }}
						</h1>
						<h1 class="text-[#C5D3E8]">
							Artist: {{ candidate.artistName }}
						</h1>
						<h1 class="text-[#FFDDAE]">
							Album: {{ candidate.albumName }}
						</h1>
					</NuxtLink>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const song_name = ref("")
const artist_name = ref("")
const trackCandidates = ref([])
const fetchingMetaData = ref(false)
const noTracksFound = ref(false)

const getMetaData = async () => {
	trackCandidates.value = []
	fetchingMetaData.value = true
	const lyricsResponse = await fetch(`https://lrclib.net/api/search?track_name=${song_name.value}&artist_name=${artist_name.value}`)
	const lyricsResponseData = await lyricsResponse.json()

	if (lyricsResponseData.length === 0){
		noTracksFound.value = true
	} else {
		trackCandidates.value = lyricsResponseData
		noTracksFound.value = false
	}

	fetchingMetaData.value = false
}
</script>

