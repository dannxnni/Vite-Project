import {setDocumentTitle} from "/src/lib"
import "/src/pages/detail/detail.css"
import pb from "/src/api/pocketbase";

setDocumentTitle("2.9cm / Detail");

async function renderProductData(){

  const hash = window.location.hash.slice(1);

  const productData = await pb
  .collection('products')
  .getOne(hash)
  

  console.log( productData );

}

renderProductData();