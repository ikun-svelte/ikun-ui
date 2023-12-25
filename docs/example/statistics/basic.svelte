<script>
	import { KCol, KRow } from '@ikun-ui/grid';
	import { KStatistic } from '@ikun-ui/statistic';
	import { KIcon } from '@ikun-ui/icon';
</script>

<KRow gutter={20} justify="around">
	<KCol span={6}>
		<KStatistic title="Yo! Yo! Yo!" value={268500} />
	</KCol>
	<KCol span={6}>
		<KStatistic title="wow! wow!" value={138}>
			<div style="display: inline-flex; align-items: center" slot="title">
				ikun ui
				<KIcon icon="i-carbon-logo-svelte" slot="prefix" width="12px" height="12px" cls="ml-2px" />
			</div>
			<span slot="suffix">/100</span>
		</KStatistic>
	</KCol>
	<KCol span={6}>
		<KStatistic title="Transactions" value={172000} />
	</KCol>
	<KCol span={6}>
		<KStatistic title="Yo! Yo! Yo!" value={138}>
			<KIcon icon="i-carbon-logo-vue" slot="prefix" width="24px" height="24px" />
		</KStatistic>
	</KCol>
</KRow>
