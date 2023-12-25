<script>
	import { KCol, KRow } from '@ikun-ui/grid';
	import { KStatistic } from '@ikun-ui/statistic';
	import { KIcon } from '@ikun-ui/icon';
	import { KCard } from '@ikun-ui/card';
</script>

<KRow gutter={16} justify="around">
	<KCol span={8}>
		<KCard>
			<KStatistic title="Yo! Yo! Yo!" value={98500}>
				<div style="display: inline-flex; align-items: center" slot="title">
					Daily active users
					<KIcon
						icon="i-carbon-information"
						slot="prefix"
						width="12px"
						height="12px"
						cls="ml-2px"
					/>
				</div>
			</KStatistic>
			<div class="inline-flex align-center text-ikun-tx-gr text-12px">
				than yesterday
				<span class="text-green-500 ml-4px fcc">
					24%
					<KIcon icon="i-carbon-caret-down" slot="prefix" width="12px" height="12px" />
				</span>
			</div>
		</KCard>
	</KCol>
	<KCol span={8}>
		<KCard>
			<KStatistic title="Yo! Yo! Yo!" value={673800}>
				<div style="display: inline-flex; align-items: center" slot="title">
					Monthly Active Users
					<KIcon
						icon="i-carbon-information"
						slot="prefix"
						width="12px"
						height="12px"
						cls="ml-2px"
					/>
				</div>
			</KStatistic>
			<div class="inline-flex align-center text-ikun-tx-gr text-12px">
				than yesterday
				<span class="text-red-500 ml-4px fcc">
					66%
					<KIcon icon="i-carbon-caret-down" slot="prefix" width="12px" height="12px" />
				</span>
			</div>
		</KCard>
	</KCol>
	<KCol span={8}>
		<KCard>
			<KStatistic title="Yo! Yo! Yo!" value={72000}>
				<div style="display: inline-flex; align-items: center" slot="title">
					New transactions today
					<KIcon
						icon="i-carbon-information"
						slot="prefix"
						width="12px"
						height="12px"
						cls="ml-2px"
					/>
				</div>
			</KStatistic>
			<div class="inline-flex align-center text-ikun-tx-gr text-12px">
				than yesterday
				<span class="text-red-500 ml-4px fcc">
					24%
					<KIcon icon="i-carbon-caret-down" slot="prefix" width="12px" height="12px" />
				</span>
			</div>
		</KCard>
	</KCol>
</KRow>
