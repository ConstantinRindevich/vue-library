<template>
	<div 
		class="filter-book"
		@blur="clearAutocomplete"
	>
		<input 
			class="filter" 
			placeholder="Поиск"
			v-model="filter"
			@keydown="filterChange"
			@input="runAutocomplete"
			autocomplete="off"
			spellcheck="false"	
		>
		<font-awesome-icon
			v-if="filter===''"
			icon="search"
			class="filter-icon"
		/>
		<font-awesome-icon
			v-else
			icon="times"
			class="filter-icon"
			@click="clearFilter"
		/>
		<div>
			<ul 
				v-if="autcompleteIsOpen"
				class="autocomplete"
			>
				<li 
					v-for="(autocomplete, index) of autocompleteData"
					:key="index"
					@click="filterFromAutcomplete(autocomplete)"
				>
					{{autocomplete}}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      filter: this.getFilter
    }
	},
	computed: mapGetters(['getFilter', 'autcompleteIsOpen', 'autocompleteData', 'firstLoading']),
  methods: {
		...mapActions(['filtered', 'initAutocomplete', 'clearAutocomplete']),
		filterChange(event) {
			if (event.key !== 'Enter') {
				return;
			}
			this.filtered(this.filter);
		},
		clearFilter() {
			this.filter='';
			this.filtered(this.filter);
		},
		runAutocomplete(event) {
			if (this.firstLoading) {
				event.preventDefault();
				this.filter = this.getFilter;
				return;
			}
			this.initAutocomplete(this.filter);
		},
		filterFromAutcomplete(autocomplete) {
			this.filter=autocomplete;
			this.filtered(this.filter);
		}
	}
}
</script>

<style lang="scss">
@import '../../scss/const.scss';
$filter-icon-width-height: 20px;
$filter-indent : $button-favorites-margin-right + $button-favorites-width-height;
$filter-padding: ($button-favorites-width-height - 20px)/2;
.filter-book {
	position: relative;
	width: calc(100% - #{$filter-indent});
	@include control-box-shadow;
}
.filter {
  width: 100%;
  padding: $filter-padding;
	padding-right: $filter-padding + $filter-icon-width-height;
	height: $button-favorites-width-height;
	box-sizing: border-box;
}
.filter-icon {
	position: absolute;
  width: $filter-icon-width-height !important;
  height: $filter-icon-width-height !important;
  right: $filter-padding;
  top: $filter-padding;
	cursor: pointer;
	color: #566363
}
.autocomplete {
	list-style: none;
	margin: 0;
	padding: 10px 0;
	text-align: left;
	position: absolute;
	@include control-box-shadow;
	background-color: $background-white-color;
}
.autocomplete > li {
	padding: 5px 10px;
	cursor: pointer;
}
.autocomplete > li:hover {
	background-color: $hover-color;
}
</style>