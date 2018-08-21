var myHeading = document.querySelector('h1');
myHeading.textContent = 'Hello world!';

var img1 = document.querySelector('img');
var img1Src = img1.getAttribute('src');
console.log('img1Src:'+img1Src);

var myImg1 = document.querySelector('img');
myImg1.onclick = function(){
    var mySrc = myImg1.getAttribute('src');
    if(mySrc ==='../images/background1.bmp'){
        myImg1.setAttribute('src','../images/background2.bmp');
    }
    else {
        myImg1.setAttribute('src','../images/background1.bmp');
    }
}

var myButton = document.querySelector('button');
var myHeading = document.querySelector('h1');
myButton.onclick = function() {
    setUserName();
  }
  
if(!localStorage.getItem('name')) {
    setUserName();
  } else {
    var storedName = localStorage.getItem('name');
    myHeading.textContent = 'Mozilla is cool, ' + storedName;
  }


function setUserName() {
    var myName = prompt('Please enter your name.');
    localStorage.setItem('name', myName);
    myHeading.textContent = 'Mozilla is cool, ' + myName;
  }