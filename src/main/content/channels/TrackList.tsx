import * as React from 'react'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import VideoStepper from './VideoStepper'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchTrack } from '../../../store/actions'

const styles = theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15)
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
})

class TrackList extends React.Component<any, any> {
  state = {
    expanded: null,
    isExpandedTrackLoaded: null
  }

  componentDidUpdate() {
    if (
      this.props.docs[this.state.expanded] &&
      this.state.isExpandedTrackLoaded === false
    ) {
      return this.setState({
        isExpandedTrackLoaded: true
      })
    }

    if (this.state.expanded && !this.props.docs[this.state.expanded]) {
      this.props.fetchTrack(this.state.expanded)
    }
  }

  handleChange = trackId => (event, expanded) => {
    this.setState({
      expanded: expanded ? trackId : false,
      isExpandedTrackLoaded: expanded && this.props.docs[trackId] ? true : false
    })
  }

  render() {
    const { classes, tracks } = this.props
    const { expanded } = this.state

    return (
      <div className={classes.root}>
        {tracks.map((track, index) => (
          <ExpansionPanel
            key={track.id}
            expanded={expanded === track.id}
            onChange={this.handleChange(track.id)}
          >
            <ExpansionPanelSummary>
              <Typography className={classes.heading}>
                {track.data.name}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              {this.state.isExpandedTrackLoaded ? (
                <VideoStepper videos={this.props.docs[this.state.expanded].videos} />
              ) : (
                <div>loading...</div>
              )}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchTrack
    },
    dispatch
  )
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    docs: state.docs
  }
}

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TrackList)
)
