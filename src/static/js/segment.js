const body=document.querySelector("body");

function setHeight(){

  const drag=document.querySelector(".drag-area");

let dragWidth=drag.clientWidth,
dragHeight=drag.clientHeight;
const imag = document.querySelector('.img');
const imagg=imag.querySelector('img');
imagg.style.height=dragHeight*0.75;
imagg.style.width=dragWidth;

};

// function fade(element) {
//   element.style.display = 'inline';
//   var op = 1;  // initial opacity
//   var timer = setInterval(function () {
//       if (op <= 0.1){
//           clearInterval(timer);
//           element.style.display = 'none';
//       }
//       element.style.opacity = op;
//       element.style.filter = 'alpha(opacity=' + op * 100 + ")";
//       op -= op * 0.1;
//   }, 80);
// };

// function copyText(){
 
//   const textArea=document.querySelector('textarea');
//   const text = textArea.value,
//   notify = document.querySelector("#notification");

//   navigator.clipboard.writeText(text)
//   .then(()=>{
//     fade(notify);

//   });
  

  // Document.execCommand('copy');
// };


console.log(body.innerHTML);
window.onload= function(){
 
const dropArea = document.querySelector(".drag-area"),
dragText = dropArea.querySelector("header"),
button = dropArea.querySelector("button"),
input = dropArea.querySelector("input");
// copyTextButton = document.querySelector(".copytext") ;



// copyTextButton.addEventListener('click',copyText);


let file; //this is a global variable and we'll use it inside multiple functions
button.onclick = ()=>{
  input.click(); //if user click on the button then the input also clicked
}
input.addEventListener("change", function(){
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = this.files[0];
  dropArea.classList.add("active");
  showFile(); //calling function
});
//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event)=>{
  event.preventDefault(); //preventing from default behaviour
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});
//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", ()=>{
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});
//If user drop File on DropArea
dropArea.addEventListener("drop", (event)=>{
  event.preventDefault(); //preventing from default behaviour
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = event.dataTransfer.files[0];
  showFile(); //calling function
});
function showFile(){
  let fileType = file.type; //getting selected file type
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
  if(validExtensions.includes(fileType)){ //if user selected file is an image file
    let fileReader = new FileReader(); //creating new FileReader object
    fileReader.onload = ()=>{
      let fileURL = fileReader.result; //passing user file source in fileURL variable
       
       let imgTag = `
       <div class="align">
       <div class="back">
       
       <a href="segment.html"><button id="previous">←</button></a>
       </div>
        
      <div class="img"> 
       <img src="${fileURL}" id="image" alt=" ">    
       </div>

       <div class="next">
       <button id="upload">Upload</button>
       </div>
       </div>
       
       `;
   

      dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
      setHeight();
      window.addEventListener('resize',setHeight);
     
    }
    fileReader.readAsDataURL(file);
  }else{
    alert("This is not an Image File!");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}

}