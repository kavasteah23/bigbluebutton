import { check } from 'meteor/check';
// import flat from 'flat';
// import Logger from '/imports/startup/server/logger';
import StreamMeetings from '/imports/api/stream-meeting';

export default function removeStreaming(meetingId, body) {
  check(meetingId, String);

  console.log(`removeStreaming ${meetingId}`);

  const selector = {
    meetingId,
    streamMedia: body.streamMedia,
  };

  StreamMeetings.remove(selector);
}
