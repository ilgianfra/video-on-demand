import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyB2egNxEG8QldQbPMPTBUyVahxR4ejZqgM',
  authDomain: 'video-on-demand-3da58.firebaseapp.com',
  databaseURL: 'https://video-on-demand-3da58.firebaseio.com',
  projectId: 'video-on-demand-3da58',
  messagingSenderId: '23242520699',
};
firebase.initializeApp(config);
const database = firebase.database();

export const getCounter = () => database.ref('video').once('value');

export const addCounterVideo = (id, count) => {
  database.ref(`video/ ${id}`).set({
    id,
    count,
  });
};
