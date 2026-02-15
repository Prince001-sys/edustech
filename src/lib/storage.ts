
// Mock Storage Implementation using Object URLs

export const uploadFile = async (file: File, path: string): Promise<string> => {
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create a local object URL
    // Note: In a real app this would leak memory if not revoked, but for a demo it's fine
    return URL.createObjectURL(file);
};

export const uploadFileResumable = (file: File, path: string) => {
    // Mock upload task
    let progress = 0;
    
    // Return a promise-like object that simulates the Firebase UploadTask
    const task: any = new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            progress += 10;
            if (progress >= 100) {
                clearInterval(interval);
                resolve({ 
                    ref: { fullPath: path },
                    state: 'success',
                    bytesTransferred: file.size,
                    totalBytes: file.size
                });
            }
        }, 200);
    });

    task.cancel = () => {
        // Mock cancellation
        console.log("Upload cancelled");
    };

    task.on = (event: string, onNext: any, onError: any, onComplete: any) => {
        // Simple mock implementation of the 'on' method
        if (event === 'state_changed') {
            // Simulate calling onNext with snapshot
             const interval = setInterval(() => {
                if (progress < 100) {
                     onNext({
                        bytesTransferred: (progress / 100) * file.size,
                        totalBytes: file.size,
                        state: 'running'
                    });
                } else {
                    clearInterval(interval);
                    if (onComplete) onComplete();
                }
            }, 200);
        }
    };
    
    // Add missing then/catch to make it awaitable like the real task
    task.then = (onFulfilled: any, onRejected: any) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ ref: {} }); // Mock snapshot
            }, 2200);
        }).then(onFulfilled, onRejected);
    };

    return task;
};
