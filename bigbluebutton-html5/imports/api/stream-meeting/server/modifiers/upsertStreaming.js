import { check } from 'meteor/check';
// import flat from 'flat';
// import Logger from '/imports/startup/server/logger';
import StreamMeetings from '/imports/api/stream-meeting';

export default function upsertStreaming(meetingId, body) {
  check(meetingId, String);

  console.log(`upsertStreaming ${meetingId}`);

  const selector = {
    meetingId,
    streamMedia: body.streamMedia,
  };

  const modifier = {
    $set: {
      meetingId,
      extMeetingId: body.extMeetingId,
      streamMedia: body.streamMedia,
      isStreaming: body.isStreaming,
    },
  };

  StreamMeetings.upsert(selector, modifier);
}
