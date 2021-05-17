import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { RecordMeetings } from '/imports/api/meetings';
// import StreamMeetings from '/imports/api/stream-meeting';
import Auth from '/imports/ui/services/auth';
import { notify } from '/imports/ui/services/notification';
import VoiceUsers from '/imports/api/voice-users';
import StreamingIndicator from './component';

const StreamIndicatorContainer = props => (
  <StreamingIndicator {...props} />
);

export default withTracker(() => {
  const meetingId = Auth.meetingID;
  const recordObeject = RecordMeetings.findOne({ meetingId });
  const streaming = false;

  // const streamMeet = StreamMeetings.findOne( {meetingId });
  // if (!streamMeet)
  //   console.log('no stream meetings found')
  // else console.log(streamMeet)

  RecordMeetings.find({ meetingId: Auth.meetingID }, { fields: { recording: 1 } }).observeChanges({
    changed: (id, fields) => {
      if (fields && fields.recording) {
        this.window.parent.postMessage({ response: 'recordingStarted' }, '*');
      }

      if (fields && !fields.recording) {
        this.window.parent.postMessage({ response: 'recordingStopped' }, '*');
      }
    },
  });

  const micUser = VoiceUsers.findOne({ meetingId, joined: true, listenOnly: false }, {
    fields: {
      joined: 1,
    },
  });

  return {
    allowStartStopRecording: !!(recordObeject && recordObeject.allowStartStopRecording),
    autoStartRecording: recordObeject && recordObeject.autoStartRecording,
    record: recordObeject && recordObeject.record,
    recording: recordObeject && recordObeject.recording,
    time: recordObeject && recordObeject.time,
    notify,
    micUser,
    streaming,
  };
})(StreamIndicatorContainer);
