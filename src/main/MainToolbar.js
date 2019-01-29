import * as React from 'react'
import { withStyles } from '@material-ui/core/styles/index'
import classNames from 'classnames'
import {
  Avatar,
  Button,
  Icon,
  IconButton,
  ListItemIcon,
  ListItemText,
  Popover,
  MenuItem,
  Typography
} from '@material-ui/core'
import { connect } from 'react-redux'
import * as quickPanelActions from '../main/quickPanel/store/actions'
import * as authActions from '../auth/store/actions'
import { bindActionCreators } from 'redux'
import { FuseAnimate } from '../@fuse'
import { Link } from 'react-router-dom'
import ChannelList from './ChannelList'
import Input from '@material-ui/core/Input'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { getChannels } from '../auth/cognito/organizationApi'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  seperator: {
    width: 1,
    height: 64,
    backgroundColor: theme.palette.divider
  }
})

class MainToolbar extends React.Component {
  state = {
    userMenu: null,
    openAddDialog: false,
    channels: [],
    loadingChannel: false,
    addMenu: null
  }

  userMenuClick = event => {
    this.setState({ userMenu: event.currentTarget })
  }

  userMenuClose = () => {
    this.setState({ userMenu: null })
  }

  addMenuClick = event => {
    this.setState({ addMenu: event.currentTarget })
  }

  addMenuClose = () => {
    this.setState({ addMenu: null })
  }

  handleClickAddDialog = () => {
    this.setState({ openAddDialog: true })
  }

  handleCloseAddDialog = () => {
    this.setState({ openAddDialog: false })
  }

  componentDidMount = () => {
    getChannels().then(channels => {
      this.setState({
        channels: channels.map(c => ({
          name: c.data.name,
          id: c.id           
        })),
        loadingChannel: false
      })
    })
  }

  render() {
    const { classes, user, logout } = this.props
    const { userMenu, addMenu } = this.state

    return (
      <div className={classNames(classes.root, 'flex flex-row')}>
        <div className="flex flex-1">
          <ChannelList
            channels={this.state.channels}
            loading={this.state.loadingChannel}
          />
        </div>

        <div className="flex">
          <Input
            placeholder="Search..."
            className="pl-16"
            disableUnderline={true}
          />

          <IconButton className="w-64 h-64">
            <Icon>search</Icon>
          </IconButton>

          <div className={classes.seperator} />

          <IconButton className="w-64 h-64" onClick={this.addMenuClick}>
            <Icon>add</Icon>
          </IconButton>
          <Dialog
            open={this.state.openAddDialog}
            onClose={this.handleCloseAddDialog}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To subscribe to this website, please enter your email address
                here. We will send updates occasionally.
              </DialogContentText>
              <TextField
                autoFocus={true}
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth={true}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseAddDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleCloseAddDialog} color="primary">
                Subscribe
              </Button>
            </DialogActions>
          </Dialog>

          <Popover
            open={Boolean(addMenu)}
            anchorEl={addMenu}
            onClose={this.addMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
            classes={{
              paper: 'py-8'
            }}
          >
            <React.Fragment>
              <MenuItem
                // component={Link}
                // to="/pages/profile"
                // tslint:disable-next-line:jsx-no-lambda
                onClick={() => {
                  this.addMenuClose()
                  this.handleClickAddDialog()
                }}
              >
                <ListItemText className="pl-0" primary="Video" />
              </MenuItem>
            </React.Fragment>
          </Popover>

          <IconButton className="w-64 h-64">
            <Icon>notifications</Icon>
          </IconButton>

          <IconButton className="w-64 h-64">
            <Icon>help</Icon>
          </IconButton>

          <FuseAnimate delay={300}>
            <Button className="h-64" onClick={this.userMenuClick}>
              {user.data.photoURL ? (
                <Avatar
                  className=""
                  alt="user photo"
                  src={user.data.photoURL}
                />
              ) : (
                <Avatar className="">{user.data.displayName[0]}</Avatar>
              )}

              <div className="hidden md:flex flex-col ml-12 items-start">
                <Typography
                  component="span"
                  className="normal-case font-500 flex"
                >
                  {user.data.displayName}
                </Typography>
                <Typography
                  className="text-11 capitalize"
                  color="textSecondary"
                >
                  {user.role}
                </Typography>
              </div>

              <Icon className="text-16 ml-12 hidden sm:flex" variant="action">
                keyboard_arrow_down
              </Icon>
            </Button>
          </FuseAnimate>

          <Popover
            open={Boolean(userMenu)}
            anchorEl={userMenu}
            onClose={this.userMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
            classes={{
              paper: 'py-8'
            }}
          >
            {user.role === 'guest' ? (
              <React.Fragment>
                <MenuItem component={Link} to="/login">
                  <ListItemIcon>
                    <Icon>lock</Icon>
                  </ListItemIcon>
                  <ListItemText className="pl-0" primary="Login" />
                </MenuItem>
                <MenuItem component={Link} to="/register">
                  <ListItemIcon>
                    <Icon>person_add</Icon>
                  </ListItemIcon>
                  <ListItemText className="pl-0" primary="Register" />
                </MenuItem>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <MenuItem
                  component={Link}
                  to="/pages/profile"
                  onClick={this.userMenuClose}
                >
                  <ListItemIcon>
                    <Icon>account_circle</Icon>
                  </ListItemIcon>
                  <ListItemText className="pl-0" primary="My Profile" />
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/apps/mail"
                  onClick={this.userMenuClose}
                >
                  <ListItemIcon>
                    <Icon>mail</Icon>
                  </ListItemIcon>
                  <ListItemText className="pl-0" primary="Inbox" />
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    logout()
                    this.userMenuClose()
                  }}
                >
                  <ListItemIcon>
                    <Icon>exit_to_app</Icon>
                  </ListItemIcon>
                  <ListItemText className="pl-0" primary="Logout" />
                </MenuItem>
              </React.Fragment>
            )}
          </Popover>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      toggleQuickPanel: quickPanelActions.toggleQuickPanel,
      logout: authActions.logoutUser
    },
    dispatch
  )
}

function mapStateToProps({ auth }) {
  return {
    user: auth.user
  }
}

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MainToolbar)
)
