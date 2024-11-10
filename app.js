
const dropdownSelect=document.querySelectorAll(".dropdown select");

for(let select of dropdownSelect){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag=(element)=>{
    let code=element.value;
    let countryCode=countryList[code];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

async function getRate(fromCode,toCode){
    let URL=`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCode}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    return data[fromCode][toCode];
}


let button=document.querySelector("button");
let from=document.querySelector(".dropdown .from select");
let to=document.querySelector(".dropdown .to select");


button.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let ammount=document.querySelector("input").value;
    let rate=await getRate(from.value.toLowerCase(),to.value.toLowerCase());
    document.querySelector(".msg").innerText=`${ammount} ${from.value} = ${rate*ammount} ${to.value}`;
})