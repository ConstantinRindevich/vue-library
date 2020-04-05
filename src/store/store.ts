import Vuex from 'vuex';
import Vue from 'vue';
import favoriteBook from './favoriteBook/favoriteBook';
import searchBook from './searchBook/searchBook';
import general from './general/general';
import pages from './general/pages';
import currentBook from './general/currentBook';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        searchBook, general, favoriteBook, pages, currentBook
    }
})