<script>
	import { onMount, onDestroy } from 'svelte'
	let separator
	let left, right
	export let leftPaneSize = '50%'
	export let rightPaneSize = '50%'
	export let minLeftPaneSize = '0'
	export let minRightPaneSize = '0'
	export let updateCallback = () => {
		// do nothing
		return
	}
	export let onMouseDown = () => {
		// do nothing
		return
	}
	export let onMouseUp = () => {
		// do nothing
		return
	}
	let md
	const onMouseDownWrapper = (e) => {
		e.preventDefault()
		onMouseDown()
		if (e.button !== 0) return
		md = {
			e,
			offsetLeft: separator.offsetLeft,
			offsetTop: separator.offsetTop,
			firstWidth: left.offsetWidth,
			secondWidth: right.offsetWidth
		}
		window.addEventListener('mousemove', onMouseMove)
		window.addEventListener('mouseup', onMouseUpWrapper)
		window.addEventListener('touchmove', onMouseMove)
		window.addEventListener('touchend', onMouseUpWrapper)
	}
	const onMouseMove = (e) => {
		e.preventDefault()
		if (e.button !== 0) return
		var delta = { x: e.clientX - md.e.clientX, y: e.clientY - md.e.clientY }
		// Prevent negative-sized elements
		delta.x = Math.min(Math.max(delta.x, -md.firstWidth), md.secondWidth)
		separator.style.left = md.offsetLeft + delta.x + 'px'
		left.style.width = md.firstWidth + delta.x + 'px'
		right.style.width = md.secondWidth - delta.x + 'px'
		updateCallback()
	}
	const onMouseUpWrapper = (e) => {
		onMouseUp()
		if (e) {
			e.preventDefault()
			if (e.button !== 0) return
		}
		updateCallback()
		window.removeEventListener('mousemove', onMouseMove)
		window.removeEventListener('mouseup', onMouseUpWrapper)
		window.removeEventListener('touchmove', onMouseMove)
		window.removeEventListener('touchend', onMouseUpWrapper)
	}
	function resetSize() {
		if (left) left.removeAttribute('style')
		if (right) right.removeAttribute('style')
		if (separator) separator.removeAttribute('style')
	}
	function onResize() {
		onMouseUpWrapper()
		resetSize()
	}
	onMount(() => {
		window.addEventListener('resize', onResize)
	})
	onDestroy(() => {
		window.removeEventListener('resize', onResize)
	})

	$: leftPaneSize && resetSize()
	$: rightPaneSize && resetSize()
</script>

<div
	class="wrapper"
	style="--left-panel-size: {leftPaneSize}; --right-panel-size: {rightPaneSize}; --min-left-panel-size: {minLeftPaneSize}; --min-right-panel-size: {minRightPaneSize};">
	<div bind:this={left} class="left">
		<slot name="left">
			<div style="background-color: red;">Left Contents goes here...</div>
		</slot>
	</div>
	<div
		bind:this={separator}
		class="separator"
		on:mousedown={onMouseDownWrapper}
		on:touchstart={onMouseDownWrapper} />
	<div bind:this={right} class="right">
		<slot name="right">
			<div style="background-color: yellow;">Right Contents goes here...</div>
		</slot>
	</div>
</div>

<style>
	div.wrapper {
		width: 100%;
		height: 100%;
		/* background-color: yellow; */
		display: inline-flex;
		overflow: hidden;
	}
	div.separator {
		cursor: col-resize;
		height: 100%;
		width: 4px;
		margin-left: -2px;
		z-index: 1;
		background-color: #aaa;
		background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='30'><path d='M2 0 v30 M5 0 v30 M8 0 v30' fill='none' stroke='black'/></svg>");
		background-repeat: no-repeat;
		background-position: center;
	}
	div.left {
		position: relative;
		overflow: hidden;
		width: var(--left-panel-size);
		min-width: var(--min-left-panel-size);
		height: 100%;
	}
	div.right {
		position: relative;
		overflow: hidden;
		width: var(--right-panel-size);
		min-width: var(--min-right-panel-size);
		height: 100%;
	}
</style>
