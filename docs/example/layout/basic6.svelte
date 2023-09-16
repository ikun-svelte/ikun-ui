<script>
	import { KContainer, KHeader, KMain, KAside } from '@ikun-ui/layout';
</script>

<KContainer>
	<KAside cls="text-center bg-orange-200 leading-60px w-1/4">
		<p>四方食事</p>
		<p>不过一碗人间烟火</p>
		<p>(aside)</p>
	</KAside>
	<KContainer>
		<KHeader slot="header" cls="text-center bg-orange-100 leading-60px">
			总有地上的生灵，敢于面对雷霆的威光(header)
		</KHeader>
		<KMain cls="text-center bg-orange-300 leading-300px">
			<p>风雨犹祝，山海同欢</p>
			<p>(main)</p>
		</KMain>
	</KContainer>
</KContainer>
