let assert = require('assert');
const {
    processSequence
} = require('../src/service/api');

describe('test process sequence call', () => {
    it('fetch processed seq', async () => {

        const seqList = [
            {
                duration: 17530,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 0,
                seq_no: 1
            },
            {
                duration: 35,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 256,
                seq_no: 2
            },
            {
                duration: 35,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 230,
                seq_no: 3
            },
            {
                duration: 35,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 205,
                seq_no: 4
            },
            {
                duration: 35,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 192,
                seq_no: 5
            },
            {
                duration: 35,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 179,
                seq_no: 6
            },
            {
                duration: 35,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 166,
                seq_no: 7
            },
            {
                duration: 35,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 154,
                seq_no: 8
            },
            {
                duration: 35,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 128,
                seq_no: 9
            },
            {
                duration: 35,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 115,
                seq_no: 10
            },
            {
                duration: 35,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 102,
                seq_no: 11
            },
            {
                duration: 35,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 90,
                seq_no: 12
            },
            {
                duration: 35,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 77,
                seq_no: 13
            },
            {
                duration: 35,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 64,
                seq_no: 14
            },
            {
                duration: 35,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 51,
                seq_no: 15
            },
            {
                duration: 35,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 38,
                seq_no: 16
            },
            {
                duration: 35,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 26,
                seq_no: 17
            },
            {
                duration: 35,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 13,
                seq_no: 18
            },
            {
                duration: 35,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 0,
                seq_no: 19
            },
            {
                duration: 35,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 0,
                seq_no: 20
            },
            {
                duration: 35,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 0,
                seq_no: 21
            },
            {
                duration: 26,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 256,
                seq_no: 22
            },
            {
                duration: 26,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 230,
                seq_no: 23
            },
            {
                duration: 26,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 205,
                seq_no: 24
            },
            {
                duration: 26,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 192,
                seq_no: 25
            },
            {
                duration: 26,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 179,
                seq_no: 26
            },
            {
                duration: 26,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 166,
                seq_no: 27
            },
            {
                duration: 26,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 154,
                seq_no: 28
            },
            {
                duration: 26,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 128,
                seq_no: 29
            },
            {
                duration: 26,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 115,
                seq_no: 30
            },
            {
                duration: 26,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 102,
                seq_no: 31
            },
            {
                duration: 26,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 90,
                seq_no: 32
            },
            {
                duration: 26,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 77,
                seq_no: 33
            },
            {
                duration: 26,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 64,
                seq_no: 34
            },
            {
                duration: 26,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 51,
                seq_no: 35
            },
            {
                duration: 26,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 38,
                seq_no: 36
            },
            {
                duration: 26,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 26,
                seq_no: 37
            },
            {
                duration: 26,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 13,
                seq_no: 38
            },
            {
                duration: 26,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 0,
                seq_no: 39
            },
            {
                duration: 26,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 0,
                seq_no: 40
            },
            {
                duration: 36,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 0,
                seq_no: 41
            },
            {
                duration: 180,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 128,
                seq_no: 42
            },
            {
                duration: 180,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 192,
                seq_no: 43
            },
            {
                duration: 340,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 256,
                seq_no: 44
            },
            {
                duration: 350,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 38,
                seq_no: 45
            },
            {
                duration: 530,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 128,
                seq_no: 46
            },
            {
                duration: 35,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 256,
                seq_no: 47
            },
            {
                duration: 35,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 230,
                seq_no: 48
            },
            {
                duration: 35,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 205,
                seq_no: 49
            },
            {
                duration: 35,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 192,
                seq_no: 50
            },
            {
                duration: 35,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 179,
                seq_no: 51
            },
            {
                duration: 35,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 166,
                seq_no: 52
            },
            {
                duration: 35,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 154,
                seq_no: 53
            },
            {
                duration: 35,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 128,
                seq_no: 54
            },
            {
                duration: 35,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 115,
                seq_no: 55
            },
            {
                duration: 35,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 102,
                seq_no: 56
            },
            {
                duration: 35,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 90,
                seq_no: 57
            },
            {
                duration: 35,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 77,
                seq_no: 58
            },
            {
                duration: 35,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 64,
                seq_no: 59
            },
            {
                duration: 35,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 51,
                seq_no: 60
            },
            {
                duration: 35,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 38,
                seq_no: 61
            },
            {
                duration: 35,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 26,
                seq_no: 62
            },
            {
                duration: 35,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 13,
                seq_no: 63
            },
            {
                duration: 35,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 0,
                seq_no: 64
            },
            {
                duration: 35,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 0,
                seq_no: 65
            },
            {
                duration: 35,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 0,
                seq_no: 66
            },
            {
                duration: 26,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 256,
                seq_no: 67
            },
            {
                duration: 26,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 230,
                seq_no: 68
            },
            {
                duration: 26,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 205,
                seq_no: 69
            },
            {
                duration: 26,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 192,
                seq_no: 70
            },
            {
                duration: 26,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 179,
                seq_no: 71
            },
            {
                duration: 26,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 166,
                seq_no: 72
            },
            {
                duration: 26,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 154,
                seq_no: 73
            },
            {
                duration: 26,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 128,
                seq_no: 74
            },
            {
                duration: 26,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 115,
                seq_no: 75
            },
            {
                duration: 26,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 102,
                seq_no: 76
            },
            {
                duration: 26,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 90,
                seq_no: 77
            },
            {
                duration: 26,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 77,
                seq_no: 78
            },
            {
                duration: 26,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 64,
                seq_no: 79
            },
            {
                duration: 26,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 51,
                seq_no: 80
            },
            {
                duration: 26,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 38,
                seq_no: 81
            },
            {
                duration: 26,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 26,
                seq_no: 82
            },
            {
                duration: 26,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 13,
                seq_no: 83
            },
            {
                duration: 26,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 0,
                seq_no: 84
            },
            {
                duration: 26,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 0,
                seq_no: 84
            },
            {
                duration: 36,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 0,
                seq_no: 85
            },
            {
                duration: 180,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 128,
                seq_no: 86
            },
            {
                duration: 180,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 192,
                seq_no: 87
            },
            {
                duration: 340,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 256,
                seq_no: 88
            },
            {
                duration: 350,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 38,
                seq_no: 89
            },
            {
                duration: 530,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 128,
                seq_no: 90
            },
            {
                duration: 180,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 256,
                seq_no: 91
            },
            {
                duration: 340,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 192,
                seq_no: 92
            },
            {
                duration: 360,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 128,
                seq_no: 93
            },
            {
                duration: 520,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 26,
                seq_no: 93
            },
            {
                duration: 180,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 256,
                seq_no: 93
            },
            {
                duration: 340,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 26,
                seq_no: 94
            },
            {
                duration: 360,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 128,
                seq_no: 94
            },
            {
                duration: 340,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 26,
                seq_no: 94
            },
            {
                duration: 111,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 256,
                seq_no: 95
            },
            {
                duration: 111,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 230,
                seq_no: 96
            },
            {
                duration: 111,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 205,
                seq_no: 97
            },
            {
                duration: 111,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 192,
                seq_no: 98
            },
            {
                duration: 111,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 179,
                seq_no: 99
            },
            {
                duration: 111,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 166,
                seq_no: 100
            },
            {
                duration: 111,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 154,
                seq_no: 101
            },
            {
                duration: 111,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 128,
                seq_no: 102
            },
            {
                duration: 111,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 115,
                seq_no: 103
            },
            {
                duration: 111,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 102,
                seq_no: 104
            },
            {
                duration: 111,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 90,
                seq_no: 105
            },
            {
                duration: 111,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 77,
                seq_no: 106
            },
            {
                duration: 111,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 64,
                seq_no: 107
            },
            {
                duration: 111,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 51,
                seq_no: 108
            },
            {
                duration: 111,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 38,
                seq_no: 109
            },
            {
                duration: 111,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 26,
                seq_no: 110
            },
            {
                duration: 111,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 13,
                seq_no: 111
            },
            {
                duration: 111,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 0,
                seq_no: 112
            },
            {
                duration: 111,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 0,
                seq_no: 113
            },
            {
                duration: 121,
                entry_name: "",
                entry_type: 0,
                extra_data: "",
                repeat_count: 1,
                value: 0,
                seq_no: 114
            }
        ];
        const res = await processSequence(seqList);

        assert.notStrictEqual(res, undefined);

    });

});
