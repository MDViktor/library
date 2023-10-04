const burgerBtn = document.querySelector('.burger_menu_btn');
const menu = document.querySelector('.burger_menu_frame');
const active = document.querySelector('.burger_menu_btn.active');
const burgerWrapper = document.querySelector(".burger_menu_wrapper");
const pagination = document.querySelectorAll(".pagination_wrapper");
const firstDot = document.getElementById("button_one");
const secondDot = document.getElementById("button_two");
const thirdDot = document.getElementById("button_three");
const fourthDot = document.getElementById("button_four");
const fifthDot = document.getElementById("button_five");
const slideOne = document.getElementById("first");
const carousel = document.querySelector('.carousel_container');
const left = document.querySelector('.nav_arrow_left');
const right = document.querySelector('.nav_arrow_right');
const images = document.querySelectorAll('.carousel_item');
const tabletCarousel = document.querySelector('.carousel_line');
let offset = 0;
let opacityDot = 0.5;
let prev = 0;
let slider_step = slideOne.clientWidth + 25;
let signal = 'var(--gold)';

burgerBtn.addEventListener('click', function(){
	burgerBtn.classList.toggle('active');
  menu.classList.toggle('active');
  burgerWrapper.classList.toggle('damping');
})

const burgerWrapperClose = (event) => {
  element = event.target;
  if (element !== menu) {
    burgerBtn.classList.toggle('active');
    burgerWrapper.classList.remove('damping');
    menu.classList.remove('active');
  }
}

burgerWrapper.addEventListener('click', burgerWrapperClose);

//<-- slider-->//

const setDisabled = (button) => {
  button.childNodes[1].setAttribute('disabled', '');
}
const removeDisabled = (button) => {
  button.childNodes[1].removeAttribute('disabled');
}

const getTabletPaginationMove = () =>{
  for (key of pagination){
    if (key === pagination[-offset/475]){
      key.childNodes[1].style.setProperty('background-color', signal);
    } else {
      key.childNodes[1].style.setProperty('background-color', 'var(--dark-blue)');
    }
  }
}

const getMoveRight = (event) => {

  if (event === left){
    offset -= slider_step;
    if ((-offset)>4*slider_step){
      offset = 4*(-slider_step);
    }
    tabletCarousel.style.left = offset + 'px';

  } else {
    offset -= slider_step;
    if(getComputedStyle(left).display === 'none'){
      if ((-offset) > slider_step){
        if(event === secondDot){
          offset = -slider_step;
        }else if(event === thirdDot){
          offset = 2*(-slider_step);
        }
      }
      if (-offset>2*slider_step){
        offset = 2*(-slider_step);
      }
      carousel.style.left = offset + 'px';
    } else {
      console.log(`${offset} -vou`);
      if ((-offset)>4*slider_step){
        offset = 4*(-slider_step);
      }
      tabletCarousel.style.left = offset + 'px';
    }
  }
}

const getMoveLeft = (event) => {
  if (event === right){
    offset += slider_step;
    if (offset>=slider_step){
      offset = 0;
    }
    tabletCarousel.style.left = offset + 'px';
  } else {
    offset += slider_step;
    if (offset >= slider_step){
      offset = 0;
    }
    if(getComputedStyle(left).display === 'none'){
      carousel.style.left = offset + 'px';
    } else {
      tabletCarousel.style.left = offset + 'px';
    }
  }
}

const getMove_tablet = (event) => {
  event.addEventListener('click', function(e){
    if(e.target.contains(left)){
      getMoveRight(e.target);
      getTabletPaginationMove();
    }
    if (e.target.contains(right)) {
      getMoveLeft(e.target);
      getTabletPaginationMove();
    }
  });

}

const getMove = (event) => {
  pagination.forEach(element => {
    if(getComputedStyle(element.childNodes[1]).getPropertyValue('background-color')==='rgb(187, 148, 95)'){
      setDisabled(element);
    }
    element.addEventListener('click', function(e){
      if (getComputedStyle(left).display !== 'none'){
        console.log(prev);
        // console.log(`prev ${offset}`,Object.keys(pagination), element.childNodes[1]);
        for (let key of pagination){
          if(e.target===key.childNodes[1]){
            if(prev<Object.values(pagination).indexOf(key)){
              getMoveRight(key);
              getTabletPaginationMove();
            }
            if(prev>Object.values(pagination).indexOf(key)){
              getMoveLeft(key);
              getTabletPaginationMove();
            }
            if ((Math.abs(Object.values(pagination).indexOf(key)-prev)>1)&&Object.values(pagination).indexOf(key)>prev){
              prev = prev + 1;
            } else if ((Math.abs(Object.values(pagination).indexOf(key)-prev)>1)&&Object.values(pagination).indexOf(key)<prev){
              prev = prev - 1;
            } else {
              prev = Object.values(pagination).indexOf(key);
            }
          }
        }
      }
      if(e.target.contains(secondDot)&&(getComputedStyle(left).display === 'none')){
        getMoveRight(e.target);
        secondDot.style.setProperty('background-color', signal);
        firstDot.style.setProperty('background-color', 'var(--dark-blue)');
        thirdDot.style.setProperty('background-color', 'var(--dark-blue)');
      };
      if(e.target.contains(firstDot)&&(getComputedStyle(left).display === 'none')){
        getMoveLeft(e.target);
        if(-offset===slider_step){
          thirdDot.style.setProperty('background-color', 'var(--dark-blue)');
          firstDot.style.setProperty('background-color', 'var(--dark-blue)');
          secondDot.style.setProperty('background-color', signal);
        }else{
          firstDot.style.setProperty('background-color', signal);
          secondDot.style.setProperty('background-color', 'var(--dark-blue)');
          thirdDot.style.setProperty('background-color', 'var(--dark-blue)');
        };
      };
      if(e.target.contains(thirdDot)&&(getComputedStyle(left).display === 'none')){
        getMoveRight(e.target);
        if(-offset===slider_step){
          thirdDot.style.setProperty('background-color', 'var(--dark-blue)');
          firstDot.style.setProperty('background-color', 'var(--dark-blue)');
          secondDot.style.setProperty('background-color', signal);
        }else{
          thirdDot.style.setProperty('background-color', signal);
          firstDot.style.setProperty('background-color', 'var(--dark-blue)');
          secondDot.style.setProperty('background-color', 'var(--dark-blue)');
        };
      }
    });
    // console.log(element.childNodes[1]);
    if(getComputedStyle(element.childNodes[1]).getPropertyValue('background-color')==='rgb(187, 148, 95)'){
      console.log(element.childNodes[1]);
      setDisabled(element);
    } //STOP HERE
  });
}
getMove(pagination);
getMove_tablet(left);
getMove_tablet(right);

// for (let curr of pagination){
//   if(getComputedStyle(curr.childNodes[1]).getPropertyValue('background-color')==='rgb(187, 148, 95)'){
//     console.log('check');
//     curr.childNodes[1].setAttribute('disabled', '');
//   };
// }// наработка 

