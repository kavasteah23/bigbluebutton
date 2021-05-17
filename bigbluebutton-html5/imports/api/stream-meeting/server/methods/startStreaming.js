import { check } from 'meteor/check';
import { startStream } from '../utils/streamDockerUtils';
import Meetings from '/imports/api/meetings';
import upsertStreaming from '../modifiers/upsertStreaming';
// import Logger from '/imports/startup/server/logger';

export default function startStreaming(meetingID, streamMedia) {
  console.log(`startStreaming with meetingID: ${meetingID} on media: ${streamMedia}`);

  check(meetingID, String);
  check(streamMedia, String);

  const meeting = Meetings.findOne({ meetingId: meetingID });
  const extMeetingId = meeting.meetingProp.extId;

  const body = {
    streamMedia,
    isStreaming: true,
    extMeetingId,
  };

  startStream(extMeetingId, streamMedia);

  return upsertStreaming(meetingID, body);
}
