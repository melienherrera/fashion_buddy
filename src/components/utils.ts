export function getSessionId() {
  let sessionId = localStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = 'user_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('session_id', sessionId);
  }
  return sessionId;
}
