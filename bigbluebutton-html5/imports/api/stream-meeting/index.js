import { Meteor } from 'meteor/meteor';
// import { makeCall } from '/imports/ui/services/api';
const StreamMeetings = new Mongo.Collection('stream-meetings');


if (Meteor.isServer) {
  StreamMeetings._ensureIndex({ meetingId: 1 });
}

export default StreamMeetings;
