<style lang="scss" scoped>
@import '../scss/page.scss';
</style>

<template>
  <div class="page">
    <div class="book-full-info">
      <img 
        v-if="!checkCurrentBook"
        class="title-img hidden"
        src="../assets/title.png"
      />
      <CurrentBook 
        v-else
        :favoritePage="true"
      />
    </div>
    <FavoritesBook
      :class="checkCurrentBook? 'current-book-opened': ''"
    />
  </div>
</template>

<script>
import CurrentBook from '@/components/CurrentBook/CurrentBook.vue'
import FavoritesBook from '@/components/FavoritesBook/FavoritesBook.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Favorites',
  computed: mapGetters(['isFiltered', 'checkCurrentBook']),
  methods: mapActions(['initCurrentRouteName']),
  mounted() {
    this.initCurrentRouteName();
  },
  components: {
    FavoritesBook, CurrentBook
  }
}
</script>
