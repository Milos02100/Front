import {Task} from "./Task.js"

export class Board{
    
    constructor(id,title){

        this.BoardID=id;
        this.Title=title;
        this.ListTask=[];

    }

    Crtaj(host){
        
        var test=document.querySelector(".insertForm")
        
        if(test==null){

            var container=document.createElement("div");
            container.className="container";
            var left=document.createElement("div");
            left.className="left";
            var right=document.createElement("div");
            right.className="right";
            this.PrikaziFormu(left);
            container.appendChild(left);
            container.appendChild(right);
            host.appendChild(container);
            this.PrikaziListuBoardova(right);

            
        }
        else{
            this.PrikaziListuBoardova(right);
        }

    
    }

    PrikaziFormu(parent){

        var insertForm=document.createElement("div");
        insertForm.className="insertForm";
        
        var title=document.createElement("label");
        title.className="titleTaskInsert";
        title.innerHTML="Create new task";
        insertForm.appendChild(title);
        //1
        var titleTask=document.createElement("label");
        titleTask.className="titleTask";
        titleTask.innerHTML="Title:";
        insertForm.appendChild(titleTask);

        var inputTitle=document.createElement("input");
        inputTitle.className="inputTitle";
        insertForm.appendChild(inputTitle);
        //2
        var noteTask=document.createElement("label");
        noteTask.className="noteTask";
        noteTask.innerHTML="Note:";
        insertForm.appendChild(noteTask);

        var inputNote=document.createElement("input");
        inputNote.className="inputNote";
        insertForm.appendChild(inputNote);
        //3
        var dateTask=document.createElement("label");
        dateTask.className="dateTask";
        dateTask.innerHTML="Date:";
        insertForm.appendChild(dateTask);

        var inputDate=document.createElement("input");
        inputDate.setAttribute("type", "date");
        inputDate.className="inputDate";
        insertForm.appendChild(inputDate);
        //4
        var importantTask=document.createElement("label");
        importantTask.className="importantTask";
        importantTask.innerHTML="Important:";
        insertForm.appendChild(importantTask);

        var inputImprotant = document.createElement("input");
        inputImprotant.className="inputImportant";
        inputImprotant.setAttribute("type", "checkbox");
        insertForm.appendChild(inputImprotant);
        //5

        var boardTask=document.createElement("label");
        boardTask.className="boardTask";
        boardTask.innerHTML="Select board:";
        insertForm.appendChild(boardTask);

        var inputBoardDDL=document.createElement("select");
        inputBoardDDL.className="boardDDL"
        insertForm.appendChild(inputBoardDDL);

        this.FillBoardDDL(inputBoardDDL);
        //6

        var assignTask=document.createElement("label");
        assignTask.className="assignTask";
        assignTask.innerHTML="Assign to:";
        insertForm.appendChild(assignTask);

        var inputAssignDDL=document.createElement("select");
        inputAssignDDL.className="assignDDL"
        insertForm.appendChild(inputAssignDDL);

        this.FillAssignDDL(inputAssignDDL);
        //7

        var insertBtn = document.createElement("input");
        insertBtn.className="insertBtn";
        insertBtn.setAttribute("type", "button");
        insertBtn.setAttribute("value", "Save");
        insertBtn.onclick=(ev)=>{this.InsertNewTask()};
        insertForm.appendChild(insertBtn);
        //delete

        var deleteLab=document.createElement("label");
        deleteLab.className="deleteLab";
        deleteLab.innerHTML="Delete:";
        insertForm.appendChild(deleteLab);

        var inputDeleteTaskDDL=document.createElement("select");
        inputDeleteTaskDDL.className="inputDeleteTaskDDL"
        insertForm.appendChild(inputDeleteTaskDDL);

        this.FillDeleteTaskDDL(inputDeleteTaskDDL);

        var deleteBtn = document.createElement("input");
        deleteBtn.className="deleteBtn";
        deleteBtn.setAttribute("type", "button");
        deleteBtn.setAttribute("value", "Delete");
        deleteBtn.onclick=(ev)=>{this.DeleteTask()};
        insertForm.appendChild(deleteBtn);

        parent.appendChild(insertForm);
    }

