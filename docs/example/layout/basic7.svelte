<script>
	import { KContainer, KHeader, KMain, KAside, KFooter } from '@ikun-ui/layout';
</script>

<KContainer>
	<KAside cls="text-center bg-orange-200 leading-60px w-1/4">
		<p>十里寒塘路</p>
		<p>烟花一半醒</p>
		<p>(aside)</p>
	</KAside>
	<KContainer>
		<KHeader slot="header" cls="text-center bg-orange-100 leading-60px">
			不要害怕长夜，我将伴你左右(header)
		</KHeader>
		<KMain cls="text-center bg-orange-300 leading-300px">
			<p>吹灭读书灯，一身都是月</p>
			<p>(main)</p>
		</KMain>
		<KFooter slot="footer" cls="text-center bg-orange-100 leading-60px">
			与君相别离，何日是归期(footer)
		</KFooter>
	</KContainer>
</KContainer>
