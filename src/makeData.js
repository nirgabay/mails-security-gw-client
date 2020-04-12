import namor from 'namor';
import { v4 as uuidv4 } from 'uuid';

const range = len => {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(i)
    }
    return arr
};

//ID
//Sent Time
//Recipient
//Sender
//Subject
//Categorized As

const newPerson = () => {
    return {
        id: uuidv4(),
        sentTime: new Date().toISOString(),
        recipient: 'recipient@test.com',
        sender: 'sender@test.com',
        subject: 'RPD Spam Test',
        categorizedAs: 'Spam',
    }
};

export default function makeData(...lens) {
    const makeDataLevel = (depth = 0) => {
        const len = lens[depth];
        return range(len).map(() => {
            return {
                ...newPerson(),
                subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
            }
        })
    };

    return makeDataLevel()
}
