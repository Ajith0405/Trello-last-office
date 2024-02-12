import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import AppsIcon from "@mui/icons-material/Apps";
import { deepPurple } from "@mui/material/colors";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import logo from "../assets/trello.png";
import "./navbar.css";
import { CreateBoardAPI } from "../services/API";
import { useNavigate} from 'react-router-dom'

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));
const Navbar = () => {
  
  const [boardName, setBoardName]= useState<string>('');
  const navigate = useNavigate()

  // Board create function
  const  handleBoardCreateButton= async()=>{
      await CreateBoardAPI(boardName);
      setBoardName('');
      navigate('/');
      

  }

  // Workspace Menu button
  const [anchorElWorkspace, setAnchorElWorkspace] =
    React.useState<null | HTMLElement>(null);
  const openWorkspace = Boolean(anchorElWorkspace);
  const handleClickWorkSpace = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElWorkspace(event.currentTarget);
  };
  const handleCloseWorkspace = () => {
    setAnchorElWorkspace(null);
  };

  //   Recent Menu button functions
  const [anchorElRecent, setAnchorElRecent] =
    React.useState<null | HTMLElement>(null);
  const openRecent = Boolean(anchorElRecent);
  const handleClickRecent = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElRecent(event.currentTarget);
  };
  const handleCloseRecent = () => {
    setAnchorElRecent(null);
  };
  //   Starred Menu button functions
  const [anchorElStarred, setAnchorElStarred] =
    React.useState<null | HTMLElement>(null);
  const openStarred = Boolean(anchorElStarred);
  const handleClickStarred = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElStarred(event.currentTarget);
  };
  const handleCloseStarred = () => {
    setAnchorElStarred(null);
  };

  //   Templates Menu button functions
  const [anchorElTemplates, setAnchorElTemplates] =
    React.useState<null | HTMLElement>(null);
  const openTemplates = Boolean(anchorElTemplates);
  const handleClickTemplates = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElTemplates(event.currentTarget);
  };
  const handleCloseTemplates = () => {
    setAnchorElTemplates(null);
  };

  return (
    <div>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Typography
              className="topography_logo"
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              {/* Trello logo  */}
              <div className="logo_main">
                <AppsIcon sx={{ marginRight: 2 }} />
                <img
                  src={logo}
                  width={"25px"}
                  height={"25px"}
                  alt="Trello Logo"
                  style={{ background: "white", borderRadius: "5px" }}
                />
                <h5 className="brand_name">Trello</h5>
              </div>
            </Typography>
            <Box flexGrow={1}>
              <div className="navbar_menus">
                {/* Workspace Menu Button */}
                <div className="d-sm-none d-md-none d-lg-block">
                  <Button
                    id="demo-customized-button-workspace"
                    aria-controls={
                      openWorkspace
                        ? "demo-customized-menu-workspace"
                        : undefined
                    }
                    aria-haspopup="true"
                    aria-expanded={openWorkspace ? "true" : undefined}
                    variant="contained"
                    disableElevation
                    onClick={handleClickWorkSpace}
                    endIcon={<KeyboardArrowDownIcon />}
                    style={{ textTransform: "capitalize" }}
                  >
                    Workspaces
                  </Button>
                  <StyledMenu
                    id="demo-customized-menu-workspace"
                    MenuListProps={{
                      "aria-labelledby": "demo-customized-button-workspace",
                    }}
                    anchorEl={anchorElWorkspace}
                    open={openWorkspace}
                    onClose={handleCloseWorkspace}
                  >
                    <MenuItem
                      id="workspace_menu_tab"
                      onClick={handleCloseWorkspace}
                      disableRipple
                    >
                      <div className="workspace_menu">
                        <p className="workspace_avatar">T</p>
                        <p className="sub_menu">Trello Workspace</p>
                      </div>
                    </MenuItem>
                  </StyledMenu>
                </div>
                {/* Recent Menu Button */}
                <div className="d-sm-none d-md-none d-lg-block">
                  <Button
                    id="demo-customized-button"
                    aria-controls={
                      openRecent ? "demo-customized-menu" : undefined
                    }
                    aria-haspopup="true"
                    aria-expanded={openRecent ? "true" : undefined}
                    variant="contained"
                    disableElevation
                    onClick={handleClickRecent}
                    endIcon={<KeyboardArrowDownIcon />}
                    style={{ textTransform: "capitalize" }}
                  >
                    Recent
                  </Button>
                  <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                      "aria-labelledby": "demo-customized-button",
                    }}
                    anchorEl={anchorElRecent}
                    open={openRecent}
                    onClose={handleCloseRecent}
                  >
                    <MenuItem
                      id="workspace_menu_tab"
                      onClick={handleCloseRecent}
                      disableRipple
                    >
                      <div className="workspace_menu">
                        <p className="workspace_avatar">T</p>
                        <p className="sub_menu">Recent Board</p>
                      </div>
                    </MenuItem>
                  </StyledMenu>
                </div>
                {/* Starred Menu Button */}
                <div>
                  <Button
                    id="demo-customized-button"
                    aria-controls={
                      openStarred ? "demo-customized-menu" : undefined
                    }
                    aria-haspopup="true"
                    aria-expanded={openStarred ? "true" : undefined}
                    variant="contained"
                    disableElevation
                    onClick={handleClickStarred}
                    endIcon={<KeyboardArrowDownIcon />}
                    style={{ textTransform: "capitalize" }}
                  >
                    Starred
                  </Button>
                  <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                      "aria-labelledby": "demo-customized-button",
                    }}
                    anchorEl={anchorElStarred}
                    open={openStarred}
                    onClose={handleCloseStarred}
                  >
                    <MenuItem
                      id="workspace_menu_tab"
                      onClick={handleCloseStarred}
                      disableRipple
                    >
                      <div className="workspace_menu">
                        <p className="workspace_avatar">T</p>
                        <p className="sub_menu">Starred Board</p>
                      </div>
                    </MenuItem>
                  </StyledMenu>
                </div>
                {/* Templates Menu Button */}
                <div>
                  <Button
                    id="demo-customized-button"
                    aria-controls={
                      openTemplates ? "demo-customized-menu" : undefined
                    }
                    aria-haspopup="true"
                    aria-expanded={openTemplates ? "true" : undefined}
                    variant="contained"
                    disableElevation
                    onClick={handleClickTemplates}
                    endIcon={<KeyboardArrowDownIcon />}
                    style={{ textTransform: "capitalize" }}
                  >
                    Templates
                  </Button>
                  <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                      "aria-labelledby": "demo-customized-button",
                    }}
                    anchorEl={anchorElTemplates}
                    open={openTemplates}
                    onClose={handleCloseTemplates}
                  >
                    <MenuItem
                      id="workspace_menu_tab"
                      onClick={handleCloseTemplates}
                      disableRipple
                    >
                      <div className="workspace_menu">
                        <p className="workspace_avatar">P</p>
                        <p className="sub_menu">Project Template</p>
                      </div>
                    </MenuItem>
                  </StyledMenu>
                </div>
                {/* Board Create Button */}
                <Stack spacing={2} direction="row">
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "whitesmoke",
                      textTransform: "capitalize",
                      color: "black",
                    }}
                    className="board_create_btn"
                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                  >
                    Create
                  </Button>
                </Stack>
              </div>
            </Box>

            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Stack className="stack_navbar_right" direction="row" spacing={2}>
              {/* Notification Icon */}
              <Tooltip title="notification">
                <NotificationsNoneIcon
                  sx={{ width: 30, height: 30 }}
                  className="notification_icon"
                />
              </Tooltip>
              {/* Helpout Icon */}
              <Tooltip title="Help">
                <HelpOutlineIcon
                  sx={{ width: 30, height: 30 }}
                  className="helpout_icon"
                />
              </Tooltip>
              {/* User Avatar */}
              <Tooltip title="Account">
                <Avatar
                  sx={{ bgcolor: deepPurple[500], width: 32, height: 32 }}
                  className="user_avatar_logo"
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
              </Tooltip>
            </Stack>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Create Board Modal */}
      <div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Create Board</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
              <form>
              <div className="mb-3">
                <label htmlFor="boardName" className="form-label">Board Name</label>
                <input type="text" className="form-control" id="boardName" value={boardName} onChange={(e)=>setBoardName(e.target.value)}  aria-describedby="boardName"/>
              </div>
              <button type="button" onClick={handleBoardCreateButton}  data-bs-dismiss="modal" className="btn btn-primary text-dark" >Create</button>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary text-dark" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Navbar;
