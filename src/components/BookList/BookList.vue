<template>
	<div class="book-list"  v-if="pageCount > 0">
	  <Loader v-if="pageLoading"/>
    <ErrorLoading 
      v-else-if="pageLoadingError"
    />
		<ListOfBook 
      v-else
		/>
    <Pagination v-if="pageCount > 1"
    />
	</div>
</template>

<script>
import Book from './Book.vue';
import ListOfBook from './ListOfBook.vue';
import Pagination from './Pagination.vue';
import Loader from '@/components/Loader';
import ErrorLoading from '@/components/ErrorLoading';
import { mapGetters } from 'vuex';

export default {
  components: {
    Book, ListOfBook, Pagination, Loader, ErrorLoading
  },
  computed: mapGetters(['pageCount','pageLoading','pageLoadingError'])
}
</script>