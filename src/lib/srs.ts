/**
 * Spaced Repetition System (SRS) Utility
 * Based on the SuperMemo-2 (SM-2) algorithm.
 */

export interface SRSResult {
    interval: number;
    easeFactor: number;
    repetition: number;
    nextReviewDate: Date;
}

/**
 * Calculates new SRS parameters based on user performance.
 * @param quality 0-5 (0: total blackout, 5: perfect response)
 * @param prevInterval current interval in days
 * @param prevEaseFactor current ease factor
 * @param prevRepetition current number of successful repetitions
 */
export function calculateSRS(
    quality: number,
    prevInterval: number,
    prevEaseFactor: number,
    prevRepetition: number
): SRSResult {
    let interval: number;
    let easeFactor: number;
    let repetition: number;

    if (quality >= 3) {
        // Correct response
        if (prevRepetition === 0) {
            interval = 1;
        } else if (prevRepetition === 1) {
            interval = 6;
        } else {
            interval = Math.round(prevInterval * prevEaseFactor);
        }
        repetition = prevRepetition + 1;
    } else {
        // Incorrect response
        repetition = 0;
        interval = 1;
    }

    // Ease factor calculation: EF'=EF+(0.1-(5-q)*(0.08+(5-q)*0.02))
    easeFactor = prevEaseFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    
    // Ease factor shouldn't fall below 1.3
    if (easeFactor < 1.3) easeFactor = 1.3;

    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + interval);

    return {
        interval,
        easeFactor,
        repetition,
        nextReviewDate
    };
}

/**
 * Maps simple feedback string to SM-2 quality score.
 */
export function feedbackToQuality(feedback: 'hard' | 'good' | 'easy'): number {
    switch (feedback) {
        case 'hard': return 2; // Hard: incorrect but recognizable or very hard
        case 'good': return 4; // Good: correct with some hesitation
        case 'easy': return 5; // Easy: perfect response
        default: return 3;
    }
}
