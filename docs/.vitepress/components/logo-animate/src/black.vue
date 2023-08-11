<template>
	<section class="logo-black">
		<span></span>
	</section>
</template>
<style>
.logo-black {
	width: 84px;
	height: 84px;
	background: #000;
	position: relative;
	transform: rotate(45deg);
	overflow: hidden;
	clip-path: polygon(33% 0, 100% 0, 100% 100%, 0 100%, 0 33%, 33% 33%, 33% 0);
	margin: -5px auto auto;
	animation: logo-black var(--t) infinite var(--play-status);
}
.logo-black::before,
.logo-black::after {
	content: '';
	position: absolute;
	background-color: #fff;
	width: 6px;
	height: 100%;
}
.logo-black::before {
	top: 25%;
	left: 10%;
	transform: rotate(-45deg);
}
.logo-black::after {
	top: -25%;
	right: 10%;
	transform: rotate(-45deg);
}
.logo-black span {
	position: absolute;
	top: 25%;
	left: 25%;
	width: 100%;
	height: 100%;
	background: linear-gradient(to bottom, #fff 50%, #000 50%) 50% 0 / 10% 20% repeat-y;
	transform: rotate(-45deg);
}
@keyframes logo-black {
	0%,
	10%,
	90%,
	100% {
		transform: translateY(0) rotate(45deg);
	}
	35% {
		transform: translate(10px, -10px) rotate(45deg);
	}
	40% {
		transform: translate(0, 0) rotate(45deg);
	}
	50% {
		transform: translate(10px, 10px) rotate(45deg);
	}
	65% {
		transform: translate(0, 0) rotate(45deg);
	}
	70% {
		transform: translate(10px, -10px) rotate(45deg);
	}
	75% {
		transform: translate(10px, 10px) rotate(45deg);
	}
	20%,
	30%,
	80% {
		transform: translateY(5px) rotate(45deg);
	}
}
</style>
