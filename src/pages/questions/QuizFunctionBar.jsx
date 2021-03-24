import {
  AppBar,
  Divider,
  IconButton,
  Slide,
  Toolbar,
  Tooltip,
} from "@material-ui/core"
import { CancelOutlined, PrintOutlined } from "@material-ui/icons"

import CancelIcon from "@material-ui/icons/Cancel"
import MenuOpenIcon from "@material-ui/icons/MenuOpen"
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore"
import NavigateNextIcon from "@material-ui/icons/NavigateNext"
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
                size={"small"}
                variant={"outlined"}
                color={"default"}
                onClick={() => onHandleDrawer(true)}>
                <MenuOpenIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Previous"} component={"span"}>
              <IconButton
                disabled={handleDisablePreviousBtn}
                size={"small"}
                variant={"contained"}
                color={"default"}
                onClick={handlePreviousClick}>
                <NavigateBeforeIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Next"}>
              <IconButton
                disabled={handleDisableNextBtn}
                size={"small"}
                variant={"contained"}
                color={"default"}
                onClick={handleNextClick}>
                <NavigateNextIcon />
              </IconButton>
            </Tooltip>
            <Divider orientation={"vertical"} flexItem />
            <Tooltip title={"Print"}>
              <IconButton size={"small"} color={"default"} onClick={() => handlePrintable()}>
                <PrintOutlined />
              </IconButton>
            </Tooltip>
            <Tooltip title={"End"}>
              <IconButton
                variant={"outlined"}
                size={"small"}
                color={"default"}
                onClick={handleEndClick}>
                <CancelOutlined />
              </IconButton>
            </Tooltip>
            <Divider orientation={"vertical"} flexItem />
          </Toolbar>
        </AppBar>
      </Slide>
    </div>
  )
}
