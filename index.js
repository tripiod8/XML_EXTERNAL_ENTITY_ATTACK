const submitbtn = document.querySelector('#submitBtn')
const fileInput = document.querySelector('#xmlFile');

submitbtn.addEventListener('click', (e) => {

  var formData = new FormData();
  formData.append("thefile", fileInput.files[0]);

  console.log(fileInput.files[0]['type']);
  if(fileInput.files[0]['type'] == 'text/xml')
  {
    var xmlhttp = new XMLHttpRequest()
    xmlhttp.onreadystatechange=function() {
      if (this.readyState==4 && this.status==200) {
        const attackAlert = document.querySelector('#attackAlert');
        attackAlert.children[1].innerHTML = this.responseText;
        attackAlert.classList.add('show');
      }
    }
    xmlhttp.open("POST","process.php",true);
    xmlhttp.send(formData);
  }
  else
  {
    const attackAlert = document.querySelector('#nonattackAlert');
    attackAlert.classList.add('show');
  }
  

  
  
  
})
    





