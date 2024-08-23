chrome.runtime.onStartup.addListener(()=>{
    chrome.storage.local.get({tasks:[]}, (data)=>{
        const tasks=data.tasks;
        if(tasks.length>0){
            const taskList=tasks.join(', ');

            chrome.notification.create({
                type:'basic',
                title:'Roj ka Kaam',
                message: `Aaj ka kaam hai: ${taskList}`,
                buttons:[
                    {
                        title:'Open Extension'
                    }
                ],
                priority:0
            });
        }
    });
});

chrome.notifications.onButtonClicked.addListener(()=>{
    chrome.action.openPopup();
});