    FillDeleteTaskDDL(parent){
        fetch("https://localhost:5001/Board/ReturnTask").then(p=>{
            p.json().then(data=>{
            data.forEach(tas=>{
            
                var z = document.createElement("option");
                z.setAttribute("value", tas.taskID);
                var t = document.createTextNode(tas.title);
                z.appendChild(t);
    
                parent.appendChild(z);
            });
        });
        });
    }

    InsertNewTask(){

        var titleError=document.querySelector(".inputTitle").value;
        var noteError=document.querySelector(".inputNote").value;
        var dateError=document.querySelector(".inputDate").value;
        var boardError=document.querySelector(".boardDDL").value;
        var assignError=document.querySelector(".assignDDL").value;
        var important=document.querySelector(".inputImportant").checked;

        
        if(this.CheckInput(titleError,noteError,dateError,boardError,assignError)!=0){
            return;
        }
        
        var data={
            "title": titleError,
            "note": noteError,
            "date": dateError,
            "important": important,
            "status": 1,
        }

        fetch('https://localhost:5001/Board/InsertTask/'+boardError+'/'+assignError+'', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
        
        })
        
        setTimeout(
            function() {
                location.reload();
            }, 1000);
        

        //call api insert , refresh boards
        
    }

    CheckInput(titleError,noteError,dateError,boardError,assignError){

        var numberOfErrors=0;
        
        if(titleError==""){
            
            numberOfErrors++;
            alert("Title cannot be empty!!!");
            return;
        }
        if(noteError==""){

            numberOfErrors++;
            alert("Note cannot be empty!!!");
            return;
        }
        if(dateError==""){

            numberOfErrors++;
            alert("Date cannot be empty!!!");
            return;
        }
        if(boardError==0){

            numberOfErrors++;
            alert("Select board!!!");
            return;
        }
        if(assignError==0){

            numberOfErrors++;
            alert("Select user!!!");
            return;
        }

        return numberOfErrors;
    }

    FillBoardDDL(parent){

        fetch("https://localhost:5001/Board/ReturnBoardsDDL").then(p=>{
        p.json().then(data=>{
        data.forEach(board=>{
            
            var z = document.createElement("option");
            z.setAttribute("value", board.boardID);
            var t = document.createTextNode(board.title);
            z.appendChild(t);

            parent.appendChild(z);
           
        });
        });
        });
        

    }


    FillAssignDDL(parent){

        fetch("https://localhost:5001/Board/ReturnDevelopers").then(p=>{
        p.json().then(data=>{
        data.forEach(developer=>{
            
            var z = document.createElement("option");
            z.setAttribute("value", developer.developerID);
            var t = document.createTextNode(developer.name);
            z.appendChild(t);
            parent.appendChild(z);
           
        });
        });
        });
        
     
        
    }

    PrikaziBoard(element){

        this.ListTask.forEach(task => {
            
            var title=document.createElement("label");
            var note=document.createElement("label");
            var date=document.createElement("label");

            title.innerHTML=task.Title;
            note.innerHTML=task.Note;
            date.innerHTML=task.Date;

            container.appendChild(title);
            container.appendChild(note);
            container.appendChild(date);

            element.appendChild(container);

        });
    }
    
    PrikaziListuBoardova(parent){
        
        var bf=document.querySelector(".boardForm");
        if(bf==null){

            var boardForm=document.createElement("div");
            boardForm.className="boardForm";
            
            this.LoadBoards(boardForm);
    
            parent.appendChild(boardForm);
        }
        else{

            this.LoadBoards(bf);

        }

       
    }


    LoadBoards(parent){
        
        var boardContainer=document.createElement("div");
        boardContainer.className="boardContainer";

        var boardTitle=document.createElement("div");
        boardTitle.className="boardTitle";
        boardTitle.innerHTML=this.Title;

        boardContainer.appendChild(boardTitle)

        var boardInfo=document.createElement("div");
        boardInfo.className="boardInfo";

        
        this.ListTask.forEach(t => {
            
            var task=document.createElement("div");
            task.className="task";

            var titleTask=document.createElement("label");
            titleTask.className="mrg";
            titleTask.innerHTML=t.Title;

            task.appendChild(titleTask)

            var noteTask=document.createElement("label");
            noteTask.className="mrg";
            noteTask.innerHTML=t.Note;

            task.appendChild(noteTask)

            var dateTask=document.createElement("label");
            dateTask.className="mrg";
            dateTask.innerHTML=t.Date;

            task.appendChild(dateTask);

            fetch("https://localhost:5001/Board/ReturnTask").then(p=>{
            p.json().then(data=>{
            data.forEach(tas=>{
            if(tas.taskID==t.TaskID){
                if(tas.developer!=null){
                    
                    var assignTask=document.createElement("label");
                    assignTask.classList.add("assignTaskBoard","mrg");
                    assignTask.innerHTML=tas.developer.name;

                    task.appendChild(assignTask);
                }
            }
            
            
           
           
            });
            });
            });

            

            var inputStatusDDL=document.createElement("select");
            inputStatusDDL.classList.add("statusSelect","mrg");
            inputStatusDDL.setAttribute("name",t.TaskID);
            
            inputStatusDDL.onchange=(ev)=>{this.TaskColor(t.TaskID)};
            task.appendChild(inputStatusDDL);

           
            
            this.FillStatus(inputStatusDDL,t.Status);

            boardInfo.appendChild(task)

        });

        boardContainer.appendChild(boardInfo)


        parent.appendChild(boardContainer);
        
        this.TaskColor(0);
    }

    DeleteTask(){
        var taskID=document.querySelector(".inputDeleteTaskDDL").value;

        fetch('https://localhost:5001/Board/DeleteTask/'+taskID, {
        method: 'DELETE'
        
        });
        
        setTimeout(
            function() {
                location.reload();
            }, 1000);
       
        
    }

    FillStatus(parent,status){
        
        var list=[{statusID:1,statusText:"Not started"},{statusID:2,statusText:"Working on it"},{statusID:3,statusText:"Done"},{statusID:4,statusText:"Stuck"}];
       
        list.forEach(s => {
            
            var z = document.createElement("option");
            z.value=s.statusID;
            if(status==s.statusID){
                z.selected="selected";
            }
            var t = document.createTextNode(s.statusText);
            z.appendChild(t);

            parent.appendChild(z);

        });
        
    }

    
    TaskColor(id){
        
        if(id!=0){

            this.EditTask(id);

        }
        
        var list=document.querySelectorAll(".task")
      
        list.forEach((task,index) => {
            
            var t=document.querySelectorAll(".statusSelect")[index].value;

            if(t==1){
                task.classList.remove("taskWorkingOnIt");
                task.classList.remove("taskDone");
                task.classList.remove("taskStuck");
                task.classList.add("taskDidntStart");
            }
            else if(t==2){
                task.classList.remove("taskDidntStart");
                task.classList.remove("taskDone");
                task.classList.remove("taskStuck");
                task.classList.add("taskWorkingOnIt");
            }
            else if(t==3){
                task.classList.remove("taskDidntStart");
                task.classList.remove("taskWorkingOnIt");
                task.classList.remove("taskStuck");
                task.classList.add("taskDone");
            }
            else if(t==4){
                task.classList.remove("taskDidntStart");
                task.classList.remove("taskWorkingOnIt");
                task.classList.remove("taskDone");
                task.classList.add("taskStuck");
            }
           
            
        });

    }

    EditTask(id){

        var opt=document.getElementsByName(id)[0].value;
        var edit;
        this.ListTask.forEach(task=>{
            if(task.TaskID==id){
                edit={
                    "taskID": task.TaskID,
                    "title": task.Title,
                    "note": task.Note,
                    "date": task.Date,
                    "important": task.important,
                    "status": opt
                }
            }
        });
        
        fetch('https://localhost:5001/Board/EditTask', {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(edit)
        
        })

    }
    
}

