<template>
  <div>
    <Book 
      v-for="(book, index) of books"
      :key="index"
      :book="book.volumeInfo"
      :id="book.id"
    />
  </div>
</template>

<script>
import Book from './Book.vue';
import { mapGetters } from 'vuex'

export default {
  components: {
    Book
  },
  computed: mapGetters(['books'])
}
</script>