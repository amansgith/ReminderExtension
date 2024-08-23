//adding event listener on the task adding button

function displayTasks() {
    chrome.storage.local.get({tasks:[]},(data)=>{
        const tasks=data.tasks;
        const taskList=document.getElementById("taskList");
        taskList.innerHTML='';
        tasks.forEach((task, index)=>{
            const remindDate=new Date(task.timestamp);
            const timeString=remindDate.toLocaleTimeString([],{hour:'2-digit', minute:'2-digit'})
            const li=document.createElement("li");
            li.textContent=task;
            const deleteBtn=document.createElement("button");
            deleteBtn.textContent='Delete';
            deleteBtn.addEventListener('click',()=>{
                deleteTask(index);
            })
            taskList.appendChild(li);
        });
    });
}

function deleteTask(index){
    chrome.storage.local.get({tasks:[]}, (data)=>{
        let tasks=data.tasks;
        tasks.splice(index,1);
        chrome.storage.local.set({tasks:tasks}, ()=>{
            displayTasks();
        });
    });
}

document.getElementById("addTaskBtn").addEventListener('click',()=>{
    const task=document.getElementById("taskInput").value;
    const time=document.getElementById('timeInput').value;

    if(task && time){
        const [hours, minutes]= time.split(":").map(Number);
        const now=new Date();
        const remind= new Date(now.getFullYear(), now.getMonth(), now.getDate() +1, hours, minutes,0,0 );
        chrome.storage.local.get({tasks:[]}, (data)=>{
            let tasks = data.tasks;
            const taskobj={
                text: task,
                timestamp:remind.getTime()
            }
            tasks.push(taskobj);
            chrome.storage.local.set({tasks:tasks}, ()=>{
                document.getElementById("taskInput").value='';
                document.getElementById("timeInput").value='';
                displayTasks();
            });
        });
    }
});

displayTasks();
