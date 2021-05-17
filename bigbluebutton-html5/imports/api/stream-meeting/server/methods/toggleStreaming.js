import { startStream } from '../utils/streamDockerUtils';

export default function toggleStreaming(meetingID, streamMedia) {
  console.log(`toggleStreaming with meetingID: ${meetingID} on media: ${streamMedia}`);

  startStream(meetingID, streamMedia);

  return null;
}
