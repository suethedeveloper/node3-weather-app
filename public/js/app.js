const watherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#msg-1");
const messageTwo = document.querySelector("#msg-2");

watherForm.addEventListener("submit", event => {
    event.preventDefault();
   const location = search.value;


   messageOne.textContent = "Loading...";
   messageTwo.textContent = "";
   
   fetch(`/weather?address=${location}`).then(response => {
       response.json().then(data => {
           console.log(data)
           if (data.err) {
               messageOne.textContent = data.err;
           } else {
               messageOne.textContent = data.location;
               messageTwo.textContent = data.forecast;
           }
       });
   })
});