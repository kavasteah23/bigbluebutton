import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { withModalMounter } from '/imports/ui/components/modal/service';
import EndStreamingComponent from './component';
import { endStream } from '../service';

const EndStreamingContainer = props => <EndStreamingComponent {...props} />;

export default withModalMounter(withTracker(({ mountModal }) => ({
  closeModal() {
    mountModal(null);
  },

  endStreaming: () => {
    // logger.warn({
    //   logCode: 'moderator_forcing_end_streaming',
    //   extraInfo: { logType: 'user_action' },
    // }, 'this user clicked on endStreaming and confirmed, removing every streams of meeting');
    endStream();
    mountModal(null);
  },

}))(EndStreamingContainer));
