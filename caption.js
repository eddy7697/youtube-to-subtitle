// Imports the Google Cloud client library
const fs = require('fs');
const speech = require('@google-cloud/speech');

// Creates a client
const client = new speech.SpeechClient();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
const gcsUri = 'gs://leaderkid-audio-storage/output.wav';
// const encoding = 'Encoding of the audio file, e.g. LINEAR16';
// const sampleRateHertz = 16000;
// const languageCode = 'BCP-47 language code, e.g. en-US';

const config = {
    enableWordTimeOffsets: true,
    encoding: 'LINEAR16',
    sampleRateHertz: '48000L',
    languageCode: 'cmn-Hant-TW',
    audioChannelCount: 2,
    speechContexts: [{
        phrases: ["隔代教養", "威嚴"]
    }]
};

const audio = {
    uri: gcsUri,
};

const request = {
    config: config,
    audio: audio,
};

async function startCaption() {
    // Detects speech in the audio file. This creates a recognition job that you
    // can wait for now, or get its result later.
    const [operation] = await client.longRunningRecognize(request);

    // Get a Promise representation of the final result of the job
    const [response] = await operation.promise();
    response.results.forEach(result => {
        console.log(`Transcription: ${result.alternatives[0].transcript}`);
        fs.appendFileSync('result.txt', `${result.alternatives[0].transcript}\n\n`);
        // result.alternatives[0].words.forEach(wordInfo => {
        //     // NOTE: If you have a time offset exceeding 2^32 seconds, use the
        //     // wordInfo.{x}Time.seconds.high to calculate seconds.
        //     const startSecs =
        //         `${wordInfo.startTime.seconds}` +
        //         `.` +
        //         wordInfo.startTime.nanos / 100000000;
        //     const endSecs =
        //         `${wordInfo.endTime.seconds}` +
        //         `.` +
        //         wordInfo.endTime.nanos / 100000000;
        //     console.log(`Word: ${wordInfo.word}`);
        //     console.log(`\t ${startSecs} secs - ${endSecs} secs`);
        // });
    });
}

startCaption();
