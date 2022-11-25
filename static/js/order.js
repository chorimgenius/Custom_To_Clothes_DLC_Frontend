window.onload= () => {
  const payload = localStorage.getItem("payload");
  const payload_parse = JSON.parse(payload)
  const email= payload_parse.email
  console.log(email)
}


window.onload= () => {
  OrderList()
}

async function OrderList(){
    const response = await fetch(`http://127.0.0.1:8000/order/cart/`, {
        method: 'GET', 
        headers:{
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY5NzIwMzA5LCJpYXQiOjE2NjkzNjAzMDksImp0aSI6ImUwZTY3YzMzMWQxNjRjMzA4M2Q4YmE4ZTYwOGYxZGFmIiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJhZG1pbiJ9.8htiU9mp8ZH5JUqC4-GSAEG6EAaAm1OviUV8lkC2rZw"
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

     //사이즈 불러오기

     const size = document.getElementById("size")

     data.forEach(element =>{
      console.log(element.size)
       const newSize = document.createElement("div")
       newSize.innerText = element.size
       size.append(newSize)
    })
    //수량 불러오기
    const mount = document.getElementById("mount")

    data.forEach(element =>{
      console.log(element.mount)
       const newMount = document.createElement("div")
       newMount.innerText = element.mount
       mount.append(newMount)
    })
    //가격 불러오기
    const price = document.getElementById("price")

    data.forEach(element =>{
      console.log(element.price)
       const newPrice = document.createElement("div")
       newPrice.innerText = element.price
       price.append(newPrice)
    })
}
