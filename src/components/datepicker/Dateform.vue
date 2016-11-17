<template lang="html">
	<div class="date-form-container">
		<div class="toggle" @click="changeOffset(-1)"><div class="left-arrow"></div></div>
		<Calendar v-for="n in 3"
			:month="startMonth + (n - 1)"
			:year="year"
			:start="startDate"
			:end="endDate">
		</Calendar>
		<div class="toggle" @click="changeOffset(1)"><div class="right-arrow"></div></div>
	</div>
</template>

<script>
	import Calendar from './Calendar.vue'

	export default {
		props: ['start', 'end', 'currentMonthPosition', 'offset'],
		data () {
			return {
				startDate: this.start,
				endDate: this.end
			}
		},
		computed: {
			validDates () {
				if (this.isValidDate(this.startDate) && this.isValidDate(this.endDate)) {
					return true
				} else {
					return false
				}
			},
			startMonth () {
				let currentDate = new Date()
				let month = currentDate.getMonth()
				if (this.currentMonthPosition === 'left') {
					month += 1
				} else if (this.currentMonthPosition === 'right') {
					month -= 1
				}
				month += this.offset
				if (month > 12) {
					month = month % 12
				} else if (month < 1) {
					month = 12 - (Math.abs(month) % 12)
				}
				return month === 0 ? 12 : month
			},
			year () {
				let currentDate = new Date()
				let year = currentDate.getFullYear(),
					month = currentDate.getMonth()
					if (this.currentMonthPosition === 'left') {
						month += 1
					} else if (this.currentMonthPosition === 'right') {
						month -= 1
					}
				return year + Math.ceil( (this.offset + month) / 12 - 1)
			}
		},
		methods: {
			cancel () {
				this.startDate = this.start
				this.endDate = this.end
				this.$emit('closeDatePicker')
			},
			updateDates () {
				console.log('Emit now!', this.startDate, this.endDate)
				this.$emit('updateRange', this.startDate, this.endDate)
			},
			isValidDate (date) {
				var date_format = /^([1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/
				return (date_format.test(date)) ? true : false
			},
			changeOffset (n) {
				this.$emit('updateOffset', n)
			}
		},
		components: {
			Calendar
		}
	}
</script>

<style lang="css">
	.date-form-container {
		display: table;
		text-align: left;
	}
	.month {
		display: table-cell;
		min-width: 230px;
	}
	.toggle {
		padding: 5px 10px 3px;
		font-weight: 900;
		color: white;
		background: #ddd;
		display: inline-block;
		float: left;
		cursor: pointer;
		position: relative;
		top: 10px;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	.toggle:last-child {
		margin-left: 10px;
	}
	.toggle:hover {
		background: #ccc;
	}
	.toggle:active {
		top: 11px;
	}
	.left-arrow {
		border-top: 10px solid transparent;
		border-bottom: 10px solid transparent;
		border-right: 10px solid white;
		border-left: 0;
		display: inline-block;
		vertical-align: top;
	}
	.right-arrow {
		border-top: 10px solid transparent;
		border-bottom: 10px solid transparent;
		border-right: 0;
		border-left: 10px solid white;
		display: inline-block;
		vertical-align: top;
	}
</style>
