<script setup lang="ts">
import type { City } from "@/interfaces";

//ルートオブジェクトを用意、
const route = useRoute();
//都市情報リストをステートから取得。
const cityList = useState<Map<number, City>>("cityList");
//ルートパラメータをもとに該当都市データを取得。
const selectedCity = computed(
	(): City => {
		const idNo = Number(route.params.id);
		return cityList.value.get(idNo) as City;
	}
);
//天気情報のテンプレート変数を用意。
const weatherDescription = ref("");

//アクセス先URLの基本部分の変数を用意。
const weatherInfoUrl = "https://api.openweathermap.org/data/2.5/weather";
//クエリパラメータの元データとなるオブジェクトリテラルを用意。
const params: {
	lang: string;
	q: string;
	appid: string;
} =
{
	//言語設定のクエリパラメータ
	lang: "ja",
	//都市を表すクエリパラメータ。
	q: selectedCity.value.q,
	//APIキーのクエリパラメータ。ここに各自の文字列を記述する!!
	appid: "4d70b40223a8f59e70164d21193696fb"
}
//クエリパラメータを生成。
const queryParams = new URLSearchParams(params);
//実際にアクセスするURLを生成。
const urlFull = `${weatherInfoUrl}?${queryParams}`;
//URLに非同期でアクセスしてデータを取得。
console.log("🚀 ~ urlFull:", urlFull)
// fetchではなく、$fetchを使うことに注意。
// なぜかというと、fetchはサーバーサイドでのみ動作するため。
// また、$fetchはNuxt.jsの機能で、fetchのラッパー関数。
// これにより、fetchを使う場合よりも簡単にデータを取得できる。
const response = await $fetch(urlFull) as any;
// console.log(response);
//天気情報JSONから天気データを取得し、テンプレート変数に格納。
const weatherArray = response.weather;
const weather = weatherArray[0];
weatherDescription.value = weather.description;
</script>

<template>
	<section>
		<h2>{{ selectedCity.name }}の天気</h2>
		<p>{{ weatherDescription }}</p>
	</section>
	<p>リストに<NuxtLink v-bind:to="{ name: 'index' }">戻る</NuxtLink>
	</p>
</template>
