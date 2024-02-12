import React, { useState } from "react";
import "./card.css";
import { Id, Task } from "../Types/types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SubjectIcon from "@mui/icons-material/Subject";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import ChecklistIcon from "@mui/icons-material/Checklist";

import { differenceInDays,  } from 'date-fns';

// DND
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

// dialouge box theme
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

// Props Interface
interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
  updateActivity: (id: Id, activity: string) => void;
  updateDescription: (id: Id, description: string) => void;
  updateToDate:(id:Id,toDate:string)=>void;
  updateFromDate:(id:Id,fromDate:string)=>void;
}

// Main
const Card = ({
  task,
  deleteTask,
  updateTask,
  updateActivity,
  updateDescription,
  updateToDate,
  updateFromDate
}: Props) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [descriptionEditMode, setDescriptionEditMode] =useState<boolean>(false);
  const [activityEditMode, setActivityEditMode] = useState<boolean>(false);
  const [activity, setActivity] = useState<string>("");
  const [description, setDescription] = useState<string>(task.card_description);
  const [cardContent, setCardContent] = useState<string>(task.card_content);
  const [fromDate, setFromDate] = useState<string>(task.card_from_date);
  const [toDate, settoDate] = useState<string>(task.card_to_date);

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
    
  };

  const dueDate:number|undefined = differenceInDays(task.card_to_date, task.card_from_date);

  // card description initial update
 
  
    

  // Card content update
    const handleCardContentSave=(id:Id)=>{
        updateTask(id,cardContent);
        setEditMode(false);
        handleMoreClose();
        
       
    }

  // Activity Functions
  const handleSaveActivityButton = (id: Id) => {
    updateActivity(id, activity);
    setActivity("");
    setActivityEditMode(false);
  };

  // Description Function
  const handleDescriptionSave = (id: Id) => {
    updateDescription(id, description);
    setDescriptionEditMode(false);
  };
  // upadte from date function
    const handleUpadteFromDate =()=>{
      updateFromDate(task.id,fromDate);
    }
  // update to date function
    const hanleUpdateToDate =()=>{
      updateToDate(task.id, toDate);
    }

  // Card More Button Declarations
  const [anchorElMore, setAnchorElMore] = React.useState<null | HTMLElement>(null);
  const openMore = Boolean(anchorElMore);
  const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMore(event.currentTarget); 
  };
  const handleMoreClose = () => {
    setAnchorElMore(null);
  };

  // Dialouge Box Declarations
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // DND
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  if (isDragging) {
    return <div ref={setNodeRef} style={style} className="card_main_drag" />;
  }

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="card_main_drag"
      >
        <textarea
          className="task_edit"
          value={cardContent}
          name="card_content"
          id="card_content"
          autoFocus
          placeholder="Task content here.."
          onBlur={()=>handleCardContentSave(task.id)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) toggleEditMode();
          }}
          onChange={(e) => setCardContent( e.target.value)}
        ></textarea>
      </div>
    );
  }
  return (
    <div>
      <div
        className="card_main p-2 my-1 rounded-3"
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onMouseEnter={() => {
          setMouseIsOver(true);
        }}
        onMouseLeave={() => {
          setMouseIsOver(false);
        }}
      >
        <p onClick={handleClickOpen} className="w-100" onMouseEnter={() => {
          setMouseIsOver(true);
        }}>
          {task.card_content.length <= 20
            ? task.card_content
            : `${task.card_content.substring(0, 20)}...`}
        </p>
        
        {mouseIsOver && (
          <Button
            id="demo-positioned-button"
            aria-controls={openMore ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openMore ? "true" : undefined}
            onClick={handleMoreClick}
            sx={{ padding: 0, margin: 0 }}
          >
            <MoreHorizIcon sx={{ padding: 0, margin: 0, borderRadius: 5 }} />
          </Button>
        )}
          {task.card_description?(<SubjectIcon sx={{width:10, height:10}}/>):null}
        {/* More Button  */}
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorElMore}
          open={openMore}
          onClose={handleMoreClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={toggleEditMode}>
            <EditIcon />
          </MenuItem>
          <MenuItem
            onClick={() => {
              deleteTask(task.id);
            }}
          >
            <DeleteIcon />
          </MenuItem>
        </Menu>

        {/* Dailouge box  */}
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            <CreditCardIcon /> {task.card_content} <br />
            <p
              style={{ fontSize: "14px" }}
            >{`origin list ${task.origin_list_title}`}</p>
            <p style={{ fontSize: "14px" }}>{`current list ${
              task.current_list_title
                ? task.current_list_title
                : task.origin_list_title
            }`}</p>
            <p
              style={{ fontSize: "14px" }}
            >{`create on ${task.card_created_at}`}</p>
            {
              dueDate?(<p style={{ fontSize: "14px" }}>
              Due Date : {dueDate} days
            </p>):null
            }
            
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers sx={{ minWidth: 600, height: 450 }}>
            <div className="row">
              <div className="col-8 rounded" style={{borderRight:'2px solid gray'}}>
                <div className="d-flex">
                  <Typography variant="h6" component="h6">
                    <SubjectIcon /> Description
                  </Typography>
                </div>
                <div className="ms-2 mt-2">
                  <textarea
                    name="description"
                    id="description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    onFocus={() => {
                      setDescriptionEditMode(true);
                    }}
                    placeholder="type here...."
                    className="form-control w-100 px-2 rounded bg-light"
                  />
                  {descriptionEditMode ? (
                    <div  className="d-flex align-items-center">
                      <button
                        onClick={() => handleDescriptionSave(task.id)}
                        className="description_save_button mt-2 me-3"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setDescriptionEditMode(false)}
                        className="description_cancel_button mt-2"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : null}
                </div>
                <div>
                  <div className="d-flex mt-2 ">
                    <Typography variant="h6" component="h6">
                      <ChecklistIcon /> Activity
                    </Typography>
                  </div>
                  <div className="d-flex mt-2 align-items-center">
                    <Avatar
                      sx={{
                        bgcolor: deepPurple[500],
                        width: 32,
                        height: 32,
                        marginRight: 1,
                      }}
                    >
                      <p
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "12px",
                        }}
                      >
                        AS
                      </p>
                    </Avatar>
                    <div className="w-100">
                      <input
                        value={activity}
                        onChange={(e) => setActivity(e.target.value)}
                        type="text"
                        className="form-control w-100"
                        placeholder="write a comment..."
                        onFocus={() => setActivityEditMode(true)}
                      />
                    </div>
                  </div>
                  <div className="ms-5">
                    {activityEditMode ? (
                      <div className="d-flex ">
                        <button
                          onClick={() => handleSaveActivityButton(task.id)}
                          className="btn btn-success mt-2 me-3"
                        >
                          save
                        </button>
                        <button
                          onClick={() => setActivityEditMode(false)}
                          className="btn btn-warning mt-2 "
                        >
                          cancel
                        </button>
                      </div>
                    ) : null}
                  </div>
                  <div className="activity_container">
                    {task.card_activity.map((act, index) => (
                      <div
                        key={index}
                        className="d-flex mt-2 align-items-center"
                      >
                        <Avatar
                          sx={{
                            bgcolor: deepPurple[500],
                            width: 32,
                            height: 32,
                            marginRight: 1,
                          }}
                        >
                          {" "}
                          <p
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontSize: "12px",
                            }}
                          >
                            AS
                          </p>
                        </Avatar>
                        <p style={{fontWeight:400, fontSize:'14px'}}>{act}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-4 rounded">
                <div>
                  <h2 style={{fontWeight:700}}>Dates</h2> <hr />
                  <label htmlFor="fromDate" className="form-lable mt-2">From Date</label>
                  <input type="date" className="form-control" id="fromDate" value={fromDate} onChange={(e)=>setFromDate(e.target.value)} onBlur={handleUpadteFromDate}  name="fromDate"/>
                  <label htmlFor="toDate" className="form-lable mt-2">To Date</label>
                  <input type="date" className="form-control" id="toDate"  value={toDate} onChange={(e)=>settoDate(e.target.value)} onBlur={hanleUpdateToDate} name="toDate"/>
                </div>
                
              </div>
            </div>
          </DialogContent>
        </BootstrapDialog>
        
      </div>
    </div>
  );
};

export default Card;
