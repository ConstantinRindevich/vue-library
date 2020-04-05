interface currentBookObj {
  bookInfo: book,
  id: string
};

interface book {
  title? : string,
  authors?: string[],
  imageLinks?: Object,
  publishedDate?: string,
  averageRating?: number,
  description?: string
}

interface stateObj {
  currentBook: currentBookObj,
  shareWindow: boolean;
}

export default {
  actions: {
    setCurrentBook({ commit } : any, currentBook: currentBookObj) {
      commit('setCurrentBook', currentBook);
		},
		clearCurrentBook({ commit } : any) {
      commit('setCurrentBook', null);
		},
		doFavorites({ dispatch, getters } : any, id: number) {
			if (getters.isFavoritePage) {
				dispatch('deleteFromFavorites', id);
			}
			else {
				if (getters.isFavorites) {
					dispatch('routeToFavorites');
				}
				else {
					dispatch('addToFavorites', id);
				}
			}
    },
    openShareWindow({ commit } : any) {
      commit('setShareWindow', true);
    },
    closeShareWindow({ commit } : any) {
      commit('setShareWindow', false);
    },
		twitter({ getters } : any) {
			window.open(`//twitter.com/intent/tweet?text=${getters.currentBookInString};`, '_blank', 'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=550, height=440, toolbar=0, status=0');
		},
		VK({ getters } : any) {
			window.open(`//vk.com/share.php?title=${getters.currentBookInString};`, '_blank', 'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=550, height=440, toolbar=0, status=0');
		}
  },
  mutations: {
    setCurrentBook(state: stateObj, currentBook: currentBookObj) {
      state.currentBook = currentBook;
    },
    setShareWindow(state: stateObj, newShareWindow: boolean) {
      state.shareWindow = newShareWindow;
    }
  },
  state: {
    currentBook: null,
    shareWindow: false
  },
  getters: {
    checkCurrentBook(state: stateObj) : boolean {
      return state.currentBook !== null;
    },
    currentBook(state: stateObj) : Object {
      return state.currentBook;
    },
    shareWindow(state: stateObj) : boolean {
      return state.shareWindow
    },
    currentBookInString(state: stateObj) : string {
      return "Книга " + state.currentBook.bookInfo.title;
    }
  }
}