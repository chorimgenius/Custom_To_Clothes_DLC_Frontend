const backend_base_url = "http://43.200.4.144:8000"

window.onload= () => {
    MainPage()
}

// 메인 페이지
async function MainPage(){
    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload)
    const username = document.getElementById("username")
    username.innerText = payload_parse.username

    const response = await fetch(`${backend_base_url}/`, {
        method: 'GET',
        headers:{
            "Authorization": localStorage.getItem("access"),
        }
    })
    response_json = await response.json()
    const img = document.getElementById('container')
    response_json.forEach(element => {
        const image = ` <div class="item">
                            <div class ="like">
                                ${element.likes_count} likes
                            </div>
                            <a href="http://43.200.4.144:8000/clothesprofile.html?id=${element.id}">
                                <img class="image" src="http://43.200.4.144:8000${element.image}">
                            </a>
                        </div>`
        img.insertAdjacentHTML("beforeend",image)
    });
}

async function handleLogout(){
	localStorage.removeItem("access")
	localStorage.removeItem("refresh")
	localStorage.removeItem("payload")
	alert("로그아웃되었습니다.")
	location.href = "signup.html"
}

function handleHome(){
    location.href="main.html"
  }