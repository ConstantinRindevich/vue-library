
<style lang="scss" scoped>
@import '../../scss/const.scss';
@import '../../scss/list.scss';
.list-area.search {
  padding: 40px $padding-x-min 70px;
  width: calc(100% - #{2*$padding-x-min});
}
.favorites {
  margin-right: $button-favorites-margin-right;
  width: $button-favorites-width-height;
  height: $button-favorites-width-height;
  border-radius: 5px;
  background-color: $background-white-color;
  border: 1px solid;
  font-size: 22px;
  padding: 0;
  color: #4b5959;
  cursor: pointer;
  @include control-box-shadow;
}
.favorites:hover {
  background-color: $hover-color;
}
</style>

<template>   
  <div class="list-area search">
    <div class="control">
      <button 
        class="favorites"
        @click="goFavorites"
      >
        <font-awesome-icon :icon="['fas','heart']" />        
      </button>
      <FilterBook
      />
    </div>
		<Loader v-if="firstLoading"/>
    <ErrorLoading v-else-if="firstLoadingError"/>
		<BookList 
      v-else
		/>

  </div>
</template>

<script>
import FilterBook from "./FilterBook.vue";
import BookList from "@/components/BookList/BookList.vue";
import Loader from '@/components/Loader';
import ErrorLoading from '@/components/ErrorLoading';

import { mapGetters, mapActions } from 'vuex';



export default {
  components: {
    BookList, Loader, FilterBook, ErrorLoading
  },
  computed: mapGetters(['firstLoading','firstLoadingError']),
  methods: {
    ...mapActions(['clearCurrentBook', 'routeToFavorites']),
    goFavorites() {
      this.routeToFavorites();
      this.clearCurrentBook();
    }
  }
}
</script>