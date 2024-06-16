import { Comment_ } from "../interfaces/UserImageContent";

function getRandomComment(): string {
    const possibleComments = [
        'Nice photo!',
        'Great upload!',
        'Love it! 😍',
        'Awesome!',
        'Cool picture!',
        'Cool! 💪',
        '😭😭😭😭😭😭',
        '😎',

    ];

    return possibleComments[Math.floor(Math.random() * possibleComments.length)];
}

function generateRandomString(length: number = (Math.random() * 10 + 3)): string {
    const characters = 'abcdefghijklmnopqrstuvwxyz' +
                       'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
                       '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}


function userImageContentMock(i: number) {
    const randomComments: Comment_[] = Array.from({ length: Math.floor(Math.random() * 4) }, (_, idx) => ({
        id: idx,
        userName: generateRandomString(),
        content: getRandomComment(),
    }));

    return {
        id: i,
        userName: `user_${i}`,
        imageUri: '/no-image.jpg',
        comments: randomComments,
    };
}

export default userImageContentMock;