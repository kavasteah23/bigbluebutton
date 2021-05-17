import { check } from 'meteor/check';
// import { stopStream } from '../utils/streamDockerUtils';
import Meetings from '/imports/api/meetings';
import removeStreaming from '../modifiers/removeStreaming';

export default function pauseStreaming(meetingID, streamMedia) {
  check(meetingID, String);
  check(streamMedia, String);

  console.log(`pauseStreaming with meetingID: ${meetingID} on media: ${streamMedia}`);

  const meeting = Meetings.findOne({ meetingId: meetingID });
  const extMeetingId = meeting.meetingProp.extId;

  const body = {
    streamMedia,
    isStreaming: false,
    extMeetingId,
  };

  // pauseStream(meetingID, streamMedia);

  return removeStreaming(meetingID, body);
}
