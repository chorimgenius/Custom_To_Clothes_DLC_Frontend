
window.onload= () => {
  const payload = localStorage.getItem("payload");
  const payload_parse = JSON.parse(payload)
  const username= payload_parse.username

  const intro = document.getElementById("intro")
  intro.innerText=payload_parse.username
  OrderList()
}

async function OrderList(){
    const response = await fetch(`http://43.200.4.144:8000/order/cart/`, {
        method: 'GET', 
        headers:{
         "Authorization" : localStorage.getItem("access")
        } 
    })
    const data = await response.json();

    const orderlist = document.getElementById("basket-product")
    data.forEach(element => { 
      const order = `<div class="basket-product"> 
                      <div class="item">
                        <div class="product-image">
                          <img src="http://43.200.4.144:8000${element.article.image}" alt="이미지" class="product-frame">
                           </div>
                        </div>
                        <div class="size" id="size">${element.size}</div>
                        <div class="mount" id="mount">${element.mount}</div>
                        <div class="price" id="price">${element.price *= element.mount}</div>
                        </div>
                      </div>
                    `
      orderlist.insertAdjacentHTML("beforeend",order)
  });
}


async function OrderList2(){
  const response = await fetch(`http://43.200.4.144:8000/order/cart/`, {
      method: 'PUT', 
      headers:{
        "Authorization" : localStorage.getItem("access")
      } 
    })
    location.href='orderlist.html'
  }

  function handleHome(){
    location.href="main.html"
  }
