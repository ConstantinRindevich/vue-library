<template>
  <div class="window">
    <div class="window-body">
			<div>
				<font-awesome-icon
					icon="times"
					class="close-icon"
					@click="closeShareWindow"
				/>
			</div>
			<ul class="share-list">
				<li @click='twitter'>
					<span class="twitter"></span>
					<span>&nbsp;Twitter</span>
				</li>
				<li @click='VK'>
					<span class="VK"></span>
					<span>&nbsp;ВКонтакте</span>					
				</li>
			</ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	computed: mapGetters(['currentBookInString']),
	methods: mapActions(['closeShareWindow','twitter','VK'])
}
</script>

<style lang="scss">
@import '../../scss/const';
$share-item-height: 32px;
@mixin webIcons {
	background-image: url('data:image/png;base64,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');
	width: $share-item-height;
	height: $share-item-height;
}
.window {
	background-color: rgba(0, 0, 0, 0.3);
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 100;
}
.window-body {
	background-color: $background-white-color;
	width: 200px;
	border-radius: 10px;
	margin: 100px auto;
	position: relative;
}
.close-icon {
	position: absolute;
  right: 10px;
  top: 10px;
	cursor: pointer;
	color: black
}
.share-list {
	list-style: none;
	margin: 0;
	padding: 10px;
}
.share-list > li {
	padding: 30px 0;
	font-size: 16px;
	cursor: pointer;
}
.share-list > li > span {
	display: table-cell;
}
.share-list > li > span:last-child {
	line-height: $share-item-height;
	padding-left: 5px;
}
.share-list > li:hover > span:last-child {
	text-decoration: underline;
}
.twitter {
	@include webIcons;
}
.VK {
	@include webIcons;
	background-position-x: -32px;
}
</style>