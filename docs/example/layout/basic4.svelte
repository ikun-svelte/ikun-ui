<script>
	import { KContainer, KHeader, KMain, KAside } from '@ikun-ui/layout';
</script>

<KContainer>
	<KHeader slot="header" cls="text-center bg-orange-100 leading-60px">
		红缨猎猎剑流星,直指怒潮洗海清(header)
	</KHeader>
	<KContainer>
		<KAside cls="text-center bg-orange-200 leading-60px w-1/4">
			<p>浮世景色</p>
			<p>百千年依旧</p>
			<p>(aside)</p>
		</KAside>
		<KMain cls="text-center bg-orange-300 leading-300px">
			<p>在黎明到来之前</p>
			<p>必须要有人稍微照亮黑暗</p>
			<p>(main)</p>
		</KMain>
	</KContainer>
</KContainer>
