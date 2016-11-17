<template>
	<div id="date-picker-position">
		<div class="date-picker-wrapper">
			<div class="date-display"
				:class="active ? 'active' : ''"
				@click="openDatePicker()">{{ dateRange }}</div>
			<div class="date-popup-container" v-show="active">
				<div class="date-popup">
					<Dateform
						:start="simpleDate(startDate)"
						:end="simpleDate(endDate)"
						:currentMonthPosition="'right'"
						:offset ="offset"
						@updateRange="updateRange"
						@updateOffset="updateOffset">
					</Dateform>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Dateform from './Dateform.vue'
	function oneMonthAgo() {
		var d = new Date()
		return d.valueOf() - 2592000000 // 30 days
	}

	export default {
		data () {
			return {
				startDate: new Date(oneMonthAgo()),
				endDate: new Date(),
				months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
				active: false,
				offset: 0
			}
		},
		computed: {
			dateRange () {
				return this.formatDate(this.startDate) + ' - ' + this.formatDate(this.endDate)
			}
		},
		methods: {
			formatDate (date) {
				return this.months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
			},
			simpleDate (date) {
				return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear()
			},
			updateRange (start, end) {
				console.log(start,end)
				this.startDate = new Date(start)
				this.endDate = new Date(end)
			},
			updateOffset (n) {
				this.offset += n
			},
			openDatePicker () {
				this.active = !this.active
				this.offset = 0
			}
		},
		components: {
			Dateform
		}
	}
</script>

<style lang="css">
	.date-picker-position {
		text-align: center;
	}
	.date-picker-wrapper {
		position: relative;
		display: inline-block;
	}
	.date-display {
		border: 1px solid gray;
		padding: 5px 15px;
		cursor: pointer;
		display: inline-block;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	.date-display.active {
		background: #efefef;
	}
	.date-popup-container {
		position: absolute;
		top: 98%;
		right: 0;
		padding: 0;
		background: #ededed;
		border: 1px solid gray;
		min-width: 100%;
	}
	.date-popup {
		padding: 10px 0 15px;
		float: right;
	}
</style>
