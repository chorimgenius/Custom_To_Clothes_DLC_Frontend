
window.onload= () => {
  const payload = localStorage.getItem("payload");
  const payload_parse = JSON.parse(payload)
  const username= payload_parse.username
  console.log(username)

  const intro = document.getElementById("intro")
  intro.innerText=payload_parse.username
  OrderList()
}

async function OrderList(){
    const response = await fetch(`http://127.0.0.1:8000/order/cart/`, {
        method: 'GET', 
        headers:{
         "Authorization" : localStorage.getItem("access")
        } 
    })
    console.log(response)
    const data = await response.json();
    console.log(data)
    //이름 불러오기

    
    //이미지 불러오기
    // const item = document.getElementById("item")

    // data.forEach(element =>{
    //   console.log(element.item)
    //    const newItem = document.createElement("div")
    //    newItem.innerText = element.title
    //    item.appendChild(newItem)
    // })
    const orderlist = document.getElementById("basket-product")
    data.forEach(element => { 
      const order = `<div class="basket-product"> 
                      <div class="item">
                        <div class="product-image">
                          <img src="http://127.0.0.1:8000${element.article.image}" alt="이미지" class="product-frame">
                           </div>
                        </div>
                        <div class="size" id="size">${element.size}</div>
                        <div class="mount" id="mount">${element.mount}</div>
                        <div class="price" id="price">${element.price}</div>
                        </div>
                      </div>
                    `
      orderlist.insertAdjacentHTML("beforeend",order)
  });
}


async function OrderList2(){
  console.log("실행")
  const response = await fetch(`http://127.0.0.1:8000/order/cart/`, {
      method: 'PUT', 
      headers:{
        "Authorization" : localStorage.getItem("access")
      } 
    })
    console.log(response)
    location.href='orderlist.html'
  }
