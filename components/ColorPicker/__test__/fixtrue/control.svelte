<script>
	import { KColorPicker } from '@ikun-ui/color-picker';
	import { KButton } from '@ikun-ui/button';
	import { createEventDispatcher } from 'svelte';
	let format = 'hsv';
	const formatChange = (e) => {
		format = e.detail;
	};
	const dispatch = createEventDispatcher();
	let colorPickerRef = null;
	const handleShow = (v) => {
		if (v) {
			dispatch('trigger');
			colorPickerRef.handleOpen();
		} else {
			dispatch('trigger');
			colorPickerRef.handleClose();
		}
	};
</script>

<KColorPicker
	defaultValue="#1677FF"
	value="#1677FF"
	title="asdasd"
	bind:this={colorPickerRef}
	format="hex"
	on:formatChange={formatChange}
	showText
></KColorPicker>
<div id="format_test">{format}</div>
<KButton id="open" on:click={() => handleShow(true)} type="primary">open</KButton>
<KButton id="close" on:click={() => handleShow(false)} type="info">close</KButton>
