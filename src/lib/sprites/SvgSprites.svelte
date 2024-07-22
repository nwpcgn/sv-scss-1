<script>
	import FetherIcons from './FetherIcons.svelte'
	import { onMount } from 'svelte'
	export let list = []
	let elem
	onMount(() => {
		const qe = elem.querySelectorAll('symbol')
		list = []
		qe.forEach((element) => {
			list.push(element.id)
		})
		console.log({ list })
	})
</script>

<svg
	bind:this={elem}
	width="0"
	height="0"
	fill="none"
	style="visibility: hidden; position: absolute"
	aria-hidden="true">
	<FetherIcons></FetherIcons>
</svg>
