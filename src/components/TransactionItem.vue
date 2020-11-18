<template>
	<div class="transaction">
		<details>
			<summary>
				<div class="transaction-info">
					<div class="icon"></div>
					<div class="data">
						<div class="order">
							Заказ: <b>{{ event_id }}</b>
						</div>
						<div class="time">
							<time datetime="2019-04-18T16:45">{{ time }}</time>
						</div>
					</div>
				</div>
				<div class="account-info">
					<div class="account">{{ account_number }}</div>
					<div :class="additionalClasses" class="amount">{{ amount }}</div>
				</div>
			</summary>
			<p v-if="description" class="description">
				{{ description }}
			</p>
		</details>
	</div>
</template>

<script>
export default {
	name: 'TransactionItem',
	props: {
		event_id: {
			required: false,
			type: Number,
		},
		id: {
			required: false,
			type: String,
		},
		order: {
			required: false,
			type: [String, Number, undefined],
		},
		amount: {
			required: true,
			type: Number,
		},
		currency: {
			required: true,
			type: String,
		},

		account_number: {
			required: false,
			type: String,
		},
		type: {
			required: true,
			type: String,
		},
		time: {
			required: true,
			type: String,
		},
		description: {
			required: false,
			type: String,
		},
	},
	computed: {
		additionalClasses() {
			// or other status codes that we need to know and map as object;
			const isPositive = this.type === 'WITHDRAWAL' ? 'negative' : 'positive';
			const currency = this.currency === 'RUB' ? 'rubles' : '';
			return `${isPositive} ${currency}`;
		},
	},
};
</script>

<style scoped lang="css">
input {
	border: 0;
	margin: 0;
	padding: 0;
}

input:focus {
	outline: none;
}

summary::-webkit-details-marker {
	display: none;
}

.transaction {
	position: relative;
	width: 100%;
	background: #27283c;
	margin-top: 10px;
	padding: 20px;
}

.transaction .description {
	padding: 10px;
	background-color: #ccc;
	border-radius: 4px;
	overflow: hidden;
	color: #212121;
}

.transaction-info {
	display: flex;
	flex-direction: row;
}

.transaction-info .icon {
	position: relative;
	width: 36px;
	height: 36px;
	background-repeat: no-repeat;
	background-position: center;
	background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/3207673/credit-card--white.svg);
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background-color: #24a84d;
}

.transaction-info .data {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	left: 20px;
}

.account-info {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: center;
}

.amount {
	order: 2;
	font-size: 18px;
	font-weight: 800;
	flex-basis: 45%;
	text-align: right;
	color: #fff;
}
.amount.negative {
	color: #d87822;
}
.amount.negative:before {
	content: '- ';
}
.amount.positive {
	color: #39b27c;
}
.amount.positive:before {
	content: '+ ';
}
.amount.rubles:after {
	content: ' ₽';
}

summary {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.description {
	margin-top: 20px;
}
details {
	position: relative;
}
</style>
