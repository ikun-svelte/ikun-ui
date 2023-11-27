<script>
	import KSelect from '../../src';
</script>

<KSelect
	value={'Normal'}
	let:isActive
	let:label
	dataList={['Tiny', 'Small', 'Normal', 'Large', 'Huge']}
>
	<div class="prefix" slot="prefix">prefix</div>
	<div class="suffix" slot="suffix">suffix</div>
	<button>{label} {isActive}</button>
</KSelect>
