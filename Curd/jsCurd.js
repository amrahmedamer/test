
let title=document.getElementById('title');
let Pricee=document.getElementById('Pricee');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
let deleteAll=document.getElementById('deleteAll');

let mood='create';
let temp;
//get total
function getTotal(){
    let result;
    if(Pricee.value >0 ){
      result=(Number(Pricee.value)+Number(taxes.value)+Number(ads.value))-Number(discount.value);
      total.style.background='green';
    }else{
      result =0;
      total.style.background='red';
    }
    total.innerHTML=result;
}
//create product
let datapro;
if(localStorage.product !=null){
    datapro = JSON.parse(localStorage.product);
}
else{

    datapro=[];
}
submit.onclick=function()
{
    let newpro={
        title:title.value,
        Pricee:Pricee.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value

    }
    //count
    if(title.value!=''
        &&Pricee.value!=''
        &&count.value<=100
        &&category.value!=''){

        if(mood=='create')
        {
            if(newpro.count>1){
                for(let i=0;i<newpro.count;i++){
                    datapro.push(newpro);
                }
            }else{
                datapro.push(newpro);
            }

        }else
        {
            datapro[temp]=newpro;
            mood='create';
            submit.innerHTML='Create';
            count.style.display='block';

        }
        total.style.background='red';
        localStorage.product=JSON.stringify(datapro);
        
        clearData();
    }else{
        if(title.value==''){
            title.style.background="red";
        }
        if(count.value>100){
            count.style.background="red";
        }
         if(category.value==''){
            category.style.background="red";
        }
        if(Pricee.value==''){
            Pricee.style.background="red";

        }
    }

    title.onkeyup=function(){
        title.style.background="#111";
    }
    count.onkeyup=function(){
        count.style.background="#111";
    }
    category.onkeyup=function(){
        category.style.background="#111";
    }

    //save local storage
    showData();
}

//clear inputs
function clearData(){
    
    title.value="",
    Pricee.value="",
    taxes.value="",
    ads.value="",
    discount.value="",
    total.innerHTML="",
    count.value="",
    category.value=""


}

//read
function showData()
{
  let table='';
    for(let i=0;i<datapro.length;i++)
    {
        table +=`
        <tr>
            <td>${i+1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].Pricee}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>     
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})"  id="delete">delete</button></td>

        </tr> `;
    }
    document.getElementById("table").innerHTML=table;
    if(datapro.length>0){
        deleteAll.innerHTML='<button>deleteAll(99)</button>';
        deleteAll.style.display='block';
    }else{
        deleteAll.style.display='none';
    }
}
//delete
function deleteData(i){
    datapro.splice(i,1);
    localStorage.product=JSON.stringify(datapro);
    showData()
}
deleteAll.onclick=function()
{
    datapro.splice(0,datapro.length);
    localStorage.product=JSON.stringify(datapro);
    showData()
}

//update
function updateData(i){
    title.value=datapro[i].title;
    Pricee.value=datapro[i].Pricee;
    taxes.value=datapro[i].Pricee;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
    count.value=datapro[i].count;
    category.value=datapro[i].category;
    getTotal();
    count.style.display="none";
    submit.innerHTML='Update';
    mood='Update';
    temp=i;
    scroll({
        top:0,
        behavior:'smooth'
    })
}
//search
let searchMood='title';
function getSearchMood(id){
    let search=document.getElementById('Search');
    if(id=='SearchTitle'){
        searchMood='title';

    }else{
        searchMood='category';
    }
    Search.placeholder='Search By '+searchMood ;
    Search.focus();
}
function searchData(value){
    let table='';
    for(let i=0;i<datapro.length;i++)
    {
        if(searchMood=='title')
        {
            if( datapro[i].title.toLowerCase().includes(value.toLowerCase()))
            {
                table +=`
                <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].Pricee}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>     
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})"  id="delete">delete</button></td>
                </tr> `;
            }
        }
        else
        {
            if( datapro[i].category.toLowerCase().includes(value.toLowerCase()))
            {
                table +=`
                <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].Pricee}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>     
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})"  id="delete">delete</button></td>
                </tr> `;
            }
        }
        document.getElementById("table").innerHTML=table;
    }
}
//clean data
