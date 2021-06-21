import {Board} from "./Board.js";
import {Task} from "./Task.js";


//var t1=new Task(1,"Task1","start1","6.5.2021");
//var t2=new Task(2,"Task2","start2","6.6.2021");
//var t3=new Task(3,"Task3","start3","6.7.2021");
//var t4=new Task(4,"Task4","start4","6.8.2021");
//var t5=new Task(5,"Task5","start5","6.9.2021");

//var board=new Board(1,"Main");

//board.ListTask.push(t1);
//board.ListTask.push(t2);
//board.ListTask.push(t3);
//board.ListTask.push(t4);
//board.ListTask.push(t5);



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


