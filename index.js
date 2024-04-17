// querying the button to toggle dark mode
const toggleDarkButton = document.querySelector("#theme-button");



let count = 3;


// making the function that changes the theme to dark mode
const toggleDarkMode = () => {  
  document.body.classList.toggle("dark-mode");
  // changing the text of the button to say light mode or dark mode
  let themeButton = document.querySelector("#theme-button")
  if (themeButton.textContent == "Toggle Dark Mode") {
    themeButton.textContent = "Toggle Light Mode"
  } else {
    themeButton.textContent = "Toggle Dark Mode"
  }

};

// registering a click listener
toggleDarkButton.addEventListener("click", toggleDarkMode);


// Add your query for the sign now button here
const signNowButton = document.querySelector("#sign-now-button");

const addSignature = (person) => {
    // Write your code to manipulate the DOM here
  document.querySelector("#counter").remove();
  let signatures = document.querySelector(".signatures");
  
  let newSignature = "🖊️ " + person.name + " from " + person.city + " supports this.";
  signatures.innerHTML += "<p>" + newSignature + "</p>";
  count++;
  signatures.innerHTML += "<p id=\"counter\"> 🖊️ " + count + " people have signed this petition and support this cause.</p>";
  
}



// unit 7 starter code

// TODO: Remove the click event listener that calls addSignature()

// TODO: Complete validation form

const validateForm = () => {
  let containsErrors = false;
  let modal = document.querySelector("#thanks-modal");
  let petitionInputs = document.getElementById("sign-petition").elements;
  let person = {
    name: petitionInputs[0].value,
    city: petitionInputs[1].value,
    email: petitionInputs[2].value
  }
  // TODO: Loop through all inputs
  // TODO: Validate the value of each input
  for (let i = 0; i < petitionInputs.length; i++) {

      if (petitionInputs[i].value.length < 2) {
          containsErrors = true;
          petitionInputs[i].classList.add("error");
      } else {
          petitionInputs[i].classList.remove("error");
      }
  }
  
  // email verification
  if (!person.email.includes(".com")) {
      petitionInputs[2].classList.add("error");
      containsErrors = true
  } else {
      petitionInputs[2].classList.remove("error");
  }
  
  // TODO: Call addSignature() and clear fields if no errors
  if (containsErrors == false) {
      addSignature(person);
      toggleModal(person)
      setTimeout(() => {
        modal.style.display = "none";
        clearInterval(intervalID);
      }, 5000);
      for (let i = 0; i < petitionInputs.length; i++) {
          petitionInputs[i].value = "";
          containsErrors = false;
      }
  }
}

const addInputListeners = () => {
  petitionInputs = document.getElementById("sign-petition").elements

  for (let i = 0; i < petitionInputs.length; i++) {
    petitionInputs[i].addEventListener("keydown", function() {
      petitionInputs[i].classList.remove("error");
    });
  }
  
}

signNowButton.addEventListener('click', validateForm);
addInputListeners()





// start of Milestone 3 stuff!
let scaleFactor = 1;
let modalImage = document.querySelector("#modal-gif");
let intervalID = 0;

let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
};

revealableContainers = document.querySelectorAll(".revealable");

const reveal = () => {
  for (let i = 0; i < revealableContainers.length; i++) {
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;

    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      // add the active class to the revealableContainer's classlist
        revealableContainers[i].classList.add("active");
    } else {
      // remove the active class to the revealableContainer's classlist
        revealableContainers[i].classList.remove("active");
    }
  }
};

window.addEventListener("scroll", reveal);

// reduce motion function, removes all motion so it's a static and boring website!
let reduceMotionBtn = document.querySelector("#reduceMotionBtn");

const reduceMotion = () => {

  if (reduceMotionBtn.textContent == "Reduce Motion") {
    animation.revealDistance = 0;
    animation.transitionDuration = 'none';
    animation.transitionProperty = 'none';
    reduceMotionBtn.textContent = "Turn On Motion";
  } else {
    animation.revealDistance = 150;
    animation.transitionDuration = '2s';
    animation.transitionProperty = 'all';
    reduceMotionBtn.textContent = "Reduce Motion";
  }
 
  for (let i = 0; i < revealableContainers.length; i++) {
    revealableContainers[i].style.transitionDuration = animation.transitionDuration;
    revealableContainers[i].style.transitionProperty = animation.transitionProperty;
  }
}

reduceMotionBtn.addEventListener("click", reduceMotion)


// *** modal stuff ***
const toggleModal = (person) => {
  const modal = document.querySelector("#thanks-modal");
  const modalText = document.querySelector("#modal-text");
  modal.style.display = "flex";
  intervalID = setInterval(scaleImage, 500)

  modalText.textContent = "Thank you " + person.name + "! All your support will help us keep TNR going! 🐈";
};

const scaleImage = () => {
  if (scaleFactor == 1) {
    scaleFactor = 0.8;
  } else {
    scaleFactor = 1;
  }

  modalImage.style.transform = `scale(${scaleFactor})`;
}

let closeModalBtn = document.querySelector("#closeModalBtn");

const closeModal = () => {
  let modal = document.querySelector("#thanks-modal");
  modal.style.display = "none";
};

closeModalBtn.addEventListener('click', closeModal);
