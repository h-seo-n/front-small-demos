const addButton = document.querySelector("#submit");
const todoInput = document.querySelector("#todo-input")

const todoSpan = document.querySelector("#todo-span");
let todoCount = Number.parseInt(todoSpan.textContent);

const completedSpan = document.querySelector("#complete-span");
let completedCount = Number.parseInt(completedSpan.textContent);

const todoList = document.querySelector("#todo-list");

const body = document.querySelector("body"); 

//show confetti
const showConfetti = () => {
	const confetti = document.createElement('div');
	confetti.textContent = '☘️';
	confetti.classList.add('confetti');
	confetti.style.left = Math.random() * innerWidth + 'px';
	body.appendChild(confetti);
	
	setTimeout(() => {
		confetti.remove();
	}, 5000);
}

 
// check todo
const onCheck = (event) => {
    // check's identifier
    let id = event.currentTarget.dataset.identifier;
    const span = document.querySelector(`#span${id}`);
    span.classList.toggle("checked");

    if (span.classList.contains("checked")){
        completedSpan.textContent = ++completedCount;
        
        let startConfetti = setInterval(() => {
            showConfetti();
        }, 50);

        setTimeout(() => {
            clearInterval(startConfetti);
        }, 5000);
    } else {
        completedSpan.textContent = --completedCount;
    }
}

// delete todo
const onDelete = (event) => {
    // remove <li>
    if(!confirm("정말로 삭제하시겠습니까?")) {
        return;
    } else {
        event.currentTarget.parentElement.remove();
        // decrement count
        todoSpan.textContent = --todoCount;

        //remove br as well
        let id = event.currentTarget.dataset.identifier;
        document.querySelector(`#br${id}`).remove();
    }
}  

// create todo list
const createTodo = (content) => {
    // list
    const li = document.createElement("li");
    
    // checkbox input
    const check = document.createElement("input")
    check.type = "checkbox";
    // check's identifier
    check.dataset.identifier = todoCount;

    // when you click check
    check.addEventListener("click", onCheck);
    li.appendChild(check);

    // span - todo content
    const span = document.createElement("span");
    span.textContent=content;
    span.id = `span${todoCount}`;
    li.appendChild(span);

    // delete button
    const button = document.createElement("button");
    button.textContent = "삭제하기";
    button.dataset.identifier = todoCount;

    // when you click delete
    button.addEventListener("click", onDelete);
    li.appendChild(button);

    // line break
    const br = document.createElement("br");
    br.id = `br${todoCount}`;
    todoList.appendChild(br);

    
    // final append
    todoList.appendChild(li);
    ++todoCount;
    todoSpan.textContent = todoCount;
    // completedSpan.textContent = ++completedCount;
}

// when you click "add"
addButton.addEventListener("click", () => {
    let todoContent = todoInput.value;
    createTodo(todoContent);
    todoInput.value = "";
});

// bind "add" event to enter key as well
todoInput.addEventListener("keypress", event => {
    if (event.key == "Enter") {
		    event.preventDefault();
        createTodo(todoInput.value);
        todoInput.value = "";
    }
})

