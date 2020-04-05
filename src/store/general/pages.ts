import router from "@/router";
import {pages} from '@/services/const'

interface currentBookObj {
  book: Object,
  id: string
};

interface stateObj {
	pageCount: number,
	currentPage: number,
	pageLoading: boolean,
	pageLoadingError: boolean,
	maxVisiblePage: number
}

export default {
  actions: {
		nextPage({ dispatch, getters } : any) {
			if (getters.isFavoritePage) {
				dispatch('changeSearchPage', getters.currentPage + 1);
			}
			else {
				dispatch('changeFavoritePage', getters.currentPage + 1);
			}
		},
		prevPage({ dispatch, getters } : any) {
			if (getters.isFavoritePage) {
				dispatch('changeFavoritePage', getters.currentPage - 1);
			}
			else {
				dispatch('changeSearchPage', getters.currentPage - 1);
			}
		},
		changePage({ dispatch, getters } : any, newPage: number) {
			if (getters.isFavoritePage) {
				dispatch('changeFavoritePage', newPage);
			}
			else {
				dispatch('changeSearchPage', newPage);
			}
		}
  },
  mutations: {
		setCurrentPage(state: stateObj, newCurrentPage: number) {
			state.currentPage = newCurrentPage;
		},
		setPageCount(state: stateObj, pageCount: number) {
			state.pageCount = pageCount;
		},
		startPageLoading(state: stateObj) {
			state.pageLoading = true;
			state.pageLoadingError = false;
		},
		endPageLoading(state: stateObj) {
			state.pageLoading = false;
		},
		errorPageLoading(state: stateObj) {
			state.pageLoading = false;
			state.pageLoadingError = true;
		}
  },
  state: {
		pageCount: 0,
		currentPage: 0,
		pageLoading: false,
		pageLoadingError: false,
		maxVisiblePage: 9
  },
  getters: {
		pageCount(state: stateObj) : number {
			return state.pageCount;
		},
		currentPage(state: stateObj) : number {
			return state.currentPage;
		},
		pageLoading(state: stateObj) : boolean {
			return state.pageLoading
		},
		pageLoadingError(state: stateObj) : boolean {
			return state.pageLoadingError
		},
    increasePage(state: stateObj) {
      var halfMaxVisiblePage = Math.floor(state.maxVisiblePage/2)
			var increasePage = state.currentPage - halfMaxVisiblePage;
      if (increasePage < 0) {
        increasePage = 0;
      }
      else if (state.currentPage + halfMaxVisiblePage >= state.pageCount) {
        increasePage = state.pageCount - state.maxVisiblePage;
      }
      return increasePage;
		},
		maxVisiblePage(state: stateObj) {
			return state.maxVisiblePage
		}
  }
}