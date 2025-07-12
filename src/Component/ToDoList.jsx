// importing Ui Component
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
// importing Component
import ToDo from "./Todo";
// importing hooks
import { useContext, useEffect, useState } from "react";
import { TodoContext } from "./Context/TodoContext";
// importing Libraries
import { v4 as generatedId } from "uuid";
import "./Styles/buttons.css";
// importing Assets
import empty from "../Assets/empty2.gif";

export default function ToDoList() {
  // States
  const [alignment, setAlignment] = useState("all");
  const [taskName, setTaskName] = useState("");
  const { todoArray, setTodoArray } = useContext(TodoContext);
  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    setTodoArray(storedTodos);
  },[setTodoArray] );
  
  // filter todos
  const completedTodos = todoArray.filter((todo)=> todo.isCompleted);
  const unCompletedTodos = todoArray.filter((todo)=> !todo.isCompleted);
  
  let showenTodos = todoArray;
  if(alignment === "completed"){
    showenTodos = completedTodos;
  }
  else if(alignment === "notcompleted"){
    showenTodos = unCompletedTodos;
  }
  else{
    showenTodos = todoArray;
  }

  const toDosList = showenTodos.map((todo) => {
    return <ToDo key={todo.id} element={todo} />;
  });

  // Functions
  const handleChange = (event , newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }

  };
  
  function handleAdding() {
    if (taskName !== "") {
      const obj = {
        id: generatedId(),
        desc: "You can Write description here",
        title: taskName.slice(0,15),
        isCompleted: false,
      };
      const updatedTodos = [...todoArray, obj];
      setTodoArray(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      setTaskName("");
    }
  }
  // UI Design
  return (
    <Container maxWidth="xs" className="container">
      <Card sx={{ width: "100%" , minWidth: "265px"}} style={{maxHeight:"80vh",overflowY:"auto" , scrollBehavior:"smooth"}}>
        <CardContent>
          {/* Header */}
          <Typography
            variant="h4"
            style={{
              textAlign: "center",
              fontWeight: "bold",
              textShadow: "1px 1px 2px #7f0a0ac2",
              fontFamily: "Lato , sans-serif",
            }}>
            My ToDo List
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box display="flex" justifyContent="center">
            <ToggleButtonGroup
              color="error"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform">
              <ToggleButton
                className="toggle"
                value="all"
                style={{ fontFamily: "Lato , sans-serif" }}>
                All
              </ToggleButton>
              <ToggleButton
                value="completed"
                className="toggle"
                style={{ fontFamily: "Lato , sans-serif" }}>
                Completed
              </ToggleButton>
              <ToggleButton
                value="notcompleted"
                className="toggle"
                style={{ fontFamily: "Lato , sans-serif" }}>
                Not Completed
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          {/* ====header=== */}

          {/* body */}
          {toDosList.length === 0 ? (
            <img
              src={empty}
              alt="GIF"
              style={{ width: "300px", marginLeft: "20px" }}
            />
          ) : (
            toDosList
          )}
          {/* ===body=== */}

          {/* Footer */}
          <Grid
            container
            style={{
              marginTop: toDosList.length === 0 ? "0" : "30px",
              flexWrap: "nowrap",
            }}
            xs={12}>
            <Grid
              xs={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              height="fit-content">
              <Button
                variant="contained"
                style={{
                  height: "50px",
                  borderTopRightRadius: "0",
                  borderBottomRightRadius: "0",
                  boxShadow: "none",
                  width: "150px",
                }}
                color="error"
                disabled={taskName.length <1 ? true : false}
                onClick={handleAdding}>
                Add
              </Button>
            </Grid>
            <Grid
              xs={8}
              display="flex"
              justifyContent="space-around"
              alignItems="center">
              <TextField
                id="outlined-basic"
                label="Task Name"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    height: 50,
                  },
                }}
                value={taskName}
                onChange={(event) => {
                  setTaskName(event.target.value);
                }}
              />
            </Grid>
          </Grid>
          {/* ===Footer=== */}
        </CardContent>
      </Card>
    </Container>
  );
}
