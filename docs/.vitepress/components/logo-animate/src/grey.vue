<template>
	<section class="logo-grey"></section>
</template>
<style>
.logo-grey {
	width: 52px;
	height: 52px;
	position: relative;
	transform: rotate(135deg);
	margin: auto;
	animation: logo-grey var(--t) infinite cubic-bezier(0.68, -0.55, 0.265, 1.55) var(--play-status);
	overflow: hidden;
}
.logo-grey::before,
.logo-grey::after {
	content: '';
	position: absolute;
	width: 52px;
	height: 26px;
	background-color: #999;
	/*border-radius: 0 0 0 100%;*/
}
.logo-grey::before {
	left: 0;
	transform-origin: 100% 0;
	transform: rotate(8deg);
	animation: mid-split-right var(--t) infinite cubic-bezier(0.68, -0.55, 0.265, 1.55)
		var(--play-status);
}
.logo-grey::after {
	width: 26px;
	height: 52px;
	right: 0;
	transform-origin: 100% 0;
	transform: rotate(-8deg);
	animation: mid-split-left var(--t) infinite cubic-bezier(0.68, -0.55, 0.265, 1.55)
		var(--play-status);
}
@keyframes logo-grey {
	0%,
	50%,
	100% {
		transform: translateY(0) rotate(135deg);
	}
	25%,
	75% {
		transform: translateY(10%) rotate(135deg);
	}
}
@keyframes mid-split-left {
	0%,
	50%,
	100% {
		transform: rotate(-8deg);
	}
	30%,
	80% {
		transform: rotate(1deg);
	}
}
@keyframes mid-split-right {
	0%,
	50%,
	100% {
		transform: rotate(8deg);
	}
	30%,
	80% {
		transform: rotate(-1deg);
	}
}
</style>
