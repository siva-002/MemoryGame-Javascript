let btn=document.querySelector('button')
let body=document.querySelector('body')
let start,min,sec,milli
let second=document.querySelector('.sec')
let ms=document.querySelector('.ms')
let minute=document.querySelector('.minute')
let h3=document.querySelector('h3')
let h4=document.querySelector('h4')

btn.addEventListener('click',startgame)
function startgame(){

    started()
    btn.setAttribute('disabled',true)
}

function started(){
    min=0,sec=0,milli=0
let icons=[
    {name:'apple',icon:'<i class="fa fa-apple"></i>'},
    {name:'apple',icon:'<i class="fa fa-apple"></i>'},
    {name:'motor',icon:'<i class="fa fa-motorcycle"></i>'},
    {name:'motor',icon:'<i class="fa fa-motorcycle"></i>'},
    {name:'tree',icon:'<i class="fa fa-tree"></i>'},
    {name:'tree',icon:'<i class="fa fa-tree"></i>'},
    {name:'umbrella',icon:'<i class="fa fa-umbrella"></i>'},
    {name:'umbrella',icon:'<i class="fa fa-umbrella"></i>'},
    {name:'taxi',icon:'<i class="fa fa-taxi"></i>'},
    {name:'taxi',icon:'<i class="fa fa-taxi"></i>'},
    {name:'space',icon:'<i class="fa fa-space-shuttle"></i>'},
    {name:'space',icon:'<i class="fa fa-space-shuttle"></i>'},
]
let count=0
let game=document.querySelector('.game')
let flipped=[]
createdash()
swap()
let gameinterval=setInterval(gamer,1000)
   
function gamer(){
 
    for(i=1;i<=60;i++){
        milli++
        if(milli>=60){
            sec++
            milli=0
        }
        if(sec>=60){
            min++
            sec=0
        }
        second.innerHTML= sec<10?"0"+sec :sec
        // ms.innerHTML=milli<10?"0"+milli :milli
        minute.innerHTML=min<10?"0"+min+" : " :min +" :"
    }
}
function removeanim(){
    let elements=document.querySelectorAll('.game div')
    elements.forEach((ele)=>{
        ele.classList.remove('invalid')
    })
    }
function swap(){
    for(i=icons.length-1;i>=0;i--){
        let random=Math.floor(Math.random()*(i+1));
        [icons[i],icons[random]] = [icons[random],icons[i]]

    }
}
function createdash(){
    icons.forEach((ele,index,val)=>{
        let card=document.createElement('div')
        card.setAttribute('id',index)
        card.classList.add('card')
        game.append(card)

        card.addEventListener('click',flip)
    })
}
function flip(){
    removeanim()
    if(flipped.length<2){
    let index=this.getAttribute('id')
    this.classList.remove('card')
    this.innerHTML=icons[index].icon
    if(flipped[0]!=this)
        flipped.push(this)
 
    }
    if(flipped.length==2){
         setTimeout( checkmatch,300)
    }

}

function checkmatch(){

    let index0=flipped[0].getAttribute('id')
    let index1=flipped[1].getAttribute('id')
    if(icons[index0].name == icons[index1].name){
   
        count++
        checkgameover()
        flipped[0].classList.add('valid')
        flipped[1].classList.add('valid')
    }  else{
    flipped.forEach(ele=>{
        ele.classList.add('invalid')
    })
        flipped[0].innerHTML=""
        flipped[0].classList.add('card')
        flipped[1].innerHTML=""
        flipped[1].classList.add('card')
    }  

    flipped=[]
       
}
//game.classList.add('opacity')
function checkgameover(){
    // console.log(icons.length/2)
    // console.log(count)
    if(icons.length/2 == count){
        clearInterval(gameinterval)
        game.classList.add('opacity')
  
       h3.innerHTML="<i class='fa fa-trophy'></i> YOU WON"
       h4.innerHTML=` ${min}  Minutes and ${sec} Seconds`
        let newbtn=document.createElement('button')
        newbtn.classList.add('newbtn')
        newbtn.innerHTML="START AGAIN"
        body.appendChild(newbtn)
        newbtn.addEventListener('click',newgame)

    }
}
function newgame(){
    clearInterval(gameinterval)
    while(game.firstChild){
        game.removeChild(game.firstChild)
    }
    game.classList.remove('opacity')
    h3.innerHTML=""
    h4.innerHTML=""
    body.removeChild(this)
    started()

}
}