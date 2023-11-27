<script>
	import { KContainer, KHeader, KMain, KFooter } from '@ikun-ui/layout';
	export let direction = '';
</script>

<KContainer {direction}>
	<KHeader slot="header">KHeader</KHeader>
	<KMain>KMain</KMain>
	<KFooter slot="footer">KFooter</KFooter>
</KContainer>
