// importing Ui Component
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/EditOutlined';
import DoneIcon from '@mui/icons-material/Done';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from "@mui/material/TextField";
// importing hooks
import { useContext, useState } from "react";
import { TodoContext } from "./Context/TodoContext";
// importing styles
import "./Styles/buttons.css";

export default function ToDo({element}){
  // States
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [taskName, setTaskName] = useState(element.title);
  const [taskDesc, setTaskDesc] = useState(element.desc);
  const {todoArray , setTodoArray} = useContext(TodoContext);
  
  // Functions event
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleNormalClose = () => {
    setOpen(false);
  };
  const handleEditClose = () => {
    setOpenEdit(false);
  };
  function handleClose() {
    setOpen(false);
    const notDeletedTodos = todoArray.filter((todo) => todo.id !== element.id);
    setTodoArray(notDeletedTodos);
    localStorage.setItem("todos" , JSON.stringify(notDeletedTodos));
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    let checkedTodos = todoArray.map((todo)=>
      todo.id === element.id ? {...todo , title: taskName.slice(0,15) , desc: taskDesc.slice(0,20) } : todo
  );
  setTodoArray(checkedTodos);
  localStorage.setItem("todos" , JSON.stringify(checkedTodos));
  handleEditClose();
};

function handleCheckedClick(){
  const checkedTodos = todoArray.map((todo)=>{
    if(todo.id === element.id){
      todo.isCompleted = !todo.isCompleted;
    }
    return todo;
  });
  setTodoArray(checkedTodos);
  localStorage.setItem("todos" , JSON.stringify(checkedTodos));
  }

  // My UI Design
    return(
        <>
          <Card sx={{ minWidth: 240 , backgroundColor:"#0e0e83" , marginTop: "20px"}} className="flow">
      <CardContent style={{display:"flex" , alignItems:"center" , justifyContent:"space-between", gap:"20px"}}>
        <Typography variant="h5" sx={{ color: 'white' , fontFamily:"Lato , sans-serif" , 
        textDecoration: element.isCompleted ? "line-through" : "none" }} className="title">
        {element.title}
        <Typography  className="desc" style={{fontFamily:"Lato , sans-serif"  , marginTop:"5px" , textDecoration:"none"}} > {element.desc}</Typography>
        </Typography>
        <Stack direction="row" spacing={1}>
          {/* Buttons */}
      <IconButton aria-label="done" className="btns" style={{backgroundColor: element.isCompleted ? "green" :"white" 
      , color: element.isCompleted ? "white" :"green" , border:"2px solid green"}} 
      onClick={handleCheckedClick}
      >
        <DoneIcon fontSize="small" />
      </IconButton>
      <IconButton aria-label="edit" className="btns" style={{backgroundColor:"white" , color:"blue" , border:"2px solid blue"}}
      onClick={()=>{setOpenEdit(true)}}
      >
        <EditIcon fontSize="small"/>
      </IconButton>
      <IconButton aria-label="delete" className="btns" style={{backgroundColor:"white" , color:"red" , border:"2px solid red"}}
       onClick={handleClickOpen}>
        <DeleteIcon fontSize="small" />
      </IconButton>
      </Stack>
        </CardContent>
    </Card>
      
      {/* Deleted Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Task"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete this task ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNormalClose} >Cancel</Button>
          <Button onClick={handleClose} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* Deleted Dialog */}

      {/* Editing Dialog */}
           <Dialog open={openEdit} onClose={handleEditClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <DialogContentText>
            Rewrite the new Data Please :)
            </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="taskName"
              label="Task Name"
              type="text"
              fullWidth
              variant="standard"
              value={taskName}
              onChange={(event)=>{setTaskName(event.target.value)}}
            />
            <TextField
              required
              margin="dense"
              id="desc"
              name="desc"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              value={taskDesc}
              onChange={(event)=>{setTaskDesc(event.target.value)}}
            />
            <DialogActions>
              <Button onClick={handleEditClose} color="error">Cancel</Button>
              <Button type="submit">Save</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      {/* Editing Dialog */}
        </>
    );
}