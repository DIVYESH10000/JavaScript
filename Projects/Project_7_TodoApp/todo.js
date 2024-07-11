
// We need a global structure to maintain Todo List
let todoList = [
  // {
  //   item: 'Goto SapceX', 
  //   dueDate: '7/10/2024'
  // }, 
  // {
  //   item: 'Buy Google', 
  //   dueDate: '7/10/2024'
  // }, 
  // {
  //   item: 'Meet Ed Snowden', 
  //   dueDate: '7/10/2024'
  // }
];



let saved = localStorage.getItem('savedTodo');

getSaved(saved);

function getSaved(saved) {
  todoList = saved ? JSON.parse(saved) : [];
}

displayItems(); // To get the already added todoItems


// This executes on clicking Add Button
function addTodo(){
  let inputElement = document .querySelector('#todo-input');
  let todoItem = inputElement.value;
  let dateElement = document.querySelector('#todo-date');
  let todoDate = dateElement.value;
  
  todoList.push({item: todoItem, dueDate: todoDate});   // pushing Object


  localStorage.setItem('savedTodo', JSON.stringify(todoList));



  inputElement.value = '';    // After pushing we need to remove the values.
  dateElement.value = '';    // After pushing we need to remove the values.
  displayItems(); // After adding elements we need to show them
}

// This function will display items i.e. Todo Tasks
function displayItems(){
  let containerElement = document.querySelector('.todo-container');

  // Inside container element we have to put all HTML along with delete button.
  let newHtml = '';
  /*
  displayElement.innerText = '';
  Before appending new content, this line ensures that any existing content in displayElement is cleared. This step ensures that when the loop begins appending new items, it starts with a clean slate.
  */
  for(let i = 0; i < todoList.length; i++){

    // let item = todoList[i].item;
    // let dueDate = todoList[i].dueDate;

    // Using Object De-structuring
    let {item, dueDate} = todoList[i];

    newHtml += `
        <span>${item}</span>
        <span>${dueDate}</span>
        <button class='btn-delete' onclick = "todoList.splice(${i}, 1); displayItems();">Delete</button>
    `;  
  }
  containerElement.innerHTML = newHtml;

}
