const backend_base_url = "http://43.200.4.144:8000/"
let liked = false

window.onload = async function loadArticles() {
    const urlStr = window.location.href;
    const url = new URL(urlStr);
    const urlParms = url.searchParams;
    const id = urlParms.get('id')
    const response = await fetch(`${backend_base_url}order/` + parseInt(id) + '/', {
        method: 'GET'
    })
    response_json = await response.json()
    const product_image = document.getElementById('product_image')
    product_image.src = `${backend_base_url}` + response_json.image.slice(1);
}

async function postsize(){
    const urlStr = window.location.href;
    const url = new URL(urlStr);
    const urlParms = url.searchParams;
    const id = urlParms.get('id')
    const size_size = document.getElementById('size').value
    const size_mount = document.getElementById('mount').value

    await fetch(`${backend_base_url}order/` + parseInt(id) + '/', {
        method: 'POST',
        headers: {
            "Authorization" : localStorage.getItem("access"),
            "content-type" : 'application/json',
        },
        body: JSON.stringify({
            "size" : size_size,
            "mount" : size_mount,
        })
    })
    location.href="order.html"
}

$(document).ready(function () {
    $(".qtyminus").on("click", function () {
        var now = $(".qty").val();
        if ($.isNumeric(now)) {
            if (parseInt(now) - 1 > 0) { now--; }
            $(".qty").val(now);
        }
    })
    $(".qtyplus").on("click", function () {
        var now = $(".qty").val();
        if ($.isNumeric(now)) {
            $(".qty").val(parseInt(now) + 1);
        }
    });
});

async function postLike() {
    const urlStr = window.location.href;
    const url = new URL(urlStr);
    const urlParams = url.searchParams;
    const id = urlParams.get('id')

    if(!liked){
        liked = true
        
    }else{
        liked = false
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const urlStr = window.location.href;
    const url = new URL(urlStr);
    const urlParams = url.searchParams;
    const id = urlParams.get('id')
    const likeButton = document.querySelector('.like-button');
    likeButton.addEventListener('click', () => { 
        fetch('http://43.200.4.144:8000/' +parseInt(id) +'/like/',{
            headers:{
                'Authorization':localStorage.getItem("access")},
            method :'POST',
        })   
        likeButton.classList.toggle('selected');
    });
});

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