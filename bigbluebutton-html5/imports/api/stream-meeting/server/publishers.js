import StreamMeetings from '/imports/api/stream-meeting';
import { Meteor } from 'meteor/meteor';
import Logger from '/imports/startup/server/logger';
import { extractCredentials } from '/imports/api/common/server/helpers';

function streaming() {
  if (!this.userId) {
    return StreamMeetings.find({ meetingId: '' });
  }
  const { meetingId, requesterUserId } = extractCredentials(this.userId);

  Logger.debug('Publishing Streaming', { meetingId, requesterUserId });

  console.log('Publishing stream-meetings');

  return StreamMeetings.find({ meetingId });
}

function publish(...args) {
  const boundStreaming = streaming.bind(this);
  return boundStreaming(...args);
}

Meteor.publish('stream-meetings', publish);
