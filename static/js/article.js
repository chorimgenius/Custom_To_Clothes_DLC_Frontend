let draft_list =[]
let style_list =[]
window.onload = async function loadDesign(){

  const response = await fetch('http://43.200.4.144:8000/article/',{
      method:'GET',
  })
  response_json = await response.json()
  add_image(response_json[0],'draft-id',draft_list)
  add_image(response_json[1],'style-id',style_list)

  function add_image(json_data_list,container,list_){
      json_data_list.forEach(element => {
        draft_id = document.getElementById(container+element.id)
        draft_id.style.backgroundImage = 'url(http://43.200.4.144:8000'+ element.image +')'
        list_.push({'id':element.id, 'image':'http://43.200.4.144:8000'+element.image})
      });
  }
}
function all_close(){ // 모든 컨테이너 닫기
  let container_all = document.querySelectorAll('.container')
  container_all.forEach(element => {
    element.style.display = 'none'
  })
}

let selected_draft_id = 0
let selected_style_id = 0
let selected_article_id = 0
let file =''
function select_draft(id){
  all_close()
  $('#style-container').show()
  selected_draft_id = id
  result_draft = document.getElementById('draft-selected')
  result_draft.style.backgroundImage = 'url('+ draft_list[id-1].image+')'
  if(selected_article_id>0){
    $('#create-article').hide()
    $('#put-article').show()

  }
}
function select_style(id){
  all_close()
  $('#selected-container').show()
  selected_style_id = id
  result_style = document.getElementById('style-selected')
  result_style.style.backgroundImage = 'url('+ style_list[id-1].image+')'
}
// image 등록시
let uploadField = document.querySelector('.image-upload');
uploadField.addEventListener('change', getFile);
function getFile(e){
  file = e.currentTarget.files[0];
  checkType(file);
}
function checkType(file){
  let imageType = /image.*/;
  if (!file.type.match(imageType)) {
    throw 'Datei ist kein Bild';
  } else if (!file){
    throw 'Kein Bild gewählt';
  } else {
    previewImage(file);
  }
}
function previewImage(file){
  let thumb = document.getElementById('style-selected'),
      reader = new FileReader();

  reader.onload = function() {
    thumb.style.backgroundImage = 'url(' + reader.result + ')';
  }
  reader.readAsDataURL(file);
  all_close()
  $('#selected-container').show()
}

// post article
async function post_article(){
  const form_data = new FormData();
  form_data.append('draft',selected_draft_id)
  form_data.append('style_id',selected_style_id)
  form_data.append('image',file)
  const response = await fetch(`http://43.200.4.144:8000/article/`, {
      headers: {
        "Authorization" : localStorage.getItem("access"),
      },
      method: 'POST',
      body: form_data
  })
  response_json = await response.json()
  selected_article_id = response_json.id
  result_image = document.getElementById('result-image')
  result_image.style.backgroundImage = 'url(http://43.200.4.144:8000'+ response_json.image+')'
  all_close()
  $('#result-container').show()
}

function re_post_article(){
  file = ''
  selected_draft_id = 0
  selected_style_id = 0
  all_close()
  $('#draft-container').show()
}
async function put_article(){
  const form_data = new FormData();
  form_data.append('draft',selected_draft_id)
  form_data.append('style_id',selected_style_id)
  form_data.append('image',file)
  form_data.append('id',selected_article_id)
  const response = await fetch(`http://43.200.4.144:8000/article/`, {
      headers: {
        "Authorization" : localStorage.getItem("access"),
      },
      method: 'PUT',
      body: form_data
  })
  response_json = await response.json()
  selected_article_id = response_json.id
  result_image = document.getElementById('result-image')
  result_image.style.backgroundImage = 'url(http://43.200.4.144:8000'+ response_json.image+')'
  all_close()
  $('#result-container').show()
}
function order(){
location.href = "clothesprofile.html?id="+selected_article_id;
}