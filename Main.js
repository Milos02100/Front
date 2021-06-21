import {Board} from "./Board.js";
import {Task} from "./Task.js";






fetch("https://localhost:5001/Board/ReturnBoards").then(p=>{
    p.json().then(data=>{
        data.forEach(board=>{
            var b=new Board(board.boardID,board.title);
            board.tasks.forEach(task=>{
                var t=new Task(task.taskID,task.title,task.note,task.date,task.important,task.status);
                b.ListTask.push(t);
            });
            b.Crtaj(document.body);
           
        });
    });
});


