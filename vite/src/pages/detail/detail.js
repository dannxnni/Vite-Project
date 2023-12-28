import {setDocumentTitle, insertFirst, getPbImageURL, comma, getNode} from "/src/lib"
import "/src/pages/detail/detail.css"
import pb from "/src/api/pocketbase";

setDocumentTitle("2.9cm / Detail");

async function renderProductData(){
  const cancel = getNode(".cancel")
  const modify = getNode(".modify")

  const hash = window.location.hash.slice(1); // # 제외

  const productData = await pb
  .collection('products')
  .getOne(hash) // hash : item의 id 값 (product.js도 같이 봐)
  
  const {brand, price, description, discount} = productData;

  const template = /* html */`
    <div class="wrapper">

    <div class="brand">
      <label for="brand">Brand</label>
      <input type="text" value="${brand}" id="brand"/>
    </div>

    <div class="visual">
      <img src="${getPbImageURL(productData)}" alt="" />
    </div>

    <div class="desc">
      <label for="description">상품 이름</label>
      <input type="text" value="${description}" id="description"/>
    </div>

    <div class="price">
      <label for="price">price</label>
      <input type="text" value="${price}" id="price"/>
    </div>

    <div class="discount">
      <label for="discount">할인율(%)</label>
      <input type="text" value="${discount}" id="discount"/>
    </div>

    <div class="real-price">${comma(price - price * (discount * 0.01))}</div>
  </div>
  `
  insertFirst(".container", template)

  // 생성된 이후에 선언해야 에러 X (랜더링 된 후에 선언해야 해)
  const priceInput = getNode('#price');
  const discountInput = getNode('#discount');


  function handleDiscount(){

    let newPrice = price;
    let newDiscount = discount;

    newPrice = priceInput.value;
    newDiscount = discountInput.value;

    const ratio = newPrice * (newDiscount * 0.01);
    const realPrice = newPrice - ratio;
    
    getNode('.real-price').textContent = comma(realPrice) + '원';

  }

  function handleModify() {
      pb.collection("products").update(hash, {
        brand: getNode("#brand").value,
        price: getNode("#price").value,
        discount: getNode("#discount").value,
        description: getNode("#description").value,
      }).then(() => {
        // history.back(); => 브라우저가 이전 데이터를 계속 갖고 있어 그래서 업데이트가 잘 안돼
        location.href = "/src/pages/product/"
      }).catch(() => {
        
      })
  }

  cancel.addEventListener('click',()=> history.back())

  // price, 할인율 변경할 때마다 반영
  discountInput.addEventListener('input',handleDiscount)
  priceInput.addEventListener('input',handleDiscount)

  modify.addEventListener("click", handleModify)
}

renderProductData();