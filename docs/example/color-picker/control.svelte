<script lang="ts">
	import { KButton } from '@ikun-ui/button';
	import { KColorPicker } from '@ikun-ui/color-picker';
	let colorPickerRef: any = null;
	const handleShow = (v) => {
		if (v) {
			colorPickerRef.handleOpen();
		} else {
			colorPickerRef.handleClose();
		}
	};

	let value = '#f8a153';
	const handleChangeComplete = (e) => {
		value = e.detail;
	};
</script>

<div class="flex demon-dropdown">
	<KButton on:click={() => handleShow(true)} type="primary">open</KButton>
	<KButton on:click={() => handleShow(false)} type="info" cls="mr-8px">close</KButton>
	<KColorPicker
		defaultValue="#f8a153"
		{value}
		format="hex"
		showText
		bind:this={colorPickerRef}
		on:changeComplete={handleChangeComplete}
	></KColorPicker>
</div>
