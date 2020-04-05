export async function getBooksFromServer(booksFilter: string, maxResults: number, startIndex: number) {
  try {
		var response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${booksFilter}&projection=full&maxResults=${maxResults}&startIndex=${startIndex}`)
		var json = await response.json();
		return json;
	}
	catch(error) {
		throw error;
	}
}

export async function getTitlesFromServer(booksFilter: string, signal: AbortSignal) {
	try {
		var response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${booksFilter}+intitle&projection=full`, {signal})
		var json = await response.json();
		var results: string[] = [];
		if (!json.items) {
			return results;
		}
		for (var i = 0; i < json.items.length; i++) {
			results.push(json.items[i].volumeInfo.title)
		}
		return results;
	}
	catch(error) {
		throw error;
	}
}

export function getFavoritesBookFromServer(idArr: string[]) {
	var arrayPromises = [];
	var resultJsons: any[] = [];
  for (var i = 0; i < idArr.length; i ++) {
  	arrayPromises.push(new Promise((resolve, reject) => {
      return fetch(`https://www.googleapis.com/books/v1/volumes/${idArr[i]}`)
      	.then(response => response.json())
        .then((json) => {
					resultJsons.push(json);
					resolve();
				})
				.catch(() => {
					reject();
				})
		}));
	}
	return Promise.all(arrayPromises)
		.then(() => {
			return resultJsons;
		})
		.catch((error) => {
			return error;
		})
}
