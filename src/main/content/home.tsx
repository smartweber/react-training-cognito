import * as React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { VideoPlayer } from './videoplayer'
import { PlayerOptions } from 'video.js'
import { Card, Typography } from '@material-ui/core'
import classNames from 'classnames'

const styles = theme => ({
  card: {
    padding: 24,
    color: '#000'
  },
  cardSmall: {
    padding: 14,
    color: '#000',
    cursor: 'pointer'
  },
  text: {
    color: '#fff',
    clear: 'right'
  },
  root: {
    padding: 24,
    color: '#fff',
    boxSizing: 'border-box',
    display: 'block',
    flex: '1 1 0%',
    background:
      'url(/assets/images/backgrounds/background-image.png) no-repeat',
    backgroundSize: 'cover'
  }
})

class Home extends React.Component<{ classes: any }> {
  render() {
    const { classes } = this.props

    const videoJsOptions: PlayerOptions = {
      autoplay: false,
      controls: true,
      fluid: true,
      aspectRatio: '16:9',
      sources: [
        {
          src: 'https://new-api.virtualevaluator.net/explainer.mp4',
          type: 'video/mp4'
        }
      ]
    }

    return (
      <div className={classes.root}>
        <div className="flex flex-col sm:flex sm:flex-row pb-32">
          <div className="widget flex w-full sm:w-1/2 p-16">
            <Card className={classNames(classes.card, 'w-full')}>
              <VideoPlayer {...videoJsOptions} />
            </Card>
          </div>

          <div className="widget flex w-full sm:w-1/2 p-16">
            <Typography className={classNames(classes.text)} variant="display1">
              Welcome
              <Typography className={classNames(classes.text)} variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                congue lacinia risus, sodales egestas est cursus sit amet.
                Suspendisse hendrerit varius ligula, a scelerisque tortor
                dapibus in. Cras imperdiet ligula ac est mollis, in pretium erat
                maximus. Suspendisse lobortis massa ac turpis scelerisque, vitae
                accumsan diam posuere.
              </Typography>
            </Typography>
          </div>
        </div>
        <div className="flex flex-col sm:flex sm:flex-row pb-32">
          <Typography className={classNames(classes.text)} variant="headline">
            Your favorite videos
          </Typography>
        </div>
        <div className="flex flex-col sm:flex sm:flex-row pb-32">
          <div className="widget flex w-full sm:w-1/6 p-16">
            <Card className={classNames(classes.cardSmall, 'w-full')}>
              <img src="assets/images/cards/card1.jpg" />
              video title example
            </Card>
          </div>
          <div className="widget flex w-full sm:w-1/6 p-16">
            <Card className={classNames(classes.cardSmall, 'w-full')}>
              <img src="assets/images/cards/card1.jpg" />
              video title example
            </Card>
          </div>
          <div className="widget flex w-full sm:w-1/6 p-16">
            <Card className={classNames(classes.cardSmall, 'w-full')}>
              <img src="assets/images/cards/card1.jpg" />
              video title example
            </Card>
          </div>
          <div className="widget flex w-full sm:w-1/6 p-16">
            <Card className={classNames(classes.cardSmall, 'w-full')}>
              <img src="assets/images/cards/card1.jpg" />
              video title example
            </Card>
          </div>
          <div className="widget flex w-full sm:w-1/6 p-16">
            <Card className={classNames(classes.cardSmall, 'w-full')}>
              <img src="assets/images/cards/card1.jpg" />
              video title example
            </Card>
          </div>
          <div className="widget flex w-full sm:w-1/6 p-16">
            <Card className={classNames(classes.cardSmall, 'w-full')}>
              <img src="assets/images/cards/card1.jpg" />
              video title example
            </Card>
          </div>
        </div>
      </div>
    )
  }
}

// @ts-ignore
export default withStyles(styles, { withTheme: true })(Home)
