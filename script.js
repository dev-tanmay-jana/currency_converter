const base_url= "https://raw.githubusercontent.com/fawazahmed0/exchange-api/main/aed/aed.json";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
    for(let currcode in countrylist){
        let newoption=document.createElement("option");
        newoption.innerText=currcode;
        newoption.value=currcode;
        if(select.name==="from"&&currcode==="USD"){
            newoption.selected="selected";
        }
        else if(select.name==="to"&&currcode==="INR"){
            newoption.selected="selected";
        }
        else{
            select.append(newoption)
        }
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
  });
}

const updaterate = async () =>{
    let amount =document.querySelector(".amount input");
    amtval=amount.value;
    if(amtval===""||amtval<1){
        amtval=1;
        amount.value="1";
    }

    const url=`${base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let responce= await fetch(url);
    let data= await responce.json();
    let rate = data[toCurr.value.toLowerCase()];

      let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};


const updateFlag = (element) =>{
    let currcode =element.value;
    let countrycode=countrylist[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src=newsrc
};
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updaterate();
});

window.addEventListener("load", () => {
  updaterate();
});