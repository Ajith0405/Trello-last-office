import React, {useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import GroupIcon from "@mui/icons-material/Group";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import { deepPurple } from "@mui/material/colors";
import "./subNav.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import BoltIcon from "@mui/icons-material/Bolt";
import FilterListIcon from "@mui/icons-material/FilterList";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, Stack, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Id } from "../Types/types";

interface Props {
  boardName:string |undefined;
  boardId:Id |undefined;
  updateBoardTitle:(id:Id|undefined, title:string )=>void;
  deleteBoard:(id:Id | undefined)=>void;
}


const SubNavbar = ({ boardName, boardId, deleteBoard, updateBoardTitle}:Props) => {

  const [boardTitle, setBoardTitle] = useState<string>(""); 
  const [editMode, setEditMode] = useState<boolean>(false);


  const [anchorElBoardMenu, setAnchorElBoardMenu] = React.useState<null | HTMLElement>(null);
  const openBoardMenu = Boolean(anchorElBoardMenu);
  const navigate = useNavigate();

  const handleClickBoardMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElBoardMenu(event.currentTarget);
  };
  const handleCloseBoardMenu = () => {
    setAnchorElBoardMenu(null);
  };


  const handleDeletBoard=()=>{
    const id:Id |undefined = boardId;
      deleteBoard(id);
      handleCloseBoardMenu();
      navigate('/');

  };

  const handleBoardNameUpdate= async()=>{
      setEditMode(false);
      const id = boardId;
      const title = boardTitle;
      updateBoardTitle(id,title);
      
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Link to={'/'}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "lightblue",
                padding: "5px 5px",
                borderRadius: "50%",
                marginRight: "10px",
                minWidth: 0,
              }}
            >
              <ArrowBackIcon sx={{ color:'black' }} />
            </Button>
            </Link>
            {/* Board Name */}
            <div onClick={()=>setEditMode(true)}>
            {!editMode ? (
            <Typography variant="h6" component="div" fontWeight="700">
              {boardName}
            </Typography>
            ):null}
            { editMode ? (
              <div>
                <input type="text" value={boardTitle} className="w-100 bg-info px-1 py-1 board_title_edit" onBlur={handleBoardNameUpdate}  onChange={(e)=>setBoardTitle(e.target.value)} autoFocus  />
              </div>
            ):null}
            </div>
            {/* Left side icons */}
            <Box sx={{ marginLeft: 2 }} flexGrow={1}>
              <Stack
                direction="row"
                style={{ display: "flex", alignItems: "center" }}
                spacing={2}
              >
                <StarBorderIcon
                  sx={{ height: 25, width: 25 }}
                  className="start_bord_icon"
                />
                <Tooltip title="Change visibility">
                  <GroupIcon
                    sx={{ height: 25, width: 25 }}
                    className="group_icon"
                  />
                </Tooltip>
                <Tooltip title="Board">
                  <Button
                    variant="contained"
                    className="board_icon_name"
                    style={{
                      textTransform: "capitalize",
                      background: "white",
                      color: "black",
                    }}
                    startIcon={<LeaderboardIcon className="board_icon" />}
                  >
                    Board
                  </Button>
                </Tooltip>
                <Tooltip title="Board Options">
                  <Button
                    className="downArrow_icon"
                    variant="contained"
                    id="basic-button"
                    aria-controls={openBoardMenu ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openBoardMenu ? 'true' : undefined}
                    onClick={handleClickBoardMenu}
                  >
                  <KeyboardArrowDownIcon
                    sx={{ height: 30, width: 30 }}
                    
                  />
                  </Button>
                </Tooltip>
                
              </Stack>
            </Box>
            <Box>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Tooltip title="Power-Ups">
                  <RocketLaunchIcon
                    style={{ width: 25, height: 25 }}
                    className="rocket_icon"
                  />
                </Tooltip>
                <Tooltip title="Automation">
                  <BoltIcon
                    style={{ width: 25, height: 25 }}
                    className="thunder_icon"
                  />
                </Tooltip>
                <Tooltip title="Filter Card">
                  <div className="d-flex filter_btn">
                    <FilterListIcon style={{ marginRight: 5 }} />
                    Filters
                  </div>
                </Tooltip>
              </Stack>
            </Box>
            <div className="partation"></div>
            <Box>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Avatar
                  sx={{ bgcolor: deepPurple[500], width: 32, height: 32 }}
                  className="user_avatar_logo"
                >
                  <p
                    className=""
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "12px",
                    }}
                  >
                    AS
                  </p>
                </Avatar>
                <Tooltip title="Share board">
                  <Button
                    variant="contained"
                    style={{
                      textTransform: "capitalize",
                      background: "white",
                      color: "black",
                    }}
                    className="share_icon"
                    startIcon={<PersonAddAltIcon />}
                  >
                    Share
                  </Button>
                </Tooltip>
                <div className="more_button_div">
                  <MoreHorizIcon
                    sx={{ marginLeft: 1, width: 30, height: 30 }}
                    className="more_button"
                  />
                </div>
              </Stack>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Board Menu */}
      <Menu
        id="basic-menu"
        anchorEl={anchorElBoardMenu}
        open={openBoardMenu}
        onClose={handleCloseBoardMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleDeletBoard}>Delete</MenuItem>
      </Menu>
    </div>
  );
};

export default SubNavbar;
