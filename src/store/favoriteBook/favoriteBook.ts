import { getFavoritesBookFromServer } from '@/services/getBooksFromServer';
import { booksInList, pages } from "@/services/const";
import router from "@/router";

interface stateObj {
}

export default {
  actions: {
		async initFavoriteBooksList({ commit, getters, dispatch }: any) {
			dispatch('clearBooksArray');
      commit('startFirstLoading');
      var idArr: string[] = [];
      if (getters.allFavoritesBook.length === 0) {
        commit('endFirstLoading');
        return;
      }
			for (let i = 0; i < booksInList && i < getters.allFavoritesBook.length; i++) {
				idArr[i] = getters.allFavoritesBook[i];
      }
      try {
        var json = await getFavoritesBookFromServer(idArr);
				commit('setBooksList', json);
				commit('setPageCount', Math.ceil(getters.allFavoritesBook.length / booksInList))
        commit('endFirstLoading');
      }
      catch(error) {
        commit('firstLoadingError');
      }
    },
    async changeFavoritePage( { commit, getters } : any, newPage: number ) {
      commit('clearBooksArray');
      commit('startPageLoading');
      commit('setCurrentPage', newPage);
			var idArr: string[] = [];
      for (let i = 0; i < 4 && (i + getters.currentPage * 4) < getters.allFavoritesBook.length; i++) {
        idArr[i] = getters.allFavoritesBook[i + getters.currentPage * 4];
      }
      try {
				var json = await getFavoritesBookFromServer(idArr)
        commit('setBooksList', json);
        commit('endPageLoading');
      }
      catch(error){
        commit('errorPageLoading');
      }
    },
    deleteFromFavorites( { commit, getters, dispatch } : any, id: string) {
      var favorites = getters.favorites.replace(',' + id + ',', '');
      commit('setFavorites', favorites);
      dispatch('clearCurrentBook');
      dispatch('initFavoriteBooksList');
    }
  }
}