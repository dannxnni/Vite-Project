import "/src/pages/login/login.css"
import { getNode, getStorage, setStorage, setDocumentTitle } from "/src/lib/";
import pb from "/src/api/pocketbase";
import gsap from "gsap";

setDocumentTitle("2.9cm / Login")

// import PocketBase from "pocketbase"
// const pb = new PocketBase(import.meta.env.VITE_PB_URL)

const loginBtn = getNode(".login")

const tl = gsap.timeline({defaults: {opacity: 0}});

tl.from(".container h1", {y: 30})
  .from(".container hr", {scaleX: 0}, "<")
  .from("form > *", {y: 30, stagger: 0.1})
  .from(".register", {y: -30}, "<")


async function handleLogin(e) {
  e.preventDefault();

  try {
    const id = getNode("#idField").value;
    const pw = getNode("#pwField").value;
  
    const userData = await pb
    .collection("users")
    .authWithPassword(id, pw);

    const {model, token} = await getStorage("pocketbase_auth") // JSON.parse(localStorage.getItem("key"))
    // 다시 저장
    setStorage("auth", {
      isAuth: !!model,  // 암시적 형변환
      user: model,
      token: token
    })

    alert("로그인 성공")
    window.location.href = "/index.html"

  } catch {
    alert("인증된 사용자가 아닙니다");
  }


  // API detail 사용
  // const userData = await tiger.post(`${import.meta.env.VITE_PB_API}/collections/users/auth-with-password`, {
  //   identity: "1234@naver.com",
  //   password: "qwer1234"
  // })
  
}


loginBtn.addEventListener("click", handleLogin)