// let items = Array.from({length: 100}, (_, i) => `Item ${i+1}`); // Generate 100 items
let currentPage = 1;
let itemsPerPage = 10;
let search=''
let totalItems=0;
let listItems=[];
//  In this example, each grid item is a clickable element. When a grid item is clicked, the modal appears. The modal can be closed by clicking the 'X' button in the top right of the modal, or by clicking outside the modal.
 
 
 
 
 
// fetch('https://jsonplaceholder.typicode.com/todos?limit=5') // replace with your API endpoint
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(json => {
//     data = json.slice(0,10);
//     console.log(data,'dddd');
//     // localStorage.setItem('myList',JSON.stringify(...data));
//     tasks.push(...data);
//     console.log(tasks,'ttt');
//     displayTasks();
//   })
//   .catch(error => {
//     console.error('There has been a problem with your fetch operation:', error);
//   });


document.getElementById('search-btn').addEventListener('click', function() {
    var searchTerm = document.getElementById('search-input').value;
    // alert('Searching for: ' + searchTerm);
    search=searchTerm;
    displayGridItems();
  });

  function displayGridItems() {

    // let start = (currentPage - 1) * itemsPerPage;
    // let end = start + itemsPerPage;
    // let itemsToDisplay = items.slice(start, end);
    listItems=[];
    fetch(`https://www.omdbapi.com/?s=${search}&page=${currentPage}&apikey=ebbc68a5&`) // replace with your API endpoint
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(json => {
    data = json;
    console.log(data,'dddd');
    totalItems=data.totalResults;
    // if(totalIte)
    listItems.push(...data.Search)
    console.log(totalItems,listItems,'ddd');
    // localStorage.setItem('myList',JSON.stringify(...data));
    // tasks.push(...data);
    // console.log(tasks,'ttt');
    // displayTasks();
    
    let gridContainer = document.getElementById('grid-container');
    gridContainer.innerHTML = '';
    console.log('ddaaad',listItems);
    listItems.forEach(item => {
        console.log('item',item);
      let div = document.createElement('div');
    //   div.textContent = item;
      div.className = 'grid-item';
      let titleDiv=document.createElement('div');
      titleDiv.className='titleDiv';
      let title=document.createElement('span');
title.textContent=item.Title;
titleDiv.appendChild(title);
      let imgDiv=document.createElement('div');
      imgDiv.className='grid-image';
      let imgElement = document.createElement("img");

// Set the source of the image
imgElement.src = item.Poster;

// Optionally, you can also set other attributes like alt, width, height, etc.
imgElement.alt = "Descriptive text";
imgElement.className='grid-item-img';
// imgElement.width = 500;
// imgElement.height = 300;
imgDiv.appendChild(imgElement);

let description=document.createElement('div');
description.className='item-desc';


let year=document.createElement('span');
year.textContent=item.Year;

let type=document.createElement('span');
type.textContent=item.Type;

// description.appendChild(title);
description.appendChild(type);
description.appendChild(year);
div.appendChild(titleDiv);
div.appendChild(imgDiv);
div.appendChild(description);
gridContainer.appendChild(div);


//  var gridItems1 = document.querySelectorAll(".grid-item");
//  for (var i = 0; i < gridItems1.length; i++) {
   div.addEventListener("click", function() {
     console.log('clickke');
     fetch(`https://www.omdbapi.com/?i=${item.imdbID}&apikey=ebbc68a5`)
     .then(res => {
       if (!res.ok) {
         throw new Error('There is some error');
       }
       return res.json();
     })
     .then(data => {
      //  showme(data);
      console.log(data,'sshihih');
       let modalContent=document.getElementById('modal-content');
       var modalImage=document.createElement('img');
       modalImage.src = data.Poster;

// Optionally, you can also set other attributes like alt, width, height, etc.
modalImage.alt = "Descriptive text";
modalImage.className='modal-item-img';
// modalImage.height='400px';
// modalImage.width='200px';
       var modalDescription=document.createElement('span');
       modalDescription.textContent=data.Plot;
       modalContent.appendChild(modalImage);
       modalContent.appendChild(modalDescription);
  
       modal1.style.display = "block";
       
     })
     .catch(error => {
       console.error('Error:', error);
     });

   });
//  }
 
 

    });
    displayPagination();
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
    alert('No movie found or too many results...Please enter a valid movie name');
  });

  }
  
  function displayPagination() {
    let pageCount = Math.ceil(totalItems / itemsPerPage);
    let maxVisibleButtons=5;
    let paginationContainer = document.getElementById('pagination-container');
    paginationContainer.innerHTML = '';
    
    let startPage = Math.max(currentPage - Math.floor(maxVisibleButtons / 2), 1);
  let endPage = Math.min(startPage + maxVisibleButtons - 1, pageCount);
  
  // create previous button
  let previousButton = document.createElement('button');
  previousButton.textContent = "Previous";
  previousButton.className = 'pagination-btn';
  previousButton.disabled = currentPage === 1;
  previousButton.addEventListener('click', function() {
    currentPage = Math.max(currentPage - 1, 1);
        displayGridItems();
        displayPagination();
      });
      paginationContainer.appendChild(previousButton);

      // create page buttons
  for(let i = startPage; i <= endPage; i++) {
    let btn = document.createElement('button');
    btn.textContent = i;
    btn.className = 'pagination-btn';
    if(i === currentPage) {
      btn.classList.add('active');
      btn.disabled = true;
    }
    btn.addEventListener('click', function() {
      currentPage = i;
      displayGridItems();
      displayPagination();
    });
    paginationContainer.appendChild(btn);
  }

  // create next button
  let nextButton = document.createElement('button');
  nextButton.textContent = "Next";
  nextButton.className = 'pagination-btn';
  nextButton.disabled = currentPage === pageCount;
  nextButton.addEventListener('click', function() {
    currentPage = Math.min(currentPage + 1, pageCount);
    displayGridItems();
    displayPagination();
  });
  paginationContainer.appendChild(nextButton);
 }
 
 var modal1 = document.getElementById("myModal");
 var span1 = document.getElementsByClassName("close")[0];
 
 span1.onclick = function() {
  modal1.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal1) 
  {
    modal1.style.display = "none";
    // <span class="close">&times;</span>

    let modalContent=document.getElementById('modal-content');
    modalContent.innerHTML='';
    let modalSpan=document.createElement('span');

  }
}
//   displayGridItems();
//   displayPagination();
  