const grid = document.querySelector('.grid')
const startButton = document.getElementById('start')
const scoreDisplay = document.getElementById('score')
let squares = []
let currentSnake = [2,1,0]
let direction = 1
const widthGrid = 10
let appleIndex = 0
let score = 0
let intervalTime = 1000
let speed = 0.9
let timerId = 0

function createGrid() {
    //create 100 of these elements with a for loop
    for (let i=0; i < widthGrid*widthGrid; i++) {
     //create element
    const square = document.createElement('div')
    //add styling to the element
    square.classList.add('square')
    //put the element into our grid
    grid.appendChild(square)
    //push it into a new squares array    
    squares.push(square)
    }
}
createGrid()

currentSnake.forEach(index => squares[index].classList.add('snake'))

function startGame() {
    //remove the snake
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    //remove the apple
    squares[appleIndex].classList.remove('apple')
    clearInterval(timerId)
    currentSnake = [2,1,0]
    score = 0
    //re-add new score to browser
    scoreDisplay.textContent = score
    direction = 1
    intervalTime = 1000
    generateApple()
    //re-add the class of snake to our new currentSnake
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    timerId = setInterval(move, intervalTime)
    
}

function move() {
    if (
        (currentSnake[0] + widthGrid >= widthGrid*widthGrid && direction === widthGrid) || //if snake has hit bottom
        (currentSnake[0] % widthGrid === widthGrid-1 && direction === 1) || //if snake has hit right wall
        (currentSnake[0] % widthGrid === 0 && direction === -1) || //if snake has hit left wall
        (currentSnake[0] - widthGrid < 0 && direction === -widthGrid) || //if snake has hit top
        squares[currentSnake[0] + direction].classList.contains('snake') //if snake runs into itself
    )
    // if any of the above, clear the interval and so stop snake moving
    return clearInterval(timerId) 
   

    //remove last element from our currentSnake array
    const tail = currentSnake.pop()
    //remove styling from last element
    squares[tail].classList.remove('snake')
    //add square in direction we are heading
    currentSnake.unshift(currentSnake[0] + direction)
    //add styling so we can see it
    squares[currentSnake[0]].classList.add('snake')
    //when the snake head overlaps with apple
    if (squares[currentSnake[0]].classList.contains('apple')) {
        //remove the class of apple
        squares[currentSnake[0]].classList.remove('apple')
        //grow our snake by adding class of snake to it
        squares[tail].classList.add('snake')
        console.log(tail)
        //grow our snake array
        currentSnake.push(tail)
        console.log(currentSnake)
        //generate new apple
        generateApple()
        //add one to the score
        score++
        //display our score
        scoreDisplay.textContent = score
        //speed up our snake
        clearInterval(timerId)
        intervalTime = intervalTime * speed
        timerId = setInterval(move, intervalTime)
    }
    
}

function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
} 
generateApple()

// 39 is right arrow
// 38 is for the up arrow
// 37 is for the left arrow
// 40 is for the down arrow

function control(e) {
    if (e.keyCode === 39) {
        console.log('right pressed')
        direction = 1
    } else if (e.keyCode === 38) {
        console.log('up pressed')
        direction = -widthGrid
    } else if (e.keyCode === 37) {
        console.log('left pressed')
        direction = -1
    } else if (e.keyCode === 40) {
        console.log('down pressed')
        direction = +widthGrid
    }
}
document.addEventListener('keyup', control)
startButton.addEventListener('click', startGame)


startButton.addEventListener('keydown', (e) => {
  if (e.target.localName) { 
      switch (e.keyCode) {
          case 37: // left
          case 39: // right
              e.preventDefault();
              break;
          case 38: // up
          case 40: // down
              e.preventDefault();
              break;
          default:
              break;
      }
  }
}, {
  capture: true,   // this disables arrow key scrolling in modern Chrome
  passive: false   // this is optional, my code works without it
});



/** Carousel gallery is from https://github.com/benkimo6i/vanilla-js-carousel/blob/master/index.html
   I've adapted it here, i.e. re-styled it and moved on top of the snake game */

const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ['previous', 'next']; // removed 'add'
const galleryItems = document.querySelectorAll('.gallery-item');

// original author used this to create another gallery for thumbnails. 
// I've removed thumbnails, so could remove the constructor
class Carousel {
  constructor(container, items, controls) {
    this.carouselContainer = container;
    this.carouselControls = controls;
    this.carouselArray = [...items];
  }

  // Update css classes for gallery
  updateGallery() {
    this.carouselArray.forEach(el => {
      el.classList.remove('gallery-item-1');
      el.classList.remove('gallery-item-2');
      el.classList.remove('gallery-item-3');
      el.classList.remove('gallery-item-4');
      el.classList.remove('gallery-item-5');
    });

    // don't need slice for only 5 items - originally if new items added. Delete
    this.carouselArray.slice(0, 5).forEach((el, i) => {
      el.classList.add(`gallery-item-${i+1}`);
    });
  }

  // Update the current order of the carouselArray and gallery, then fire updateGallery
  setCurrentState(direction) {

    if (direction.className == 'gallery-controls-previous') {
      this.carouselArray.unshift(this.carouselArray.pop());
    } else {
      this.carouselArray.push(this.carouselArray.shift());
    }
    
    this.updateGallery();
  }

  // Construct the carousel navigation
  // setNav() {
  //   galleryContainer.appendChild(document.createElement('ul')).className = 'gallery-nav';

  //   this.carouselArray.forEach(item => {
  //     const nav = galleryContainer.lastElementChild;
  //     nav.appendChild(document.createElement('li'));
  //   }); 
  // }

  // Construct the carousel controls
  setControls() {
    this.carouselControls.forEach(control => {
      galleryControlsContainer.appendChild(document.createElement('button')).className = `gallery-controls-${control}`;
    });
  }
 
  // Add a click event listener to trigger setCurrentState method to rearrange carousel
  useControls() {
    const triggers = [...galleryControlsContainer.childNodes];

    triggers.forEach(control => {
      control.addEventListener('click', e => {
        e.preventDefault();
        this.setCurrentState(control);

        // Snake grid fade in/out
          grid.classList.add("gridFadeInOut");
        // start button fade in/out NOT working 
          startButton.classList.add("startFadeInOut")

        // Wait until the animation is over and then remove the class, so that
        // the next click can re-add it.
          setTimeout(function(){grid.classList.remove("gridFadeInOut");}, 500);

      });
    });
  }
}

const phoneCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);

phoneCarousel.setControls();
// exampleCarousel.setNav();
phoneCarousel.useControls();


// Control YouTube embed
// To use API, iFrame player API code must load asynchronously
// var tag = document.createElement('script');
// tag.src = "https://www.youtube.com/iframe_api";
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// function onYouTubeIframeAPIReady() {
//   player = new YT.Player('youtube', {
//     videoId: '9sZQ0m5oKLc',
//     events: {
//       'onReady': onPlayerReady,
//       'onStateChange': onPlayerStateChange
//     }
//   });
// }

