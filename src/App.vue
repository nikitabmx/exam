<template>
	<div>
		<div id="report">
			<div v-if="list.length" class="report-list">
				<div v-for="el in list" :key="el.id" class="list-item">
					<span v-if="el.date" class="date-separator"> {{ el.date }}</span>
					<transaction-item v-else v-bind="el" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import TransactionItem from '@/components/TransactionItem';
import netClient from '@/net-client/base';
import moment from 'moment';

export default {
	name: 'app',
	data: () => ({
		loading: false,
		list: [],
	}),
	components: {
		TransactionItem,
	},
	async mounted() {
		await this.fetchData();
	},
	methods: {
		async fetchData() {
			try {
				this.loading = true;
				const { result } = (await netClient.requestData(1)) || {};
				this.list = result?.length ? this.prepareDataList(result) : [];
			} catch (error) {
				console.error('Ошибка выполнения запроса: ', error);
			} finally {
				this.loading = false;
			}
		},
		prepareDataList(dataList) {
			const arr = [];
			
			const sorted = dataList.sort((a, b) =>
				moment(a.created_at).isAfter(b.created_at) ? -1 : 1,
			);
			
			sorted.forEach((el, i) => {
				const currentDay = moment()
					.startOf('day')
					.toISOString();
				const currentArrDate = moment(el.created_at)
					.startOf('day')
					.toISOString();

				const separatorDate = moment(el.created_at).format('DD.MM.YYYY');

				const isYesterday = moment(
					moment()
						.add(-1, 'days')
						.startOf('day')
						.toISOString(),
				).isSame(currentArrDate);

				const isToday = moment(currentArrDate).isSame(currentDay);
				const separator = isToday ? 'Сегодня,' : isYesterday ? 'Вчера,' : '';
				const arrDayToCompare =
					i === 0
						? moment(sorted[i + 1].created_at)
								.startOf('day')
								.toISOString()
						: moment(sorted[i - 1].created_at)
								.startOf('day')
								.toISOString();
				const isSameDay = moment(arrDayToCompare).isSame(currentArrDate);

				if (sorted.length === 1 || i === 0 || !isSameDay) {
					const separatorItem = {
						id: i,
						date: `${separator} ${separatorDate}`,
					};
					arr.push(separatorItem);
				}

				arr.push({
					id: el.public_id,
					event_id: el.event_id,
					order: el.order,
					amount: el.amount,
					currency: el.currency,
					account_number: el.account_number,
					description: el.description,
					type: el.type,
					time: moment(el.created_at).format('HH:mm'),
				});
			});
			return arr;
		},
	},
};
</script>

<style lang="css">
@charset "UTF-8";

html {
	line-height: 1.46;
	-ms-text-size-adjust: 100%;
	-webkit-text-size-adjust: 100%;
}

body {
	margin: 0;
	text-align: center;
}

h1,
h2,
h3,
h4 {
	margin: 0;
}

p {
	margin: 0;
}

ul {
	padding: 0;
	list-style: none;
}

dl,
dd {
	margin: 0;
}

h1 > small,
h1 > time {
	display: block;
}

input {
	border: 0;
	margin: 0;
	padding: 0;
}
input:focus {
	outline: none;
}

article,
figure {
	display: block;
}

figure {
	margin: 1em 40px;
}

summary:focus {
	outline: none;
}

fieldset {
	border: 0;
	margin: 0;
	padding: 0;
}

button {
	border: 0;
	cursor: pointer;
}

a {
	background-color: transparent;
	-webkit-text-decoration-skip: objects;
}

a:active,
a:hover {
	outline-width: 0;
}

:root {
	font-size: 0.875rem;
}
@media (min-width: 24em) {
	:root {
		font-size: 0.9375rem;
	}
}
@media (min-width: 48em) {
	:root {
		font-size: 1rem;
	}
}

body {
	cursor: default;
	font-family: 'Montserrat', sans-serif;
	color: #ccc;
	background: #1e1d2f;
}
#report {
	display: flex;
	align-items: center;
}
.report-list {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 100px;
	width: 100%;
}
.list-item {
	position: relative;
	display: flex;
	margin-top: 10px;
	width: 100%;
}
.date-separator {
	margin-top: 20px;
	padding: 0 10px;
	text-align: left;
	color: #848497;
	left: 10px;
}
</style>
