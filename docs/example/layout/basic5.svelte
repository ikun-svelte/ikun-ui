<script>
	import { KContainer, KHeader, KMain, KFooter, KAside } from '@ikun-ui/layout';
</script>

<KContainer>
	<KHeader slot="header" cls="text-center bg-orange-100 leading-60px">
		拾花鸟之一趣，照月风之长路。(header)
	</KHeader>
	<KContainer>
		<KAside cls="text-center bg-orange-200 leading-60px w-1/4">
			<p>我等必将复起</p>
			<p>古木已发新枝</p>
			<p>(aside)</p>
		</KAside>
		<KContainer>
			<KMain cls="text-center bg-orange-300 leading-300px">
				<p>最初的鸟儿是不会飞翔的</p>
				<p>飞翔是它们勇敢跃入峡谷的奖励</p>
				<p>(main)</p>
			</KMain>
			<KFooter slot="footer" cls="text-center bg-orange-100 leading-60px">
				纵使古玩价值连城，给人的快乐不过刚拥有时的一瞬(footer)
			</KFooter>
		</KContainer>
	</KContainer>
</KContainer>
