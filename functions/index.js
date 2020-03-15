const admin = require('firebase-admin');
const functions = require('firebase-functions');

const app = require('express')();
const cors = require('cors');
app.use(cors());

admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

app.post('/v1/sequence_list', async (req, res) => {
    console.log('request received to process and return sequence list');

    try {
        const sequenceList = req.body.payload;
        if (sequenceList && sequenceList.length > 0) {
            const processedList = processSeqList(sequenceList);
            const payload = {
                list: processedList
            };
            console.log('returning processed seq list');
            return res.status(200).send(payload);

        } else {
            return res.status(400).json({ error: "request payload should contain a list of sequence data" });
        }

    } catch (e) {
        console.error('an error occurred', e);
        return res.status(500).json({ error: "oops! something went wrong" });
    }

});

processSeqList = (sequenceList) => {
    const playbackSequence = [];
    let timeout = 0;
    sequenceList.forEach((detail, i) => {
        const errors = validateRequestPayload(detail);
        if (errors.length === 0) {
            const durationInMillis = parseInt(detail.duration) * parseInt(detail.repeat_count);
            if (i === 0)  {
                timeout = durationInMillis;
            } else {
                timeout += durationInMillis;
            }

            const color_level = parseInt(detail.value);
            const color = 'rgb(0, 0, ' + (255 / 100) * color_level + ')';
            const payload = {
                timeout: timeout,
                color: color
            };
            playbackSequence.push(payload);

        } else {
            console.error('sequence info errors: ', errors);
        }
    });

    const endTime = (timeout + 10);
    const endPayload = {
        timeout: endTime,
        color: 'rgb(243, 246, 249)'
    };
    playbackSequence.push(endPayload);

    return playbackSequence;
};

validateRequestPayload = (payload) => {
    const errors = [];
    if (!payload.hasOwnProperty('duration')) {
        const errorMsg = 'request body should contain duration field';
        console.error(errorMsg);
        errors.push(errorMsg);
    }
    if (!payload.hasOwnProperty('repeat_count')) {
        const errorMsg = 'request body should contain repeat_count field';
        console.error(errorMsg);
        errors.push(errorMsg);
    }

    return errors;
};

exports.api = functions.https.onRequest(app);
