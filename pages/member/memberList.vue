<script setup lang="ts">

definePageMeta({
	layout: "member"
	// layout: false
});

// 同一Nuxtプロジェクト内のサーバーAPIエンドポイントへのアクセスの場合はhttpsなどのプロトコル部分やホスト部分は省略することができる
const { data, pending } = useLazyFetch("/api/getMemberList")

</script>

<template>
	<nav id="breadcrumbs">
		<ul>
			<li>
				<NuxtLink v-bind:to="{ name: 'index' }">TOP</NuxtLink>
			</li>
			<li>会員リスト</li>
		</ul>
	</nav>
	<section>
		<h2>会員リスト</h2>
		<p>
			新規登録は<NuxtLink v-bind:to="{ name: 'member-memberAdd' }">こちら</NuxtLink>から
		</p>
		<section>
			<p v-if="pending">読み込み中...</p>
			<ul v-else>
				<li v-for="member in data" v-bind:key="member.id">
					<NuxtLink v-bind:to="{ name: 'member-memberDetail-id', params: { id: member.id } }">
						IDが{{ member.id }}の{{ member.name }}さん
					</NuxtLink>
				</li>
			</ul>
		</section>
	</section>
</template>
