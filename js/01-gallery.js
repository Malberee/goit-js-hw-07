import { galleryItems } from './gallery-items.js';
// Change code below this line

// console.log(galleryItems);

const gallery = document.querySelector('.gallery');

gallery.addEventListener('click', onGalleryClick);

const galleryMarkup = createGalleryMarkup(galleryItems);

gallery.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
        <div class="gallery__item">
            <a>
                <img class="gallery__image"
                    src="${preview}"
                    data-source="${original}" 
                    alt="${description}" >
            </a>
        </div>`;
    })
    .join('');
}

function onGalleryClick(e) {
  e.preventDefault();
  const isGalleryItem = e.target.classList.contains('gallery__image');
  if (!isGalleryItem) return;

  const instance = basicLightbox.create(
    `<img src="${e.target.dataset.source}" width="800" height="600">`,
    {
      onShow: (instance) => {
        window.addEventListener('keydown', (e) => {
          if (e.key !== 'Escape') {
            return;
          }
          instance.close();
        });
      },
      onClose: (instance) => {
        window.removeEventListener('keydown', e);
      },
    }
  );

  instance.show();
}
