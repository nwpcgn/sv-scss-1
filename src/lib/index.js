// Reexport your entry components here
export { el } from './game'
export { HSplit, VSplit } from './split'

// @index('./*.svelte', f => `export { default as ${f.name} } from '${f.path}${f.ext}'`)
export { default as Counter } from './Counter.svelte'
// @endindex

// @index('./utils/*.js', f => `export { default as ${f.name} } from '${f.path}'`)
export { default as autoplay } from './utils/autoplay'
export { default as clickOutside } from './utils/clickOutside'
export { default as copyToClip } from './utils/copyToClip'
export { default as distance } from './utils/distance'
export { default as fetchData } from './utils/fetchData'
export { default as gArr } from './utils/gArr'
export { default as loadImage } from './utils/loadImage'
export { default as paginate } from './utils/paginate'
export { default as randInt } from './utils/randInt'
export { default as randNum } from './utils/randNum'
export { default as shuffle } from './utils/shuffle'
export { default as sleep } from './utils/sleep'
export { default as uuid } from './utils/uuid'
// @endindex
// @index('./stores/*.js', f => `export { default as ${f.name} } from '${f.path}'`)
export { default as currentPage } from './stores/currentPage'
export { default as game } from './stores/game'
export { default as storable } from './stores/storable'
export { default as theme } from './stores/theme'
export { default as url } from './stores/url'
// @endindex
