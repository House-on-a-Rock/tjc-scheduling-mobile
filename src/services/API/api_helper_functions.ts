export function timeoutPromise(): Promise<any> {
    return new Promise((resolve, reject) => {
        setTimeout(reject, 3000, new Error('Server timed out, please try again later'));
    });
}
