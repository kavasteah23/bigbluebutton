import Meetings from '/imports/api/meetings';
import Auth from '/imports/ui/services/auth';
import { makeCall } from '/imports/ui/services/api';
import ReactPlayer from 'react-player';
import StreamMeetings from '/imports/api/stream-meeting';
import Panopto from './custom-players/panopto';

const isUrlValid = url => /^https.*$/.test(url) && (ReactPlayer.canPlay(url) || Panopto.canPlay(url));

const startStream = (streamMedia) => {
  const meetingID = Auth.meetingID;

  makeCall('startStreaming', meetingID, streamMedia);
};

const stopStream = (streamMedia) => {
  const meetingId = Auth.meetingID;

  makeCall('pauseStreaming', meetingId, streamMedia);
};

const endStream = () => {
  const meetingId = Auth.meetingID;
  makeCall('endStreaming', meetingId, 'facebook');
  makeCall('endStreaming', meetingId, 'youtube');
};

const isStreamingFacebook = () => {
  const meetingId = Auth.meetingID;
  const streamMeeting = StreamMeetings.findOne({ meetingId, streamMedia: 'facebook' });

  if (!streamMeeting) return false;

  return streamMeeting.isStreaming;
};

const isStreamingYoutube = () => {
  const meetingId = Auth.meetingID;
  const streamMeeting = StreamMeetings.findOne({ meetingId, streamMedia: 'youtube' });

  if (!streamMeeting) return false;

  return streamMeeting.isStreaming;
};

const getVideoUrl = () => {
  const meetingId = Auth.meetingID;
  const meeting = Meetings.findOne({ meetingId }, { fields: { externalVideoUrl: 1 } });

  return meeting && meeting.externalVideoUrl;
};

export {
  getVideoUrl,
  isUrlValid,
  startStream,
  stopStream,
  endStream,
  isStreamingFacebook,
  isStreamingYoutube,
};
