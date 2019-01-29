import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Manager, Target, Popper } from 'react-popper'
import Button from '@material-ui/core/Button'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import { withStyles } from '@material-ui/core/styles'
import Apps from '@material-ui/icons/Apps'
import { Link } from 'react-router-dom'

const styles = theme => ({
  root: {
    display: 'flex',
    marginLeft: 10
  },
  paper: {
    marginRight: theme.spacing.unit * 2
  },
  popperClose: {
    pointerEvents: 'none'
  },
  dropdown: {
    minWidth: 250
  },
  iconSmall: {
    fontSize: 40,
    paddingRight: 5
  }
})

class MenuListComposition extends React.Component {
  state = {
    open: false
  }

  handleToggle = () => {
    this.setState({ open: !this.state.open })
  }

  handleClose = event => {
    this.setState({ open: false })
  }

  render() {
    const { classes, channels, loading } = this.props
    const { open } = this.state

    return (
      <div className={classes.root}>
        <Manager>
          <Target>
            <div
              ref={node => {
                this.target1 = node
              }}
            >
              <Button
                aria-owns={open ? 'menu-list-grow' : null}
                aria-haspopup="true"
                onClick={this.handleToggle}
              >
                <Apps
                  className={classNames(classes.leftIcon, classes.iconSmall)}
                />
                Select Channel
              </Button>
            </div>
          </Target>
          <Popper
            placement="bottom-start"
            eventsEnabled={open}
            className={classNames({ [classes.popperClose]: !open })}
          >
            <ClickAwayListener onClickAway={this.handleClose}>
              <Grow
                in={open}
                id="menu-list-grow"
                style={{ transformOrigin: '0 0 0' }}
              >
                <Paper className={classNames(classes.dropdown)}>
                  {loading ? (
                    'loading...'
                  ) : (
                    <MenuList role="menu">
                      {channels.map(channel => (
                        <MenuItem
                          key={channel.id}
                          onClick={this.handleClose}
                          // target='_self'
                          component={Link}
                          to={`/channels/${channel.id}`}
                        >
                          {channel.name}
                        </MenuItem>
                      ))}
                    </MenuList>
                  )}
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>
        </Manager>
      </div>
    )
  }
}

MenuListComposition.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MenuListComposition)
