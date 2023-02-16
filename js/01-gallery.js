import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const gallery = document.querySelector(".gallery");
const galleryMarkup = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<div class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
        </a>
    </div>`
  )
  .join("");

gallery.insertAdjacentHTML("afterbegin", galleryMarkup);

gallery.addEventListener("click", onImgClick);

function onImgClick(e) {
  e.preventDefault();
  if (e.target.nodeName !== "IMG") {
    return;
  }

  const instance = basicLightbox.create(
    `
    <img src="${e.target.dataset.source}" width="800" height="600">
`,
    {
      onShow: () => {
        window.addEventListener("keydown", escClose);
      },
      onClose: () => {
        window.removeEventListener("keydown", escClose);
      },
    }
  );

  function escClose(e) {
    if (e.code === "Escape") {
      instance.close();
    }
  }

  instance.show();
}
