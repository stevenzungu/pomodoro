var Timer = {
  minutesLeft: 0,
  secondsLeft: 15,
  isOnBreak: false,
  numberOfBreaks: 0,
  init: function(){
    this.cacheDom();
    this.addListeners();
    this.render();
  },
  cacheDom: function(){
    this.minutes = document.querySelector('#minutes');
    this.seconds = document.querySelector('#seconds');
    this.startButton = document.querySelector('#start');
    this.bellSound = document.querySelector('#myAudio');
    this.pauseButton = document.querySelector('#pause');
  },
  render: function(){
    this.minutes.textContent = this.pad(this.minutesLeft);
    this.seconds.textContent = this.pad(this.secondsLeft);
  },
  addListeners: function(){
    // the bind statement takes the meaning of 'this' from addListeners
    // and pushes that meaning into the start function
    this.startButton.addEventListener('click', this.start.bind(this));
    this.pauseButton.addEventListener('click', this.reset.bind(this));
    //this.pauseButton = addEventListener('click', this.pause.bind(this));
  },
  start: function(){
    if(!this.timer){
        this.timer = setInterval(this.tick.bind(this), 1000);
    }
  },
  tick: function(){
    if(this.secondsLeft === 0 && this.minutesLeft === 0){
      this.playAudio();
      clearInterval(this.timer);
      this.timer = !this.timer; //dereference
      if(this.isOnBreak){
        this.numberOfBreaks += 1;
        this.resetWorkTime();
      } else {
        this.resetBreakTime();
      }
      this.isOnBreak = !this.isOnBreak;
      this.render();
      return;
    }
    this.decrementMinutes();
    this.decrementSeconds();
    this.changeColor();
    this.render();
  },
  decrementMinutes: function(){
    if(this.secondsLeft === 0){
      this.minutesLeft -= 1;
    }
  },
  decrementSeconds: function(){
    if(this.secondsLeft === 0){
      this.secondsLeft = 59;
    } else {
      this.secondsLeft -= 1;
    }
  },
  pad: function(num){
    if(num < 10){
      return `0${num}`;
    } else {
      return num;
    }
  },
  resetWorkTime: function(){
    this.minutesLeft = 00;
    this.secondsLeft = 05;
    this.seconds.style.color = "gray";
  },
  resetBreakTime: function(){
    if(this.numberOfBreaks < 3){
      this.minutesLeft = 5;
    } else {
      this.minutesLeft = 15;
      this.numberOfBreaks = 0;
    }
    this.secondsLeft = 0;
    this.seconds.style.color = "gray";
  },
  playAudio: function(){
    this.bellSound.play();
  },
  changeColor: function(){
    if(this.secondsLeft <= 10 && this.minutesLeft === 0){
      this.seconds.style.color = "#4cae4c";
    }
  },
  reset: function(){
      this.timer = clearInterval(this.timer);
      //this.render();
  },
};
Timer.init();





// Data and Variable Declarations
// var timer;
// var minutesLeft = 0;
// var secondsLeft = 5;
// var isOnBreak = false;
// var numberOfBreaks = 0;
// Getting references the DOM
// var minutes = document.querySelector('#minutes');
// var seconds = document.querySelector('#seconds');
// var startButton = document.querySelector('#start');
// Initialization Code
  //EventListeners
  // startButton.addEventListener('click', start);
  // render();
// Function Definitions
// function start(){
//   if(!timer){
//       timer = setInterval(tick, 1000);
//   }
// }
// function tick(){
//   if(secondsLeft === 0 && minutesLeft === 0){
//     clearInterval(timer);
//     timer = !timer; //dereference
//     if(isOnBreak){
//       numberOfBreaks += 1;
//       resetWorkTime();
//     } else {
//       resetBreakTime();
//     }
//     isOnBreak = !isOnBreak;
//     render();
//     return;
//   }
//   decrementMinutes();
//   decrementSeconds();
//   render();
// }
// function decrementMinutes(){
//   if(secondsLeft === 0){
//     minutesLeft -= 1;
//   }
// }
// function decrementSeconds(){
//   if(secondsLeft === 0){
//     secondsLeft = 59;
//   } else {
//     secondsLeft -= 1;
//   }
// }
// function render(){
//   minutes.textContent = pad(minutesLeft);
//   seconds.textContent = pad(secondsLeft);
// }

// function pad(num){
//   if(num < 10){
//     return `0${num}`;
//   } else {
//     return num;
//   }
// }

// function resetWorkTime(){
//   minutesLeft = 00;
//   secondsLeft = 05;
// }
// function resetBreakTime(){
//   if(numberOfBreaks < 3){
//     minutesLeft = 5;
//   } else {
//     minutesLeft = 15;
//     numberOfBreaks = 0;
//   }
//   secondsLeft = 0;
// }
