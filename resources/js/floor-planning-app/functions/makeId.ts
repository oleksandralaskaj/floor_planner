
export const makeId = () => {
    let result = '';
    if (self.crypto.randomUUID) {
        result = self.crypto.randomUUID()
    } else {
        //dev mode purposes
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 6; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
    }
    return result;
}
