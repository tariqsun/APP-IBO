import type { Session, SessionOptions } from '../types';
/**
 * Create a new session, which in its current implementation is a Sentry event
 * that all replays will be saved to as attachments. Currently, we only expect
 * one of these Sentry events per "replay session".
 */
export declare function createSession({ sessionSampleRate, errorSampleRate, stickySession }: SessionOptions): Session;
//# sourceMappingURL=createSession.d.ts.map