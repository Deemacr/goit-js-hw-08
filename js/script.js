import images from '../gallery-items.js'

const refs = {
	galleryList: document.querySelector('ul.gallery'),
	lightbox: document.querySelector('.lightbox'),
	btn: document.querySelector('[data-action="close-lightbox"]')
};

const createImage = (item, parent) => {
	const { preview, original, description } = item;
	const img = document.createElement('img');
	img.classList.add('gallery__image');
	img.dataset.source = original;
	img.src = preview;
	img.alt = description;
	parent.appendChild(img);
};

const createLink = (item, parent) => {
	const { original } = item;
	const a = document.createElement('a');
	a.classList.add('gallery__link');
	a.href = original;
	createImage(item, a);
	parent.appendChild(a);
};

const createItem = (item) => {
	const li = document.createElement('li');
	li.classList.add('gallery__item');
	createLink(item, li);
	return li;
};

const createListItems = (arr) => {
	const items = arr.map((item) => createItem(item));
	refs.galleryList.append(...items);
};

createListItems(images);


function onClickHandler(event) {
	event.preventDefault();
	if (event.target.nodeName === 'IMG') {
		refs.lightbox.classList.add('is-open');
		refs.lightbox.querySelector('.lightbox__image').src = event.target.dataset.source;
		refs.lightbox.querySelector('.lightbox__image').alt = event.target.alt;
	}
}

function onCloseHandler(event) {
	if (event.target.nodeName === "BUTTON") {
		refs.lightbox.querySelector('.lightbox__image').src = "";
		refs.lightbox.querySelector('.lightbox__image').alt = "";
		refs.lightbox.classList.remove('is-open');
	}
}


refs.galleryList.addEventListener('click', onClickHandler);
refs.btn.addEventListener('click', onCloseHandler);


