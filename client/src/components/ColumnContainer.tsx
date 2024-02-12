import React, { useMemo, useState } from "react";
import "./columnContainer.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import Card from "./Card";
import AddIcon from "@mui/icons-material/Add";
import { Column, Id, Task } from "../Types/types";

// DND
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  column: Column;
  updateColumn: (id: Id, title: string) => void;
  deleteColumn: (id: Id) => void;
  tasks: Task[];
  createTask: (columnId: Id, columnTitle: string) => void;
  updateTask: (id: Id, content: string) => void;
  deleteTask: (id: Id) => void;
  updateActivity: (id: Id, activity: string) => void;
  updateDescription: (id: Id, description: string) => void;
  updateToDate: (id: Id, toDate: string) => void;
  updateFromDate: (id: Id, fromDate: string) => void;
}

const ColumnContainer = ({
  column,
  updateColumn,
  deleteColumn,
  tasks,
  createTask,
  deleteTask,
  updateTask,
  updateActivity,
  updateDescription,
  updateFromDate,
  updateToDate,
}: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(column.list_title);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  // Column More Button
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Title update function
  const handleTitleSave = (id: Id) => {
    updateColumn(id, title);
    setEditMode(false);
  };

  // Delete Column
  function handleMoreColumnDelete(id: Id) {
    deleteColumn(id);
  }

  // DND

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="main_column_overley opacity-50"
      ></div>
    );
  }
  return (
    <div className="main_column" ref={setNodeRef} style={style}>
      {/* column Title */}
      <div
        className="column_header d-flex justify-content-between align-items-center mt-2 mb-2 px-2 "
        {...attributes}
        {...listeners}
      >
        <div
          onClick={() => {
            setEditMode(true);
          }}
        >
          {!editMode && column.list_title}
          {editMode ? (
            <div>
              <input
                className="column_title_input"
                name="list_title"
                id="list_title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key !== "Enter") return;
                  setEditMode(false);
                }}
                onBlur={() => handleTitleSave(column.id)}
              />
            </div>
          ) : null}
        </div>
        <button
          type="button"
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreHorizIcon
            sx={{ width: 30, height: 30 }}
            className="column_more_button"
          />
        </button>
        {/* column more menu model */}
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              handleMoreColumnDelete(column.id);
            }}
          >
            Delete
          </MenuItem>
        </Menu>
      </div>
      {/* column content */}
      <div className="column_content ">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <Card
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
              updateActivity={updateActivity}
              updateDescription={updateDescription}
              updateFromDate={updateFromDate}
              updateToDate={updateToDate}
            />
          ))}
        </SortableContext>
      </div>

      {/* column footer */}
      <div className="add_card_button">
        <button
          className="add_button d-flex align-items-center"
          type="button"
          onClick={() => {
            createTask(column.id, column.list_title);
          }}
        >
          <AddIcon sx={{ width: 20, height: 20 }} />{" "}
          <p className="ps-2">Add to card</p>
        </button>
      </div>
    </div>
  );
};

export default ColumnContainer;
