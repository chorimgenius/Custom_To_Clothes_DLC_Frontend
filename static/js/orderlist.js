
window.onload= () => {
  const payload = localStorage.getItem("payload");
  const payload_parse = JSON.parse(payload)
  const username= payload_parse.username

  const intro = document.getElementById("intro")
  intro.innerText=payload_parse.username
  OrderList()
}

async function OrderList(){
    const response = await fetch(`http://127.0.0.1:8000/order/list/`, {
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
                          <img src="http://127.0.0.1:8000${element.article.image}" alt="이미지" class="product-frame">
                           </div>
                        </div>
                        <div class="size" id="size">${element.size}</div>
                        <div class="mount" id="mount">${element.mount}</div>
                        <div class="price" id="price">${element.price}</div>
                        <div class="price" id="status">${element.status}</div>
                        </div>
                      </div>
                    `
      orderlist.insertAdjacentHTML("beforeend",order)
  });
}
