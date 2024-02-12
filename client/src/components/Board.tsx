import React, { useEffect, useMemo, useState } from "react";
import "./board.css";
import AddIcon from "@mui/icons-material/Add";
import { toast } from 'react-toastify';

import ColumnContainer from "./ColumnContainer";
import { Board, Column, Id, Task } from "../Types/types";

// DND
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import Card from "./Card";
import axios from "axios";
import SubNavbar from "./SubNavbar";
import { useParams } from "react-router-dom";
import { UpdateListTitleAPI, cardContentUpadateAPI, cardDeleteAPI, cardDescriptionUpdateAPI, cardFromDateUpdateAPI, cardToDateUpdateAPI, createCardAPI, createListAPI, deleteBoardAPI, deleteListAPI, updateActivityAPI, updateBoardTitleAPI } from "../services/API";
import { format } from "date-fns";

const BoardDetails = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [boardDetails, setBoardDetails] = useState<Board>();

  const currentTimeStamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

  const { id } = useParams();
  const boardId = id;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  // fetch Board details
  const getBoardDetails = async () => {
    await axios
      .get(`http://localhost:5050/getBoardDetails/${id}`)
      .then((res) => {
        console.log(res.data);
        setBoardDetails(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    
    getBoardDetails();
  }, [BoardDetails]);

  // fetch Lists
  const fetchList =async ()=>{
    await axios
      .post("http://localhost:5050/getList", { boardId })
      .then((res) => {
        // console.log(res.data)
        // const
        const collect_list_data: Column[] = [];
        res.data.forEach((data: any) => {
          collect_list_data.push({
            id: data.id,
            list_title: data.list_title,
            board_id: data.board.id,
          });
        });
        setColumns([...collect_list_data]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  useEffect(() => {
    fetchList();
  }, [boardId, columns]);

  // fetch Cards
  const fetchCards =async()=>{
    await axios
      .get(`http://localhost:5050/getCards/${boardId}`)
      .then((res) => {
        const cardsDataArray:Task[]=[];
        res.data.forEach((data:any)=>{
            cardsDataArray.push({
              id: data.id,
              list_id: data.list.id,
              board_id: data.board.id,
              origin_list_title: data.list.list_title,
              current_list_title: data.current_list_title,
              card_content:data.card_content,
              card_description: data.card_description,
              card_activity: data.card_activity,
              card_from_date:data.card_from_date,
              card_to_date: data.card_to_date,
              card_due_date:data.card_due_date,
              card_created_at:data.card_created_at,
              card_updated_at: data.card_updated_at
            })
        })
        setTasks([...cardsDataArray]);
      })
      .catch((err) => {
        console.log(err.message);
      });
    };
  useEffect(() => {
    
      fetchCards();

  }, [tasks]);


  
  useEffect(() => {
    // console.log(activeColumn)
    
    
  }, [activeColumn, tasks, columns]);

  // Board 
  const updateBoardTitle = async(id:Id|undefined, title:string)=>{
      await updateBoardTitleAPI(id,title);
      getBoardDetails();
  }

  const deleteBoard = async(id:Id | undefined)=>{
     await deleteBoardAPI(id);
    // getBoardDetails();
  }

  // List Functions
  const createNewColumn = async () => {
     await createListAPI(boardId)
  };

  const updateColumn = async (id: Id, title: string) => {
     await UpdateListTitleAPI(id, title);
     fetchList();
  };
  const deleteColumn = async (id: Id) => {
    await deleteListAPI(id);
  };

  // Card Functions
  const createTask = async (columnId: Id, columnTitle: string) => {
     await createCardAPI(columnId, columnTitle , boardDetails?.id)
  };
  const updateTask = async(id: Id, content: string)=>{
      await cardContentUpadateAPI(id,content);
  }

  const deleteTask = async (id: Id)=>{
      await cardDeleteAPI(id);  
  }
  // Activity Functions
 const updateActivity = async(id: Id, activity: string)=>{
      updateActivityAPI(id,activity);
  }

  //  Description function
  const updateDescription = async(id: Id, description: string)=>{
    await cardDescriptionUpdateAPI(id,description);
  }

  // updateFromDate function
  const updateFromDate = async (id: Id, fromDate: string)=>{
    await cardFromDateUpdateAPI(id,fromDate);
  }
  // updateToDate Function
  const updateToDate = async (id: Id, toDate: string)=>{
      await cardToDateUpdateAPI(id, toDate);
  }

  // DND Functions
  function onDragStart(event: DragStartEvent) {
    // column
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
    // task
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);

    const { active, over } = event;
    if (!over) return;
    console.log(active, "#active");
    console.log(over, "#over");
    const activeId = active.id;
    const overId = over.id;
    // console.log(activeId);
    // console.log(overId);

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    console.log("DRAG END");

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
      console.log(activeColumnIndex);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);
      console.log(overColumnIndex);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }
  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;
    console.log(active);
    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].list_id !== tasks[overIndex].list_id) {
          tasks[activeIndex].list_id = tasks[overIndex].list_id;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";
    const isOverColumnTitle = over.data.current?.column?.title;
    // console.log(isOverColumnTitle)

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const activeTask = tasks.find((t) => t.id === activeId);
        let activeTaskColumnTitle = activeTask?.origin_list_title;
        // console.log(activeTaskColumnTitle)
        if (activeTaskColumnTitle) {
          tasks[activeIndex].current_list_title = isOverColumnTitle;
        }

        tasks[activeIndex].list_id = overId;
        // console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }

  // ---------------------


  return (
    <>
      <SubNavbar
        boardName={boardDetails?.board_name}
        boardId={boardDetails?.id}
        updateBoardTitle={updateBoardTitle}
        deleteBoard={deleteBoard}
      />
      <div className="board_main">
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
        >
          <div className="column_holder_main">
            <div className="column_holder d-flex  g-4">
              <SortableContext items={columnsId}>
                {columns.map((col) => (
                  <ColumnContainer
                    key={col.id}
                    column={col}
                    updateColumn={updateColumn}
                    deleteColumn={deleteColumn}
                    tasks={tasks.filter((task) => task.list_id === col.id)}
                    createTask={createTask}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                    updateActivity={updateActivity}
                    updateDescription={updateDescription}
                    updateFromDate={updateFromDate}
                    updateToDate={updateToDate}
                  />
                ))}
              </SortableContext>
              <div className="add_column_button">
                <button
                  className="btn add_list_button d-flex align-items-center"
                  type="button"
                  onClick={() => {
                    createNewColumn();
                  }}
                >
                  <AddIcon /> Add list
                </button>
              </div>
            </div>
          </div>
          {createPortal(
            <DragOverlay>
              {activeColumn && (
                <div className="drag_overley">
                  <ColumnContainer
                    column={activeColumn}
                    deleteColumn={deleteColumn}
                    updateColumn={updateColumn}
                    tasks={tasks}
                    createTask={createTask}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                    updateActivity={updateActivity}
                    updateDescription={updateDescription}
                    updateFromDate={updateFromDate}
                    updateToDate={updateToDate}
                  />
                </div>
              )}
              {activeTask && (
                <div className="car_drag_overley">
                  <Card
                    task={activeTask}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                    updateActivity={updateActivity}
                    updateDescription={updateDescription}
                    updateFromDate={updateFromDate}
                    updateToDate={updateToDate}
                  />
                </div>
              )}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>
    </>
  );
};

export default BoardDetails;
