import "/src/pages/newPost/newPost.css"
import { setDocumentTitle, getNode, insertLast, clearContents } from "/src/lib";
import gsap from "gsap"
import pb from '/src/api/pocketbase'

setDocumentTitle("2.9cm / Add Product")

function newPost() {
  const add = getNode(".add");
  const imgField = getNode("#imgField");
  const cancel = getNode(".cancel");


  async function handleNewPost() {
    const formData = new FormData();

    formData.append("brand", getNode("#brand").value) // append(key, value)
    formData.append("description", getNode("#description").value)
    formData.append("price", getNode("#price").value)
    formData.append("discount", getNode("#discount").value)
    formData.append("photo", imgField.files[0])  // File 객체를 보내야 해

    try {
      await pb.collection("products").create(formData);
      location.href = "/src/pages/product/"
    } catch {
      alert("상품 정보를 올바르게 입력해 주세요")
    }
  }

  function handleUpload(e) {
    const {files} = e.target;

    // 이미지가 여러 장 들어올 수 있도록 반복문 돌려
    const fileImg = Array.from(files).map(file => ({
      image: URL.createObjectURL(file),
      label: file.name

    }))

    // console.log(URL.createObjectURL(files[0]))
    // console.log(fileImg)

    clearContents(".render")  // 이미지 중복 방지

    fileImg.forEach(item => {
      const img = `
        <img src="${item.image}" alt="${item.label}" />
      `
      
      insertLast(".render", img)
    })
  }

  add.addEventListener("click", handleNewPost)
  cancel.addEventListener("click", () => history.back())  // 취소 누르면 이전 페이지로 돌아가
  imgField.addEventListener("change", handleUpload)
}

newPost();