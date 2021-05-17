import { Meteor } from 'meteor/meteor';
import startStreaming from './methods/startStreaming';
import toggleStreaming from './methods/toggleStreaming';
import pauseStreaming from './methods/pauseStreaming';
import endStreaming from './methods/endStreaming';

Meteor.methods({
  startStreaming,
  toggleStreaming,
  pauseStreaming,
  endStreaming,
});
