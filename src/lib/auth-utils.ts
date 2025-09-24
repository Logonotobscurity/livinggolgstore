import { getAuth } from 'firebase/auth';
import { app } from './firebase';

const auth = getAuth(app);

/**
 * Check if the current user has admin privileges
 * @returns Promise<boolean> - true if user is admin, false otherwise
 */
export async function checkAdminStatus(): Promise<boolean> {
  const user = auth.currentUser;
  if (!user) return false;
  
  try {
    // Force token refresh to get latest claims
    const idTokenResult = await user.getIdTokenResult(true);
    return idTokenResult.claims.admin === true;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

/**
 * Force refresh of the current user's ID token
 * Useful after admin claims have been updated
 */
export async function refreshUserToken(): Promise<void> {
  const user = auth.currentUser;
  if (user) {
    try {
      // Force token refresh
      await user.getIdToken(true);
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  }
}

/**
 * Get the current user's custom claims
 * @returns Promise<any> - User's custom claims object
 */
export async function getUserClaims(): Promise<any> {
  const user = auth.currentUser;
  if (!user) return null;
  
  try {
    const idTokenResult = await user.getIdTokenResult();
    return idTokenResult.claims;
  } catch (error) {
    console.error('Error getting user claims:', error);
    return null;
  }
}

/**
 * Check if user is authenticated
 * @returns boolean - true if user is signed in
 */
export function isAuthenticated(): boolean {
  return !!auth.currentUser;
}

/**
 * Get current user's UID
 * @returns string | null - User's UID or null if not authenticated
 */
export function getCurrentUserUid(): string | null {
  return auth.currentUser?.uid || null;
}