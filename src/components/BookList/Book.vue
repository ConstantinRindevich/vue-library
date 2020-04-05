<style lang="scss" scoped>
@import '../../scss/const.scss';
.book {
  display: flex;
  text-align: left;
  padding: 10px
}
.book-cover {
  margin-right: 20px;
  min-width: 64px;
  width: 64px;
  display:none;
}
.book-info {
  font-size: 12px;
}
.book:hover{
  background-color: $hover-color;
  cursor: pointer;
}
.book-description {
  max-height: 42px;
  overflow-y: hidden;
}
@media screen and (min-width: 576px) {
  .book-cover {
    display: block;
  }
}
</style>

<template>
  <div>
    <div class="book" @click="getBook">
      <img
        v-if="book.imageLinks"
        :src="book.imageLinks.smallThumbnail" 
        class="book-cover"
      />
    	<div class="book-info">
        <Rating
          :rating="book.averageRating || 0" 
        />
        <h3>{{ book.title }}</h3>
        <div class="book-description" >{{ description }}</div>
      </div>
    </div>
    <hr/>
  </div>
</template>

<script>
import Rating from '@/components/Rating';
import shave from 'shave/dist/shave';
import { mapActions } from 'vuex';

export default {
  props: {
    book: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  components: {
    Rating
  },
  computed: {
    description() {
      if (this.book.description && this.book.description.length > 200) {
        return this.book.description.substring(0, 200) + '...'
      }
      else {
        return this.book.description
      }
    }
  },
  methods: {
    ...mapActions(['setCurrentBook']),
    getBook() {
      this.setCurrentBook({bookInfo: this.book, id: this.id});
    }
  }
}
</script>