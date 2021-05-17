import DockerApi from '../../../../utils/dockerApi';

function generateStreamOpts(meetingId, streamMedia) {
  let streamURL = '';
  if (streamMedia === 'youtube') {
    streamURL = 'rtmp://a.rtmp.youtube.com/live2/stream/0j6s-t1j6-dtb5-vr68-b548';
  } else if (streamMedia === 'facebook') {
    streamURL = 'rtmps://live-api-s.facebook.com:443/rtmp/stream/103254965232978?s_bl=1&s_ps=1&s_psm=1&s_sw=0&s_vt=api-s&a=AbwFqWiy-N1q20ph';
  } else { streamURL = ''; }
  return {
    HostConfig: {
      ShmSize: 2147483648,
    },
    name: `stream_${streamMedia}_${meetingId}`,
    Tty: true,
    OpenStdin: false,
    Env: [
      'BBB_URL=https://dev.conf.sec4b.pl/bigbluebutton/api',
      'BBB_SECRET=9Nys1WMbQFW3cAeOFH5aZFombUMaPZ6cvVZoU36Yas',
      `BBB_MEETING_ID=${meetingId}`,
      'BBB_START_MEETING=false',
      'BBB_ATTENDEE_PASSWORD=IVLHwOBSVmYP',
      'BBB_MODERATOR_PASSWORD=JjeQYksarqLQ',
      'BBB_MEETING_TITLE=liveStreaming Test',
      `BBB_STREAM_URL=${streamURL}`,
    ],
  };
}


export function startStream(meetingId, streamMedia) {
  console.log(`start Streaming... ${meetingId} on ${streamMedia}`);
  check(meetingId, String);
  check(streamMedia, String);

  const cmd = ['sh', 'startStream.sh'];
  const imageTag = 'bigbluebutton-livestreaming_bbb-streamer:latest';
  const opts = generateStreamOpts(meetingId, streamMedia);

  DockerApi.dockerRun(imageTag, cmd, opts);
}

export function restartStream(meetingId, streamMedia) {
  check(meetingId, String);
  check(streamMedia, String);

  const dockerName = `stream_${streamMedia}_${meetingId}`;

  DockerApi.dockerRestart(dockerName);
}

export function pauseStream(meetingId, streamMedia) {
  check(meetingId, String);
  check(streamMedia, String);

  const dockerName = `stream_${streamMedia}_${meetingId}`;

  DockerApi.dockerStop(dockerName);
}

export function resumeStream(meetingId, streamMedia) {
  check(meetingId, String);
  check(streamMedia, String);

  const dockerName = `stream_${streamMedia}_${meetingId}`;

  DockerApi.dockerStart(dockerName);
}

export function stopStream(meetingId, streamMedia) {
  check(meetingId, String);
  check(streamMedia, String);

  const dockerName = `stream_${streamMedia}_${meetingId}`;

  DockerApi.dockerRemove(dockerName);
}
