<template>
  <div class="current-book">
    <div @click="clearCurrentBook" class="close-current-book">
      <font-awesome-icon icon="arrow-left"/>
    </div>
    <div class="title">
      <img 
        v-if="currentBook.bookInfo.imageLinks"
        :src="currentBook.bookInfo.imageLinks.thumbnail"
        class="cover"
      />
      <div class="current-book-info">
        <h2 v-if="currentBook.bookInfo.title">{{ currentBook.bookInfo.title }}</h2>
        <div class="authors-block" v-if="currentBook.bookInfo.authors && currentBook.bookInfo.authors.length !== 0">
	        <span class="unimportant-text">Автор:&nbsp;</span>
          <span class="authors-text">{{ currentBook.bookInfo.authors.join(', ') }}</span>
        </div>
        <div class="year-block" v-if="currentBook.bookInfo.publishedDate">
          <span class="unimportant-text">Год:&nbsp;</span>
          <span>{{ currentBook.bookInfo.publishedDate.substring(0, 4) }}</span>
        </div>
        <div class="rating-block">
          <Rating
            :rating="currentBook.bookInfo.averageRating || 0"
            :sizeStar="'big'"
            class="current-book-rating"
          />
          <span class="unimportant-text">Рейтинг:&nbsp;</span>
          <span>{{ currentBook.bookInfo.averageRating || 0 }}</span>
        </div>
        <div class="current-book-control">
          <span
            @click="doFavorites(currentBook.id)" 
            class="to-favorites"
            :class="isFavorites===true? 'is-favorites': ''"
					>
          	<font-awesome-icon :icon="isFavorites===true? ['fas','heart'] : ['far','heart']" />
          	&nbsp;
            <span v-if="isFavoritePage!==true">{{isFavorites===true? "Перейти" : "В избранное"}}</span>
         	</span>
          <span @click="openShareWindow"><font-awesome-icon icon="share" />&nbsp;<span>Поделиться</span></span>
        </div>
      </div>
    </div>
    <div 
      v-if="currentBook.bookInfo.description"
      class="annotation"
    >
      <h4>Аннотация</h4>
	    <div>{{ currentBook.bookInfo.description }}</div>
    </div>
    <ShareWindow v-if="shareWindow" />
  </div>
</template>

<script>
import Rating from '@/components/Rating';
import ShareWindow from './ShareWindow';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    Rating, ShareWindow
	},
  computed: mapGetters(['currentBook', 'isFavorites', 'isFavoritePage', 'shareWindow']),
	methods: mapActions(['clearCurrentBook', 'doFavorites', 'openShareWindow', 'clearCurrentBook'])
}
</script>

<style lang="scss">
@import '../../scss/const.scss';
$current-book-x-padding: 70px;
$current-book-y-padding: 40px;
.current-book {
  background-color: $hover-color;
  height: 100%;
  text-align: left;
  box-sizing: content-box;
}
.title {
  margin-bottom: 30px;
}
.cover {
  margin-right: 20px;
  width: 100%;
}
.close-current-book {
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  left: 0;
  right: 0;
  padding: 20px;
}
.close-current-book > svg {
  font-size: 40px;
  color: white;
  cursor: pointer;
}
.current-book-info {
  position: relative;
  padding: 0 15px;
}
.annotation {
  padding: 0 15px;
}
@media screen and (min-width: 576px) {
  .close-current-book {
    display: none;
  }
  .title {
    display: flex;
  }
  .current-book {
    padding: $current-book-y-padding $current-book-x-padding;
    height: calc(100% - #{2*$current-book-y-padding})
  }
  .cover {
    margin-right: 20px;
    width: 128px;
  } 
  .current-book-info {
    padding: 0;
  }
  .annotation {
    padding: 0;
  }
}
.authors-block{
  margin-bottom: 5px;
}
.year-block {
  margin-bottom: 20px;
}
.rating-block {
  margin-bottom: 30px;
}
.unimportant-text {
  color: #8c9595;
}
.authors-text {
  color: #417505;
}
.current-book-rating {
  display: inline-block;
  margin-right: 10px;
}
.current-book-control {
	font-size: 12px;
	color: #c7cad2;
}
.current-book-control svg {
	font-size: 16px;
}
.current-book-control > span:not(:last-child) {
  margin-right: 20px;
}
.current-book-control > span {
  cursor: pointer;
}
.to-favorites {
  width: 95px;
  display: inline-block;
}
.is-favorites svg {
  color: red;
}
.to-favorites:hover svg {
  color: red;
}
.current-book-control > span:hover > span {
  color: #417505;
  text-decoration: underline;
}
</style>