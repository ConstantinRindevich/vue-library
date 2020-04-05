<style lang="scss" scoped>
@import '../scss/page.scss';
</style>

<template>
  <div class="page">
    <div class="book-full-info">
      <img 
        v-if="!checkCurrentBook"
        class="title-img"
        src="../assets/title.png"
        :class="isFiltered===true? 'hidden': ''"
      />
      <CurrentBook 
        v-else
      />
    </div>
    <SearchBook
      :class="checkCurrentBook? 'current-book-opened': ''"
    />
  </div>
</template>

<script>
import CurrentBook from '@/components/CurrentBook/CurrentBook.vue';
import SearchBook from '@/components/SearchBook/SearchBook.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Search',
  computed: mapGetters(['isFiltered', 'checkCurrentBook']),
  methods: mapActions(['initCurrentRouteName']),
  mounted() {
    this.initCurrentRouteName();
  },
  components: {
    SearchBook, CurrentBook
  }
}
</script>
