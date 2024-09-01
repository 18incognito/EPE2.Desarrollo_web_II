var form     = document.getElementById("myform"),
    imgInput = document.querySelector(".img"),
    file     = document.getElementById("imgInput"),
    userName = document.getElementById("name"),
    age      = document.getElementById("age"),
    city     = document.getElementById("city"),
    email    = document.getElementById("email"),
    phone    = document.getElementById("phone"),
    post     = document.getElementById("post")
    sDate    = document.getElementById("sDate"),
    sDate2    = document.getElementById("sDate2"),
    submitBtn= document.querySelector(".submit"),
    userInfo = document.getElementById("Data"),
    modal = document.getElementById("useRForm"),
    modalTitle= document.querySelector("#useRForm .modal-title"),
    newUserBtn = document.querySelector(".newUser");
    
 //CARGA DATOS DE LOS USUARIOS DESDE LOCALSTORAGE
let ge8Data = localStorage.getItem('use8Profile') ? JSON.parse(localStorage.gexItem('use8Profile')) : []

// VARIABLE DE GESTION DE EDICIÓN 
let iEdit = false, editId

//MOSTRAR INFORMACIÓN ALMACENADA
showInfo()

//BOTON NUEVO USUARIO
newUserBtn.addEventListener('click',()=>{
  submitBtn.innerText = 'enviar';
  modalTitle.innerText="Rellena el formulario";
  iEdit = false;
  imgInput.src ="./imagenes/login2.jpg";
  form.reset();

})

//CARGA DE IMAGEN DESDE INPUT FILE
file.onchange = function(){
       if(file.files[0].size < 2000000){ //2MB
            var fileReader = new FileReader();
            
            //carga imagen en el contenedor
            fileReader.onload = function(e){
              imgUrl = e.target.result
              imgInput.src = imgUrl
            }
              //LEER ARCHIVO URL
            fileReader.readAsDataURL(file.files[0])

            }
            else{
               alert("el archivo es muy pesado")
            }    

};

//FUNCIÓN PARA MOSTRAR LOS DATOS DE LOS USUARIOS ALMACENADOS 
function showInfo(){
    document.querySelectorAll('.employeeDetails').forEach( info => info.remove())
    //RECORRE Y MUESTRA CADA USUARIO EN UNA NUEVA FILA DE LA TABLA
    ge8Data.forEach((element, index)=>{
      let createElement = `<tr class="employeeDetails">
         <td>${index+1}</td>
         <td><img src="${element.picture}" alt="" width="50" height="50"></img></td>
         <td>${element.employeeName}</td>
         <td>${element.employeeAge}</td>
         <td>${element.employeeCity}</td>
         <td>${element.employeeEmail}</td>
         <td>${element.employeePhone}</td>
         <td>${element.employeePost}</td>
         <td>${element.startDate}</td>
         <td>${element.startDate2}</td>
         <td>
            <button class=" btn btn-success"onclick="readInfo('${element.picture}','${element.employeeName}','${element.employeeAge}','${element.employeeCity}','${element.employeeEmail}','${element.employeePhone}','${element.employeePost}','${element.startDate}','${element.startDate2}')"data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>

             <button class=" btn btn-primary"onclick="editInfo(${index},'${element.picture}','${element.employeeName}','${element.employeeAge}','${element.employeeCity}','${element.employeeEmail}','${element.employeePhone}','${element.employeePost}','${element.startDate}','${element.startDate2}')"data-bs-toggle="modal" data-bs-target="#useRForm"><i class="bi bi-pencil-square"></i></button>

             <button class=" btn btn-danger"onclick= "deleteInfo(${index})"><i class="bi bi-trash"></i></button>
         </td>

      </tr>`
         userInfo.innerHTML += createElement  
    })
}
showInfo()

//FUNCIÓN PARA LEER LA INFORMACIÓN DE LOS USUARIOS Y MOSTRARLA EN UN MODAL

function readInfo(pic, name, age, city, email,phone, post, sDate,sDate2){
   document.querySelector('.showImg').src= pic,
   document.querySelector('#showName').value= name,
   document.querySelector('#showAge').value= age,
   document.querySelector('#showCity').value= city,
   document.querySelector('#showEmail').value= email,
   document.querySelector('#showPhone').value= phone,
   document.querySelector('#showPost').value= post,
   document.querySelector('#showsDate').value= sDate,
   document.querySelector('#showsDate2').value= sDate2
}


// FUNCIÓN PARA EDITAR LA INFORMACIÓN DE USUARIO
function editInfo(index,pic,name,Age, City, Email, Phone, Post, Sdate,Sdate2){
   iEdit = true
   editId = index
   imgInput.src = pic
   userName.value= name
   age.value= Age
   city.value=City
   email.value=Email,
   phone.value=Phone,
   post.value=Post,
   sDate.value=Sdate,
   sDate2.value=Sdate2
   submitBtn.innerText ="Actualizar"
   modalTitle.innerText ="Actualiza tu formulario"
}

//FUNCIÓN PARA ELIMINAR LA INFORMACIÓN DEL USUARIO
function deleteInfo(index){
   if (confirm("Estas seguro de que quieres eliminar los datos?")){
      ge8Data.splice(index,1)
      localStorage.setItem("use8Profile", JSON.stringify(ge8Data))
      showInfo()
   }

}


//EVENTO PARA MANEJAR EL ENVIO DE FORMULARIO
form.addEventListener('submit', (e)=>{
   e.preventDefault() // EVITA QUE EL FORMULARIO SE ENVIE POR DEFECTO

//RECOPILAR INFORMACIÓN DEL FORMULARIO
   const information = {
       picture: imgInput.src == undefined ? "./imagenes/login2.jpg" : imgInput.src,

       employeeName:userName.value,
       employeeAge:age.value,
       employeeCity:city.value,
       employeeEmail: email.value,
       employeePhone: phone.value,
       employeePost: post.value,
       startDate:sDate.value,
       startDate2:sDate2.value
   }
     

     //VERIFICA SI ESTA EDITANDO O CREANDO UN NUEVO USUARIO
     if (!iEdit ){
      ge8Data.push(information) //AGREGA UN NUEVO USUARIO
     }
     else{
        iEdit = false
        ge8Data[editId] =information //ACTUALIZA LA INFORMACIÓN DEL USUARIO
     }

     //ACTUALISA EL LOCALSTORAGE Y LA INTERFAZ
     localStorage.setItem('use8Profile', JSON.stringify(ge8Data))

     submitBtn.innerText = "enviar"
     modalTitle.innerHTML ="Completa el Formulario"

     showInfo()

     form.reset()

     imgInput.src="./imagenes/login2.jpg"

    
})
