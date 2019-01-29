import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    width: '90%'
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2
  },
  resetContainer: {
    padding: theme.spacing.unit * 3
  },
  lineVerticalWrapper: {
    marginLeft: 12
  },
  lineVertical: {
    borderLeftStyle: 'solid',
    borderLeftWidth: 1,
    minHeight: theme.spacing.unit * 3
  },
  stepper: {
    padding: 0
  }
})


class VideoStepper extends React.Component {
  state = {
    activeStep: 0
  }

  handleNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1
    })
  }

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1
    })
  }

  handleReset = () => {
    this.setState({
      activeStep: 0
    })
  }

  goTo = index => {
    this.setState({
      activeStep: index
    })
  }

  render() {
    const { classes, videos } = this.props
    const { activeStep } = this.state

    return (
      <div className={classes.root}>
        {videos.length === 0 ? (
          <div>no videos</div>
        ) : (
          <Stepper
            className={classes.stepper}
            activeStep={activeStep}
            orientation="vertical"
            connector={
              <div className={classes.lineVerticalWrapper}>
                <span className={classes.lineVertical} />
              </div>
            }
          >
            {videos.map((video, index) => {
              return (
                <Step key={video.id} onClick={() => this.goTo(index)}>
                  <StepLabel>{video.data.title}</StepLabel>
                </Step>
              )
            })}
          </Stepper>
        )}
      </div>
    )
  }
}

VideoStepper.propTypes = {
  classes: PropTypes.object
}

export default withStyles(styles)(VideoStepper)
