// French Classical Menu Challenge
// Version 1.0

const correctOrder = [
  {name:"Hors d'oeuvre",desc:"Appetiser"},
  {name:"Potage",desc:"Soup"},
  {name:"Oeufs",desc:"Egg dishes"},
  {name:"Farineaux",desc:"Pasta and rice"},
  {name:"Poisson",desc:"Fish"},
  {name:"Entrée",desc:"First meat dish"},
  {name:"Sorbet",desc:"Flavoured ice-water"},
  {name:"Relevé",desc:"Main meat dish/joints"},
  {name:"Rôti",desc:"Roast/game and poultry"},
  {name:"Légumes",desc:"Vegetables"},
  {name:"Salade",desc:"Salad"},
  {name:"Buffet froid",desc:"Cold buffet"},
  {name:"Fromage",desc:"Cheese"},
  {name:"Entremets",desc:"Sweet"},
  {name:"Savoureux",desc:"Savoury"},
  {name:"Desservir",desc:"Dessert (fruit and nuts)"},
  {name:"Boissons",desc:"Beverages"}
];

let cards = [];
let dragItem = null;

const list = document.getElementById("menuList");
const score = document.getElementById("score");
const success = document.getElementById("successMessage");

function shuffle(a){
  for(let i=a.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
}

function startGame(){
  cards=[...correctOrder];
  shuffle(cards);
  success.classList.add("hidden");
  score.textContent="0 / 17";
  render();
}

function render(){
  list.innerHTML="";
  cards.forEach(card=>{
    const li=document.createElement("li");
    li.draggable=true;

    const title=document.createElement("div");
    title.className="course-name";
    title.textContent=card.name;

    const sub=document.createElement("div");
    sub.className="course-desc";
    sub.textContent=card.desc;

    li.appendChild(title);
    li.appendChild(sub);

    li.addEventListener("dragstart",()=>{
      dragItem=li;
      setTimeout(()=>li.classList.add("dragging"),0);
    });

    li.addEventListener("dragend",()=>{
      li.classList.remove("dragging");
      dragItem=null;
      updateArray();
    });

    list.appendChild(li);
  });
}

list.addEventListener("dragover",(e)=>{
  e.preventDefault();
  const after=getAfterElement(list,e.clientY);
  const dragging=document.querySelector(".dragging");
  if(!dragging) return;
  if(after==null){
    list.appendChild(dragging);
  }else{
    list.insertBefore(dragging,after);
  }
});

function getAfterElement(container,y){
  const els=[...container.querySelectorAll("li:not(.dragging)")];
  return els.reduce((closest,child)=>{
    const box=child.getBoundingClientRect();
    const offset=y-box.top-box.height/2;
    if(offset<0 && offset>closest.offset){
      return {offset:offset,element:child};
    }
    return closest;
  },{offset:Number.NEGATIVE_INFINITY}).element;
}

function updateArray(){
  const newCards=[];
  [...list.children].forEach(li=>{
    const name=li.querySelector(".course-name").textContent;
    const obj=correctOrder.find(c=>c.name===name);
    newCards.push(obj);
  });
  cards=newCards;
}

document.getElementById("checkBtn").addEventListener("click",()=>{
  updateArray();
  let total=0;

  [...list.children].forEach((li,index)=>{
    li.classList.remove("correct","incorrect");
    if(cards[index].name===correctOrder[index].name){
      li.classList.add("correct");
      total++;
    }else{
      li.classList.add("incorrect");
    }
  });

  score.textContent=`${total} / 17`;

  if(total===17){
    success.classList.remove("hidden");
  }else{
    success.classList.add("hidden");
  }
});

document.getElementById("shuffleBtn").addEventListener("click",startGame);
document.getElementById("resetBtn").addEventListener("click",startGame);

startGame();
