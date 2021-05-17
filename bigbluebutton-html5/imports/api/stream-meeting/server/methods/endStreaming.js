import { check } from 'meteor/check';
// import { stopStream } from '../utils/streamDockerUtils';
import Meetings from '/imports/api/meetings';
import removeStreaming from '../modifiers/removeStreaming';

export default function endStreaming(meetingID, streamMedia) {
  console.log(`endStreaming with meetingID: ${meetingID} on media: ${streamMedia}`);

  check(meetingID, String);
  check(streamMedia, String);

  const meeting = Meetings.findOne({ meetingId: meetingID });
  const extMeetingId = meeting.meetingProp.extId;

  const body = {
    streamMedia,
    isStreaming: false,
    extMeetingId,
  };

  // stopStream(meetingID, streamMedia);

  return removeStreaming(meetingID, body);
}
