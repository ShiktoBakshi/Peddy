

const loadCategories = ()=>{
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res)=>res.json())
    .then((data)=> displayCategories(data.categories))
    .catch((error)=>console.log(error));
};
const loadCards = ()=>{
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res)=>res.json())
    .then((data)=>displayPets(data.pets))
    .catch((error)=>console.log(error));
};
const loadCategoryCard=(id)=> {
    
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then((res)=>res.json())
    .then((data) =>{
        removeActiveClass()
         const activeBtn=document.getElementById(`btn-${id}`)
         activeBtn.classList.add("active");
      
        displayPets(data.data);
    })
  
};

const removeActiveClass=()=>{
    const buttons= document.getElementsByClassName(`category-btn`);
    for(let btn of buttons){
     btn.classList.remove("active")
    };
 };


 const loadDetails=async(petId)=>{
   
    const url=`https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    const res=await fetch(url);
    const data =await res.json();
    displayDetails(data.petData)
  }
  const displayDetails=(petData)=>{
    const detailsContainer=document.getElementById("modal_container");
  
 const breed =petData.breed||"Not Available "
 const birth =petData.date_of_birth||"Not Available "
 const gender=petData.gender||"Not Available "
 const price=petData.price||"Not Available "


 detailsContainer.innerHTML=
 ` 
<figure class="h-[200px]">
<img
src=${petData.image}
class="h-full w-full object-cover"
alt="" />
</figure>
<div class="px-0 py-2">
<h3 class="font font-bold text-xl"> ${petData.pet_name}</h3>
<div class="flex">
<div class="h-5 w-5">
<img src="https://img.icons8.com/?size=64&id=24054&format=png"/>
</div>
<p>Breed: ${breed} </p>
</div>
<div class="flex">
<div class="h-5 w-5">
<img src="https://img.icons8.com/?size=100&id=23&format=png"/>
</div>
<p>Birth: ${birth} </p>
</div>
<div class="flex">
<div class="h-5 w-5">
<img src="https://img.icons8.com/?size=160&id=47187&format=png"/>
</div>
<p>Gender: ${gender} </p>
</div>
<div class="flex">
<div class="h-5 w-5">
<img src="https://img.icons8.com/?size=48&id=85782&format=png"/>
</div>
<p> Price: ${price} </p>
</div>
<div class="flex" >
    <img class="w-5 h-5" src="https://img.icons8.com/?size=30&id=79722&format=png" alt="virus logo" />
    <p>Vaccinated status: ${petData.vaccinated_status}</p>
    </div>
</div>
<hr/>
<div>
    <h3 class="text-lg font-bold mt-3"> Details Information </h3>
    <p>${petData.pet_details}</p>
    </div>
    </div>
 `;

 document.getElementById("custom_modal").showModal();
 
}
 
 function showLoading(callback) {
    const active=document.getElementById(`loading`)
    active.classList.remove("hidden");
    setTimeout(() => {
        const active=document.getElementById(`loading`)
        active.classList.add("hidden");
      callback();
    }, 1000);
  }
  
  
  showLoading(loadCards);
  
 const likeShow=(image)=>{
    const likeShowContainer=document.getElementById('like');
    const div =document.createElement("div");
    div.innerHTML=`
    <div>
    <img class="img-history p-2" src="${image}" alt="animal"/>
    </div>
    `;
    likeShowContainer.appendChild(div);
 };





const displayPets =(pets) =>{
   
    const cardContainer=document.getElementById("cards");
    cardContainer.innerHTML="";
   
    if(pets.length==0){
        cardContainer.classList.remove("grid");
        cardContainer.innerHTML=`
        <div class="h-[200px]  flex flex-col gap-5 justify-center items-center  ">
          <img src="images/error.webp"/>
         <span class="text-xl font-bold text-center">
         No Data Available
         </span>
        </div>
        `;
        return;
    }
    else{
        cardContainer.classList.add("grid");
    }
    pets.forEach((pet)=>{

        const breed =pet.breed||"Not Available "
        const birth =pet.date_of_birth||"Not Available "
        const gender=pet.gender||"Not Available "
        const price=pet.price||"Not Available "
        const card=document.createElement("div");
        card.classList="card px-2 py-2 border"
        card.innerHTML=
        ` 
    <figure class="h-[200px]">
    <img
      src=${pet.image}
       class="h-full w-full object-cover"
      alt="" />
    </figure>
    <div class="px-0 py-2">
    <h3 class="font font-bold text-xl"> ${pet.pet_name}</h3>
    <div class="flex">
    <div class="h-5 w-5">
    <img src="https://img.icons8.com/?size=64&id=24054&format=png"/>
    </div>
    <p>Breed: ${breed} </p>
    </div>
   <div class="flex">
    <div class="h-5 w-5">
    <img src="https://img.icons8.com/?size=100&id=23&format=png"/>
    </div>
    <p>Birth: ${birth} </p>
    </div>
    <div class="flex">
    <div class="h-5 w-5">
    <img src="https://img.icons8.com/?size=160&id=47187&format=png"/>
    </div>
    <p>Gender: ${gender} </p>
    </div>
    <div class="flex">
    <div class="h-5 w-5">
    <img src="https://img.icons8.com/?size=48&id=85782&format=png"/>
    </div>
    <p> Price: ${price} </p>
    </div>
    <hr/>
    <div class="flex justify-center gap-5 py-5 ">
     <div class="  px-4  border border-7 border-black rounded-lg">
     <button  onclick="likeShow('${pet.image}')" class="w-8 h-8 py-2">
     <img src="https://img.icons8.com/?size=48&id=82788&format=png">
     </button>
     </div>
     <div ">
     <button  class="btn btn-outline ">Adopt</button>
 
     </div>
     <div>
         <button onclick="loadDetails('${pet.petId}')"  class="btn btn-outline ">Details</button>
     </div>
     
   </div>
    </div>
        `
        cardContainer.append(card);
    })
}


const displayCategories= (categories)=>{
    const categoryContainer=document.getElementById("categories");
   
    categories.forEach((item) => {
           const buttonContainer=document.createElement('div');
           buttonContainer.innerHTML=
           `
           <button id="btn-${item.category}" onclick="loadCategoryCard('${item.category}')" class="   category-btn  ">
           <img class="h-6 w-6 lg:h-10 lg:w-10" src="${item.category_icon}"/>
           ${item.category}
           
           </button>
            `;

            categoryContainer.append(buttonContainer);

        });
   
};
loadCategories();

