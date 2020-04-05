<style lang="scss" scoped>
@import '../../scss/const.scss';
@import '../../scss/list.scss';
$button-favorites-width-height: 40px;
.list-area.favorites {
  width: 100%;
}
.list-area.favorites .book-list {
  padding: 0 $padding-x-min;
}
@media screen and (min-width: 576px) {
  .list-area.favorites .book-list {
    padding: 0;
  }
}
.control {
  background-color: $hover-color;
  padding: 5px 10px;
}
@media screen and (min-width: 576px) {
  .control {
    background-color: rgba(0, 0, 0, 0);
    position: relative;
  }
}

.back {
  background-color: $hover-color;
  width: 16px;
  height: 16px;
  border-radius: 20px;
  padding: 5px;
  cursor: pointer;
  margin: auto 10px auto 0;
}
</style>

<template>   
  <div class="list-area favorites">
    <div class="control">
        <div
          class="back"
          @click="backToSearch"
        >
            <font-awesome-icon icon="arrow-left"/>
        </div>
				<h2 style="margin: 0">
					Избранное
				</h2>
    </div>
		<Loader v-if="firstLoading"/>
    <ErrorLoading v-else-if="firstLoadingError"/>
		<BookList 
      v-else
		/>
  </div>
</template>

<script>
import BookList from "@/components/BookList/BookList.vue";
import Loader from '@/components/Loader';
import ErrorLoading from '@/components/ErrorLoading';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    BookList, Loader, ErrorLoading
	},
  mounted() {
    this.initFavoriteBooksList();
  },
  computed: mapGetters(['firstLoading', 'firstLoadingError']),
  methods: {
    ...mapActions(['clearCurrentBook', 'initFavoriteBooksList', 'routeToSearch']),
    backToSearch() {
      this.routeToSearch();
      this.clearCurrentBook();
    }
  }
}
</script>
