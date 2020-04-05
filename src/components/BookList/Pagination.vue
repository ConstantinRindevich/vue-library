<style lang="scss" scoped>
@import '../../scss/const.scss';
$textColor: #848e8e;
.pagination {
  display: flex;
  padding-left: 0;
  list-style: none;
  border-radius: .25rem;
  justify-content: center;
  position: relative;
}
@media screen and (min-width: 576px) {
  .pagination {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
.page-item {
  position: relative;
  display: block;
  padding: .5rem .75rem;
  margin-left: -1px;
  line-height: 1.25;
  color: $textColor;
  background-color: $background-white-color;
  border: 1px solid #ccc;
  cursor: pointer;
}
.loading .page-item {
  cursor: default;
}
.page-item:first-child {
  margin-left: 0;
  border-top-left-radius: .25rem;
  border-bottom-left-radius: .25rem;
}
.page-item.current-page {
  background-color: $textColor;
  border: $textColor;
  color: $background-white-color;
}
.page-item:not(.current-page):hover {
  background-color: $hover-color;
}
.page-item.disabled {
  color: #b0b0b0;
  pointer-events: none;
  cursor: auto;
}
@media screen and (min-width: 576px) {
  .book-cover {
    display: block;
  }
}
</style>

<template>
  <ul 
    class="pagination"
    :class="pageLoading? 'loading' : ''"  
    v-if="pageCount !== 0"
  >
    <li class='page-item ' :class="currentPage === 0? 'disabled' : ''" @click="!pageLoading? prevPage : null">
      &laquo;
    </li>
    <li class="page-item"
      v-for="pageNumber in (pageCount > maxVisiblePage? maxVisiblePage : pageCount)"
      :key="pageNumber"
      :class="(currentPage + 1) === (pageNumber + increasePage)? 'current-page' : '' "
      @click="!pageLoading? changePage(pageNumber + increasePage - 1) : null"
    >
    {{pageNumber + increasePage}}
    </li>
    <li class="page-item" :class="currentPage === (pageCount - 1) ? 'disabled' : ''" @click="!pageLoading? nextPage : null">
      &raquo;
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  methods: mapActions(['nextPage', 'prevPage', 'changePage']),
  computed: mapGetters(['pageCount', 'currentPage', 'pageLoading', 'increasePage', 'maxVisiblePage'])
}
</script>
