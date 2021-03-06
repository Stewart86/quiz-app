import {
  AppBar,
  Divider,
  IconButton,
  Slide,
  Toolbar,
  Tooltip,
} from "@material-ui/core"

import CancelIcon from "@material-ui/icons/Cancel"
import MenuOpenIcon from "@material-ui/icons/MenuOpen"
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore"
import NavigateNextIcon from "@material-ui/icons/NavigateNext"
import PrintIcon from "@material-ui/icons/Print"
import React from "react"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  featureBar: {
    alignItems: "flex-end",
    backgroundColor: theme.palette.primary.light,
    justifyContent: "flex-end",
  },
}))

export const QuizFunctionBar = ({
  handlePrintable,
  onHandleDrawer,
  handlePreviousClick,
  handleNextClick,
  handleEndClick,
  handleDisablePreviousBtn,
  handleDisableNextBtn,
}) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Slide in={true} direction={"down"}>
        <AppBar position={"static"}>
          <Toolbar className={classes.featureBar} variant={"dense"}>
            <Divider orientation={"vertical"} flexItem />
            <Tooltip title={"Menu"}>
              <IconButton
                variant={"outlined"}
                color={"secondary"}
                onClick={() => onHandleDrawer(true)}>
                <MenuOpenIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Previous"} component={"span"}>
              <IconButton
                disabled={handleDisablePreviousBtn}
                variant={"contained"}
                color={"secondary"}
                onClick={handlePreviousClick}>
                <NavigateBeforeIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Next"}>
              <IconButton
                disabled={handleDisableNextBtn}
                variant={"contained"}
                color={"secondary"}
                onClick={handleNextClick}>
                <NavigateNextIcon />
              </IconButton>
            </Tooltip>
            <Divider orientation={"vertical"} flexItem />
            <Tooltip title={"Print"}>
              <IconButton color={"secondary"} onClick={() =>handlePrintable()}>
                <PrintIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={"End"}>
              <IconButton
                variant={"outlined"}
                color={"secondary"}
                onClick={handleEndClick}>
                <CancelIcon />
              </IconButton>
            </Tooltip>
            <Divider orientation={"vertical"} flexItem />
          </Toolbar>
        </AppBar>
      </Slide>
    </div>
  )
}
