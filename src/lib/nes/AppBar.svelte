<script lang="ts">
	import './_appbar.scss'
	import { currentPage, url } from '../'
	function navigate(hash) {
		const [path, queryNum] = hash.split('#/')
		let number = 0
		if (queryNum && parseInt(queryNum)) {
			number = parseInt(queryNum)
		}

		currentPage.set(number)
	}

	$: navigate($url.hash)
</script>

<header class="appbar">
	<div class="container">
		<div class="nav-brand">
			<a href="#/">
				<h1><i class="snes-jp-logo brand-logo"></i>NES.css</h1>
			</a>
			<p>NES-style Currently {$url.hash} {$currentPage}.</p>
		</div>
		<div class="social-buttons">
			<div class="share">
				<a href="#/1"><i class="nes-icon twitter"></i></a>
				<a href="#/2"><i class="nes-icon facebook"></i></a>
				<a href="#/3"><i class="nes-icon linkedin"></i></a>
				<a href="#/4"><i class="nes-icon github"></i></a>
			</div>
		</div>
	</div>
</header>
