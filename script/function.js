

const LoadCategories = ()=>{
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res)=>res.json())
    .then((data)=> displayCategories(data.categories))
    .catch((error)=>console.log(error));
};
const LoadCards = ()=>{
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res)=>res.json())
    .then((data)=>displayPets(data.pets))
    .catch((error)=>console.log(error));
};

const displayPets =(pets) =>{
    const cardContainer=document.getElementById("cards");
    pets.forEach((pet)=>{
        console.log(pet);
        const breed =pet.breed||"Not Available "
        const birth =pet.date_of_birth||"Not Available "
        const gender=pet.gender||"Not Available "
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
    <img src="https://img.icons8.com/?size=48&id=i2o6gXhX4Euy&format=png"/>
    </div>
    <p> Price: ${pet.price} $ </p>
    </div>
    <hr/>
    <div class="flex justify-center gap-5 py-5 ">
     <div class="  px-4  border border-7 border-black rounded-lg">
     <button class="w-8 h-8 py-2">
     <img src="https://img.icons8.com/?size=48&id=82788&format=png">
     </button>
     </div>
     <div ">
     <button class="btn btn-outline ">Adopt</button>
 
     </div>
     <div>
         <button class="btn btn-outline">Details</button>
     </div>
     
   </div>
    </div>
        `
        cardContainer.append(card);
    })
}
const displayCategories = (categories)=>{
    const categoryContainer=document.getElementById("categories");
        
        categories.forEach((item)=>{
            const button = document.createElement("button");
            button.classList="btn"
            button.innerText = item.category;

            categoryContainer.append(button);

        });
   
};
LoadCategories();
LoadCards();