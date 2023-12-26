import "/src/pages/product/product.css"
import { tiger, insertLast } from "/src/lib";


async function renderProduct() {
  const response = await tiger.get("http://127.0.0.1:8090/api/collections/cards/records")

  const userData = response.data.items

  userData.forEach(item => {
    const template = `
      <div>
        <span>이름 : ${item.name}</span>
        <span>게시글 : ${item.description}</span>
      </div>
    `
    insertLast(".container", template)
  })
}


renderProduct();