import type { Sampled, Session } from '../types';
/**
 * Get a session with defaults & applied sampling.
 */
export declare function makeSession(session: Partial<Session> & {
    sampled: Sampled;
}): Session;
/**
 * Get the sampled status for a session based on sample rates & current sampled status.
 */
export declare function getSessionSampleType(sessionSampleRate: number, errorSampleRate: number): Sampled;
//# sourceMappingURL=Session.d.ts.map