import { getBooksFromServer, getTitlesFromServer } from '@/services/getBooksFromServer';
import { booksInList, pages } from "@/services/const";
import router from "@/router";

interface stateObj {
  filter: string,
  autocompleteData: string[],
  isFiltered: boolean,
  controller: AbortController
}

export default {
  actions: {
		async filtered({ commit, getters, dispatch }: any, filter: string) {
      commit('controllerAbort');
      commit('setAutocomplete', []);
      commit('clearLoadingInfo');
      dispatch('clearBooksArray');
      commit('setCurrentBook', null);
      commit('setFilter', filter);
      commit('isFiltered');
			if (filter === '') {        
        commit('isNotFiltered');
				return;
      }
      commit('startFirstLoading');
      try {
        var json = await getBooksFromServer(filter, booksInList, getters.currentPage * booksInList);
        commit('setBooksList', [...json.items]);
				commit('setPageCount', Math.ceil(json.totalItems / booksInList));
        commit('endFirstLoading');
      }
      catch(error) {
        commit('firstLoadingError');
      }
    },
    async changeSearchPage( { commit, getters } : any, newPage: number ) {
      commit('clearBooksArray');
      commit('startPageLoading');
      commit('setCurrentPage', newPage);
      try {
        var json = await getBooksFromServer(getters.getFilter, booksInList, getters.currentPage * booksInList);
        commit('setBooksList', [...json.items]);
        // Так как totalItems меняется при изменении страницы
				commit('setPageCount', Math.ceil(json.totalItems / booksInList));
        commit('endPageLoading');
      }
      catch(error) {
        commit('errorPageLoading');
      }
    },
    addToFavorites( { commit, getters } : any, id: string) {
      var favorites = (getters.favorites || '') + ',' + id + ',';
      commit('setFavorites', favorites);
    },
    clearAutocomplete({ commit, getters } : any) {
      if (getters.autcompleteIsOpen) {
        commit('setAutocomplete', []);
      }
    },
    async initAutocomplete({ commit, getters } : any, filter: string) {
      commit('controllerAbort');
      if (filter === '') {
        commit('setFilter', filter);
        commit('setAutocomplete', []);
        commit('isNotFiltered');
        return;
      }

      try {
        commit('setFilter', filter);
        var results = await getTitlesFromServer(filter, getters.controllerSignal);
        commit('setAutocomplete', results);
      }
      catch(error) {
      }
    }
  },
  mutations: {
    setFilter(state: stateObj, filter: string) {
      state.filter = filter;
    },
    setAutocomplete(state: stateObj, autocompleteData: string[]) {
      state.autocompleteData = autocompleteData
    },
    isFiltered(state: stateObj) {
      state.isFiltered = true;
    },
    isNotFiltered(state: stateObj) {
      state.isFiltered = false;
    },
    controllerAbort(state: stateObj) {
      state.controller.abort();
      state.controller = new AbortController();
    }
  },
  state: {
    filter: '',
    isFiltered: false,
    autocompleteData: [],
    controller: new AbortController()
  },
  getters: {
    isFiltered(state: stateObj): boolean {
    	return state.isFiltered;
    },
    getFilter(state: stateObj) {
      return state.filter
    },
    autocompleteData(state: stateObj) {
      return state.autocompleteData;
    },
    autcompleteIsOpen(state: stateObj) {
      return state.autocompleteData.length > 0;
    },
    controllerSignal(state: stateObj) {
      return state.controller.signal;
    }
	}	
}