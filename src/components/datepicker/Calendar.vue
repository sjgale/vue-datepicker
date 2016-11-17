<template lang="html">
	<div class="month">
		<table>
			<thead>
				<tr>
					<th class="title" colspan=7>{{ fetchMonth(correctedMonth) }}, {{ correctedYear }}</th>
				</tr>
				<tr>
					<th>S</th>
					<th>M</th>
					<th>T</th>
					<th>W</th>
					<th>T</th>
					<th>F</th>
					<th>S</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="week in monthDays">
					<td v-for="day in week" :class="dayClass(day)">{{ formatDate(day) }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import prepareMonth from './prepareMonth'

export default {
	props: ['month', 'year', 'start', 'end'],
	data () {
		return {
			monthDays: []
		}
	},
	computed: {
		correctedMonth () {
			return this.month > 12 ? this.month % 12 : this.month
		},
		correctedYear () {
			return this.month > 12 ? Number(this.year) + 1 : this.year
		},
		monthDays () {
			return prepareMonth(this.correctedMonth, this.correctedYear)
		}
	},
	methods: {
		formatDate (day) {
			if (day === '') {
				return day
			}
			let date = new Date(day)
			return date.getDate()
		},
		fetchMonth (month) {
			return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][month - 1]
		},
		dayClass (day) {
			let classes = '',
				startDate = new Date(this.start),
				endDate = new Date(this.end),
				currentDate = new Date(day)

			classes += day !== '' ? 'date ' : ''
			classes += currentDate.valueOf() >= startDate.valueOf() && currentDate.valueOf() <= endDate.valueOf() ? 'in-range ' : ''
			return classes
		}
	},
	components: {}
}
</script>

<style lang="css">
	table {
		margin-left: 10px;
		border-collapse: collapse;
	}
	thead {
		border: 1px solid #aaa; /* for alignment */
	}
	tr {
		height: 25px;
	}
	td {
		border: 1px solid #bbb;
		color: #888;
		background: white;
		vertical-align: middle;
		text-align: center;
		width: 30px;
	}
	td.date:hover {
		background-color: #ccc;
		cursor: pointer;
	}
	td.in-range {
		background: #ddd;
	}
	th {
		border: none;
		background: #aaa;
		text-align: center;
		color: #666;
	}
	.title {
		color: white;
		padding-top: 5px;
		font-weight: normal;
	}
</style>
