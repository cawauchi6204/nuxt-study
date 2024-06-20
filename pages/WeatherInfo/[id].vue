<script setup lang="ts">
import type { City } from "@/interfaces";

const route = useRoute();
const cityList = useState<Map<number, City>>("cityList");
const selectedCity = computed(
	(): City => {
		const idNo = Number(route.params.id);
		return cityList.value.get(idNo) as City;
	}
);
// const weatherDescription = ref("");

const runtimeConfig = useRuntimeConfig();
// useAsyncDataのメリットは
// 1. データ取得の非同期処理を簡潔に記述できる
// 2. データ取得の成功・失敗時の処理を記述できる
// 3. データ取得の成功時にデータを加工して返すことができる
// 4. データ取得の成功時にデータをキャッシュすることができる
const { data, status } = await useLazyAsyncData(
	`/WeatherInfo/${route.params.id}`,
	(): Promise<any> => {
		const weatherInfoUrl = "https://api.openweathermap.org/data/2.5/weather";
		const params: {
			lang: string;
			q: string;
			appid: string;
		} =
		{
			lang: "ja",
			q: selectedCity.value.q,
			//APIキーのクエリパラメータ。ここに各自の文字列を記述する!!
			appid: runtimeConfig.public.openWeatherApiKey
		}
		const queryParams = new URLSearchParams(params);
		const urlFull = `${weatherInfoUrl}?${queryParams}`;
		const response = $fetch(urlFull);
		return response;
	},
	{
		// pick: ["weather"],
		transform: (data: any): string => {
			const weatherArray = data.weather;
			const weather = weatherArray[0];
			return weather.description;
		},
		server: true,
	}
);
const isLoading = computed((): boolean => status.value !== "success");
const weatherDescription = data.value;
</script>

<template>
	<section v-if="isLoading">
		<h2>取得中</h2>
	</section>
	<section v-else>
		<h2>{{ selectedCity.name }}の天気</h2>
		<p>{{ weatherDescription }}</p>
	</section>
	<p>リストに<NuxtLink v-bind:to="{ name: 'index' }">戻る</NuxtLink>
	</p>
</template>
