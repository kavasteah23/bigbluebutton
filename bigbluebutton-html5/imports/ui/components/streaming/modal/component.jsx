import React, { useState, Component } from 'react';

import { withModalMounter } from '/imports/ui/components/modal/service';
import Modal from '/imports/ui/components/modal/simple/component';
import Button from '/imports/ui/components/button/component';
import EndStreamingConfirmationContainer from '../end-streaming/container';

import { defineMessages, injectIntl } from 'react-intl';
import { startStream, stopStream, endStream } from '../service';
import { notify } from '/imports/ui/services/notification';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStop } from '@fortawesome/free-solid-svg-icons';
import { faYoutube, faFacebook } from '@fortawesome/free-brands-svg-icons';

import { styles } from './styles';


const intlMessages = defineMessages({
  startMsgYt: {
    id: 'app.streaming.startStreamMsgYt',
    description: 'Start streaming on YouTube notification',
  },
  startMsgFb: {
    id: 'app.streaming.startStreamMsgFb',
    description: 'Start streaming on Facebook notification',
  },
  stopMsgYt: {
    id: 'app.streaming.stopStreamMsgYt',
    description: 'Stop streaming on YouTube notification',
  },
  stopMsgFb: {
    id: 'app.streaming.stopStreamMsgFb',
    description: 'Stop streaming on Facebook notification',
  },
  startFbBtnLabel: {
    id: 'app.streaming.startFbBtnLabel',
    description: 'Start streaming on Facebook button label',
  },
  startYtBtnLabel: {
    id: 'app.streaming.startYtBtnLabel',
    description: 'Start streaming on YouTube button label',
  },
  stopFbBtnLabel: {
    id: 'app.streaming.stopFbBtnLabel',
    description: 'Stop streaming on Facebook button label',
  },
  stopYtBtnLabel: {
    id: 'app.streaming.stopYtBtnLabel',
    description: 'Stop streaming on YouTube button label',
  },
  endStreamMsg: {
    id: 'app.streaming.endStreamMsg',
    description: 'Ending streaming notification',
  },
  chooseHint: {
    id: 'app.streaming.chooseHint',
    description: 'Choose platform description',
  },
  title: {
    id: 'app.streaming.title',
    description: 'Modal title',
  },
  ytStream: {
    id: 'app.streaming.ytLabel',
    description: 'Youtube label',
  },
  fbStream: {
    id: 'app.streaming.fbLabel',
    description: 'Facebook label',
  },
  stopStream: {
    id: 'app.streaming.stopStream',
    description: 'Stop streaming description',
  },
  note: {
    id: 'app.streaming.noteLabel',
    description: 'provides hint about Streaming',
  },
  genericError: {
    id: 'app.streaming.genericError',
    description: 'error message for when streaming fails with unknown error',
  },
});

class StreamingModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isStreamingFB: this.props.isStreamingFacebook, 
      isStreamingYT: this.props.isStreamingYoutube,
    }

    this.startStreamFBHandler = this.startStreamFBHandler.bind(this);
    this.startStreamYTHandler = this.startStreamYTHandler.bind(this);
    this.endStreamingHandler = this.endStreamingHandler.bind(this);
    this.stopStreamYTHandler = this.stopStreamYTHandler.bind(this);
    this.stopStreamFBHandler = this.stopStreamFBHandler.bind(this);
  }


  componentWillReceiveProps = nextProps => {
    this.setState({isStreamingFB: nextProps.isStreamingFacebook})
    this.setState({isStreamingYT: nextProps.isStreamingYoutube})
  }

  endStreamingHandler() {
    const {
      mountModal,
      intl,
    } = this.props;

    endStream();

    notify(intl.formatMessage(intlMessages.endStreamMsg), 'error', 'video');

    // closeModal();
    mountModal(<EndStreamingConfirmationContainer />)
  }

  stopStreamFBHandler() {
    const {
      intl,
    } = this.props;

    notify(intl.formatMessage(intlMessages.stopMsgFb), 'error', 'video');

    stopStream('facebook');
  }

  stopStreamYTHandler() {
    const {
      intl,
    } = this.props;

    notify(intl.formatMessage(intlMessages.stopMsgYt), 'error', 'video');

    stopStream('youtube');
  }

  startStreamYTHandler() {
    const {
      intl,
    } = this.props;

    const streamMedia='youtube';
    startStream(streamMedia);
    notify(intl.formatMessage(intlMessages.startMsgYt), 'error', 'video');

  }

  startStreamFBHandler() {
    const {
      intl,
    } = this.props;

    const streamMedia='facebook';
    startStream(streamMedia);
    notify(intl.formatMessage(intlMessages.startMsgFb), 'error', 'video');
  }

  render() {
    const { intl, closeModal } = this.props;

    // console.log(`Is Streaming?: ${this.state.streaming}`)
    return (
      <Modal
        overlayClassName={styles.overlay}
        className={styles.modal}
        onRequestClose={closeModal}
        contentLabel={intl.formatMessage(intlMessages.title)}
        hideBorder
      >
        <header data-test="streamModalHeader" className={styles.header}>
          <h3 className={styles.title}>{intl.formatMessage(intlMessages.title)}</h3>
        </header>

        <div className={styles.content}>
          <div className={styles.streamPanel}>
            <span className={styles.streamChoose} >
              {intl.formatMessage(intlMessages.chooseHint)}
            </span>
            <div className={styles.buttons}>
              { this.state.isStreamingFB ? 
                <button className={styles.button} 
                  onClick={this.stopStreamFBHandler}
                >
                  <span className={styles.btnIcon}><FontAwesomeIcon icon={ faStop } /></span>
                  <span className={styles.btnLabel}>{intl.formatMessage(intlMessages.stopFbBtnLabel)}</span>
                </button> : 
                <button
                  className={styles.button}
                  onClick={this.startStreamFBHandler}
                >
                  <span className={styles.btnIcon}><FontAwesomeIcon icon={ faFacebook } /></span>
                  <span className={styles.btnLabel}>{intl.formatMessage(intlMessages.startFbBtnLabel)}</span>
                </button> 
              }
              { this.state.isStreamingYT ? 
                <button className={styles.button} 
                  onClick={this.stopStreamYTHandler}
                >
                  <span className={styles.btnIcon}><FontAwesomeIcon icon={ faStop } /></span>
                  <span className={styles.btnLabel}>{intl.formatMessage(intlMessages.stopYtBtnLabel)}</span>
                </button>: 
                <button 
                  className={styles.button}
                  onClick={this.startStreamYTHandler}
                >
                  <span className={styles.btnIcon}><FontAwesomeIcon icon={ faYoutube } /></span>
                  <span className={styles.btnLabel}>{intl.formatMessage(intlMessages.startYtBtnLabel)}</span>
                </button> 
              }
            </div>
            { this.state.isStreamingYT && this.state.isStreamingYT ? <div className={styles.streamOpts}>
              <button className={styles.btnStopStream}
                onClick={this.endStreamingHandler}>
                <span className={styles.btnStopIcon}><FontAwesomeIcon icon={ faStop }/></span>
                <span className={styles.btnStopLabel}>{ intl.formatMessage(intlMessages.stopStream) }</span>
              </button>
            </div> : null }
          </div>

        </div>

        <div className={styles.streamingNote} id="streaming-note">
              {intl.formatMessage(intlMessages.note)}
        </div>
      </Modal>
    );
  }
}

export default injectIntl(withModalMounter(StreamingModal));
