const backend_base_url = "http://127.0.0.1:8000"

window.onload = async function loadArticles() {
    const urlStr = window.location.href;
    const url = new URL(urlStr);
    const urlParms = url.searchParams;
    console.log(urlParms)
    const id = urlParms.get('id')
    const response = await fetch(`${backend_base_url}/order/` + parseInt(id) + '/', {
        method: 'GET'
    })
    response_json = await response.json()
    console.log(response_json)
    console.log(response_json.image)
    const product_image = document.getElementById('product_image')
    product_image.src = `${backend_base_url}` + response_json.image
}

async function postsize(){
    const urlStr = window.location.href;
    const url = new URL(urlStr);
    const urlParms = url.searchParams;
    console.log(urlParms)
    const id = urlParms.get('id')
    const size_size = document.getElementById('size').value
    const size_mount = document.getElementById('mount').value

    const response = await fetch(`${backend_base_url}/order/` + parseInt(id) + '/', {
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