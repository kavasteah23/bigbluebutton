import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import Button from '/imports/ui/components/button/component';
import Modal from '/imports/ui/components/modal/simple/component';
import { styles } from './styles';


const intlMessages = defineMessages({
  endStreamingTitle: {
    id: 'app.streaming.endStreamTitle',
    description: 'end streaming title',
  },
  endStreamingDescription: {
    id: 'app.streaming.endStreamDescription',
    description: 'end streaming description',
  },
  yesLabel: {
    id: 'app.streaming.endStreamYesLabel',
    description: 'label for yes button for end streaming',
  },
  noLabel: {
    id: 'app.streaming.endStreamNoLabel',
    description: 'label for no button for end streaming',
  },
});

const propTypes = {
  intl: intlShape.isRequired,
  closeModal: PropTypes.func.isRequired,
  endStreaming: PropTypes.func.isRequired,
};

class EndStreamingComponent extends React.PureComponent {
  render() {
    const { intl, closeModal, endStreaming } = this.props;

    return (
      <Modal
        overlayClassName={styles.overlay}
        className={styles.modal}
        onRequestClose={closeModal}
        hideBorder
        title={intl.formatMessage(intlMessages.endStreamingTitle)}
      >
        <div className={styles.container}>
          <div className={styles.description}>
            {intl.formatMessage(intlMessages.endStreamingDescription)}
          </div>
          <div className={styles.footer}>
            <Button
              data-test="confirmEndStreaming"
              color="primary"
              className={styles.button}
              label={intl.formatMessage(intlMessages.yesLabel)}
              onClick={endStreaming}
            />
            <Button
              label={intl.formatMessage(intlMessages.noLabel)}
              className={styles.button}
              onClick={closeModal}
            />
          </div>
        </div>
      </Modal>
    );
  }
}

EndStreamingComponent.propTypes = propTypes;

export default injectIntl(EndStreamingComponent);
