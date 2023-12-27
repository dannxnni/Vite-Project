import "/src/pages/product/product.css"
import { tiger, insertLast, comma, getPbImageURL, getStorage, setStorage, setDocumentTitle } from "/src/lib";
import gsap from "gsap";
import defaultAuthData from "/src/api/defaultAuthData"; // 추가

setDocumentTitle("2.9cm / Product")

if (!localStorage.getItem("auth")) { // 추가
  setStorage("auth", defaultAuthData)
}


async function renderProduct() {
  const response = await tiger.get(`${import.meta.env.VITE_PB_API}/collections/products/records`)

  const userData = response.data.items

  const {isAuth} = await getStorage("auth")  // 추가

  userData.forEach(item => {
    const ratio = item.price * (item.discount * 0.01);
    const template = /* html */ `
    <li class="product-item"> 
    <a href="${!isAuth ? '/src/pages/login/' : `/src/pages/detail/index.html#${item.id}`}">
      <figure>
          <img src="${getPbImageURL(item)}" alt="" />
        </figure>
        <span class="brand">${item.brand}</span>
        <span class="desc">${item.description}</span>
        <span class="price">${comma(item.price)}</span>
        <div>
          <span class="discount">${item.discount}%</span>
          <span class="real-price">${comma(item.price - ratio)}</span>
        </div>
      </a>
    </li>
    `
    insertLast(".container > ul", template)
  });


  gsap.from(".product-item", {y: 30, opacity: 0, stagger: 0.1})
}

renderProduct();


