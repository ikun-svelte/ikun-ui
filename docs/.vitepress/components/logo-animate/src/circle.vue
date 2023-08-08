<template>
	<section class="logo-circle"></section>
	<section class="shadow"></section>
</template>
<style>
.logo-circle {
	width: 100%;
	height: 130px;
	position: absolute;
	top: 0;
	left: 0;
	animation: logo-circle var(--t) infinite var(--play-status);
}
.logo-circle::after {
	content: '';
	position: absolute;
	width: 30px;
	height: 30px;
	background-color: #f80;
	border-radius: 50%;
	bottom: 0;
	left: 0;
	animation: play 1s infinite;
}
.shadow {
	position: absolute;
	bottom: -30px;
	left: 0;
	width: 30px;
	height: 10px;
	border-radius: 50%;
	background: radial-gradient(#666, transparent 50%);
	animation: play-shadow 1s infinite;
	transform: scale(0.5);
}
.play .logo-circle::after {
	animation-play-state: paused;
}
.play .shadow {
	display: none;
}
@keyframes logo-circle {
	25% {
		transform: rotate(-60deg);
	}
	50% {
		transform: rotate(-90deg);
	}
	75% {
		transform: rotate(-30deg);
	}
}
@keyframes play {
	40% {
		transform: translateY(20px);
	}
}
@keyframes play-shadow {
	40% {
		transform: scale(1);
	}
}
@keyframes run-shadow {
	25% {
		left: 78px;
		transform: scale(1) translateY(10px);
	}
	50% {
		left: 118px;
		transform: scale(0.5);
	}
	75% {
		left: 40px;
		transform: scale(1) translateY(10px);
	}
}
</style>
