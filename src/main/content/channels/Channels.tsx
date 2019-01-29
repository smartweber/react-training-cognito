import * as React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { FusePageCarded, DemoContent } from '../../../@fuse'
import { Tab, Tabs, Hidden, Icon, IconButton } from '@material-ui/core'
import classNames from 'classnames'
import TrackList from './TrackList'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchChannel } from '../../../store/actions'

const styles = theme => ({
  layoutRoot: {},
  layoutToolbar: {
    padding: 0
  },
  tabsRoot: {
    height: 64
  },
  tabRoot: {
    height: 64
  },
  channelImg: {
    maxWidth: 150,
    maxHeight: 150
  },
  channelImgWrapper: {
    marginTop: 10,
    'text-align': 'center'
  },
  headerTextWrapper: {
    marginTop: 20
  }
})

class Channels extends React.Component<any, any> {
  pageLayout: any
  state = {
    value: 0,
    isMounted: false
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  componentDidMount() {
    this.setState({
      isMounted: true
    })
  }

  componentWillUnmount() {
    this.setState({
      isMounted: false
    })
  }

  componentDidUpdate() {
    if (this.props.isLoaded === false && this.state.isMounted) {
      this.props.fetchChannel(this.props.match.params.channelId)
    }
  }

  render() {
    const { classes } = this.props
    const { value } = this.state

    return (
      <FusePageCarded
        loading={!this.props.isLoaded}
        classes={{
          root: classes.layoutRoot,
          toolbar: classes.layoutToolbar
        }}
        headerBackground={
          this.props.background ||
          '../../assets/images/backgrounds/dark-material-bg.jpg'
        }
        header={
          <div className="flex flex-col flex-1">
            <div className="flex items-center py-24">
              <Hidden lgUp={true}>
                <IconButton
                  // tslint:disable-next-line:jsx-no-lambda
                  onClick={ev => this.pageLayout.toggleLeftSidebar()}
                  aria-label="open left sidebar"
                >
                  <Icon>menu</Icon>
                </IconButton>
              </Hidden>
              <div className={classNames(classes.headerTextWrapper, 'flex-1')}>
                <h4>{this.props.name}</h4>
                <p>{this.props.description}</p>
              </div>
            </div>
          </div>
        }
        contentToolbar={
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable={true}
            scrollButtons="auto"
            classes={{
              root: classes.tabsRoot
            }}
          >
            <Tab
              classes={{
                root: classes.tabRoot
              }}
              label="Item One"
            />
            <Tab
              classes={{
                root: classes.tabRoot
              }}
              label="Item Two"
            />
            <Tab
              classes={{
                root: classes.tabRoot
              }}
              label="Item Three"
            />
            <Tab
              classes={{
                root: classes.tabRoot
              }}
              label="Item Four"
            />
            <Tab
              classes={{
                root: classes.tabRoot
              }}
              label="Item Five"
            />
            <Tab
              classes={{
                root: classes.tabRoot
              }}
              label="Item Six"
            />
            <Tab
              classes={{
                root: classes.tabRoot
              }}
              label="Item Seven"
            />
          </Tabs>
        }
        content={
          <div className="p-24">
            {value === 0 && (
              <div>
                <h3 className="mb-16">Item One</h3>
                <DemoContent />
              </div>
            )}
            {value === 1 && (
              <div>
                <h3 className="mb-16">Item Two</h3>
                <DemoContent />
              </div>
            )}
            {value === 2 && (
              <div>
                <h3 className="mb-16">Item Three</h3>
                <DemoContent />
              </div>
            )}
            {value === 3 && (
              <div>
                <h3 className="mb-16">Item Four</h3>
                <DemoContent />
              </div>
            )}
            {value === 4 && (
              <div>
                <h3 className="mb-16">Item Five</h3>
                <DemoContent />
              </div>
            )}
            {value === 5 && (
              <div>
                <h3 className="mb-16">Item Six</h3>
                <DemoContent />
              </div>
            )}
            {value === 6 && (
              <div>
                <h3 className="mb-16">Item Seven</h3>
                <DemoContent />
              </div>
            )}
          </div>
        }
        leftSidebarHeader={
          <div className={classNames(classes.channelImgWrapper, 'p-24')}>
            {this.props.icon ? (
              <img
                src={this.props.icon}
                className={classNames(classes.channelImg)}
              />
            ) : null}
          </div>
        }
        leftSidebarContent={
          <div className="p-12">
            <h4>{this.props.name}</h4>
            <br />
            {
              // @ts-ignore
              <TrackList tracks={this.props.tracks} />
            }
          </div>
        }
        innerScroll={true}
        // tslint:disable-next-line:jsx-no-lambda
        onRef={instance => {
          this.pageLayout = instance
        }}
      />
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchChannel
    },
    dispatch
  )
}

function mapStateToProps(state, ownProps) {
  const channelId = ownProps.match.params.channelId

  return {
    ...ownProps,
    name: state.docs[channelId] ? state.docs[channelId].data.name : '',
    description: state.docs[channelId]
      ? state.docs[channelId].data.description
      : '',
    background: state.docs[channelId]
      ? state.docs[channelId].data.background
      : '',
    icon: state.docs[channelId] ? state.docs[channelId].data.icon : '',
    tracks: state.docs[channelId] ? state.docs[channelId].tracks : [],
    isLoaded: state.docs[channelId] ? true : false
  }
}

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Channels)
)
