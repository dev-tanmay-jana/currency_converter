const base_url= "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const amt = document.querySelector(".amt")

for(let select of dropdowns){
    for(let currcode in countrylist){
        console.log(currcode,countrylist[currcode]);
        let newoption=document.createElement("option");
        newoption.innerText=currcode;
        newoption.value=currcode;
        if(select.name==="from"&&currcode==="USD"){
            newoption.selected="selected";
        }
        else if(select.name==="to"&&currcode==="INR"){
            newoption.selected="selected";
        }
        select.append(newoption)
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
  });
}

const updaterate = async () =>{
    let amount =document.querySelector(".amount input");
    amtval=amount.value;
    console.log(amtval)
    if(amtval===""||amtval<1){
        amtval=1;
        amount.value="1";
    }
    console.log(fromcurr.value,tocurr.value);

    const url = `${base_url}/${fromcurr.value.toLowerCase()}.json`;
    console.log(url)
    let responce= await fetch(url);
    console.log(responce);
    let data= await responce.json();
    console.log(data)
    const fromCurrencyData = data[fromcurr.value.toLowerCase()];
    let rate = fromCurrencyData[tocurr.value.toLowerCase()];
    console.log(rate);
    amt.innerText = `1 ${fromcurr.value} = ${rate} ${tocurr.value}`;
    let finalAmount = amtval * rate;
    console.log(finalAmount);
    msg.innerText = `${amtval} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`;
};

const updateFlag = (element) =>{
    let currcode =element.value;
    console.log(currcode);
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