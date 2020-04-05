import router from "@/router";
import {pages} from '@/services/const'

interface currentBookObj {
  book: Object,
  id: string
};

interface stateObj {
	books: Object[],
	firstLoading: boolean,
	firstLoadingError: boolean,
	favorites: string,
	currentRouteName: string | null | undefined
}

export default {
  actions: {
		routeToFavorites({ commit } : any) {
			router.push(pages.favoritesPage.path);
			commit('clearLoadingInfo');
			commit('setBooksList');
			commit('setPageCount', 0);
			commit('updateCurrentRouteName');
		},
		routeToSearch({ commit } : any) {
			router.push(pages.searchPage.path);
			commit('clearLoadingInfo');
			commit('setBooksList', null);
			commit('setPageCount', 0);
			commit('updateCurrentRouteName');
		},
		clearBooksArray({ commit } : any) {
      commit('clearBooksArray');
			commit('setPageCount', 0);
      commit('setCurrentPage', 0);
		},
		initCurrentRouteName({ commit } : any) {
			commit('updateCurrentRouteName');
		}
  },
  mutations: {
		clearBooksArray(state: stateObj) {			
      state.books = [];
		},
		clearLoadingInfo(state: stateObj) {
			state.firstLoading = false;
			state.firstLoadingError = false;
		},
		setBooksList(state: stateObj, books : Object[] ) {
			state.books = books;
		},
		startFirstLoading(state: stateObj) {
			state.firstLoading = true;
			state.firstLoadingError = false;
		},
		endFirstLoading(state: stateObj) {
			state.firstLoading = false;
		},
		firstLoadingError(state: stateObj) {
			state.firstLoading = false;
			state.firstLoadingError = true;
		},
		setFavorites(state: stateObj, newFavorites: string) {
			localStorage.setItem('favorites-book', newFavorites),
			state.favorites = newFavorites;
		},
		updateCurrentRouteName(state: stateObj) {
			state.currentRouteName = router.currentRoute.name;
		}
  },
  state: {
		books: [],
		firstLoading: false,
		firstLoadingError: false,
		favorites: localStorage.getItem('favorites-book'),
		currentRouteName: ''
  },
  getters: {
		books(state: stateObj) : Object[] {
			return state.books;
		},
		firstLoading(state: stateObj) : boolean {
			return state.firstLoading
		},
		firstLoadingError(state: stateObj) : boolean {
			return state.firstLoadingError
		},
		isFavorites(state: stateObj, getters: any) : boolean {
			var id = getters.currentBook.id;			
			if (state.favorites && state.favorites.indexOf(',' + id + ',') > -1) {
				return true;
			}
			return false;
		},
		favorites(state: stateObj) {
			return state.favorites;
		},
    isSearchPage(state: stateObj) {
      return state.currentRouteName === pages.searchPage.name;
    },
    isFavoritePage(state: stateObj) {
      return state.currentRouteName === pages.favoritesPage.name;
		},		
		allFavoritesBook(state : stateObj) {
			return state.favorites.split(',').filter(id => id !='')
    }
  }
}