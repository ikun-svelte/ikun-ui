<script>
	import { KCol, KRow } from '@ikun-ui/grid';
	import { KCountdown } from '@ikun-ui/countdown';
	import { KIcon } from '@ikun-ui/icon';
	import { KButton } from '@ikun-ui/button';
	import dayjs from 'dayjs';

	let value = Date.now() + 1000 * 60 * 60 * 7;
	let value1 = Date.now() + 1000 * 60 * 60 * 24 * 2;
	let value2 = dayjs().add(1, 'month').startOf('month');

	function reset() {
		value1 = Date.now() + 1000 * 60 * 60 * 24 * 2;
	}
</script>

<KRow>
	<KCol span={8}>
		<KCountdown title="Start to grab" {value} />
	</KCol>
	<KCol span={8}>
		<KCountdown title="Remaining VIP time" format="HH:mm:ss" value={value1} />
		<KButton cls="countdown-footer" on:click={reset}>reset</KButton>
	</KCol>
	<KCol span={8}>
		<KCountdown format="HH:mm:ss" value={value2}>
			<div style="display: inline-flex; align-items: center" slot="title">
				<KIcon icon="i-carbon-logo-svelte" slot="prefix" width="12px" height="12px" cls="mr-2px" />
				Still to go until next month
			</div>
		</KCountdown>
		<div class="countdown-footer">{value2.format('YYYY-MM-DD')}</div>
	</KCol>
</KRow>

<style>
	:global(.countdown-footer) {
		font-size: 14px;
		margin: 4px auto 0 auto;
	}
</style>
