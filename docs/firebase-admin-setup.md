# Firebase Admin Setup Guide for Living Gold Store

This guide explains how to set up admin users with custom claims for your Living Gold lighting store.

## Overview

The Firestore security rules are configured to recognize admin users through custom claims. Admin users have special privileges:
- Can write to public collections (products, categories, content)
- Can read all user profiles and orders
- Can update/delete any order

## Prerequisites

- Firebase Admin SDK access
- Node.js environment for running admin scripts
- Firebase project owner or editor permissions

## Step 1: Create Admin Script

Create a file `scripts/set-admin-claims.js`:

```javascript
const admin = require('firebase-admin');

// Initialize admin SDK - ensure you have the service account key
const serviceAccount = require('./path-to-service-account-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'studio-4348954439-4c75c'
});

async function setAdminClaim(email) {
  try {
    // Get user by email
    const user = await admin.auth().getUserByEmail(email);
    
    // Set custom user claims
    await admin.auth().setCustomUserClaims(user.uid, { 
      admin: true 
    });
    
    console.log(`Successfully set admin claim for ${email} (UID: ${user.uid})`);
    
    // Force token refresh on next sign in
    await admin.auth().revokeRefreshTokens(user.uid);
    console.log('User tokens revoked - they will need to sign in again');
    
  } catch (error) {
    console.error('Error setting admin claim:', error);
  }
}

// Usage examples:
// setAdminClaim('admin@livinggold.com');
// setAdminClaim('store.manager@livinggold.com');

// To remove admin access:
async function removeAdminClaim(email) {
  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { 
      admin: false 
    });
    console.log(`Admin claim removed for ${email}`);
  } catch (error) {
    console.error('Error removing admin claim:', error);
  }
}

// Export for use in other scripts
module.exports = { setAdminClaim, removeAdminClaim };
```

## Step 2: Get Firebase Service Account Key

1. Go to [Firebase Console](https://console.firebase.google.com/project/studio-4348954439-4c75c/settings/serviceaccounts/adminsdk)
2. Click "Generate new private key"
3. Save the JSON file securely (never commit to git!)
4. Add to `.gitignore`: `**/serviceAccountKey.json`

## Step 3: Client-Side Token Verification

In your Next.js app, create `src/lib/auth-utils.ts`:

```typescript
import { getAuth } from 'firebase/auth';
import { app } from './firebase';

const auth = getAuth(app);

export async function checkAdminStatus(): Promise<boolean> {
  const user = auth.currentUser;
  if (!user) return false;
  
  // Force token refresh to get latest claims
  const idTokenResult = await user.getIdTokenResult(true);
  return idTokenResult.claims.admin === true;
}

export async function refreshUserToken() {
  const user = auth.currentUser;
  if (user) {
    // Force token refresh
    await user.getIdToken(true);
  }
}
```

## Step 4: Create Admin Dashboard Component

Create `src/components/admin/AdminGuard.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkAdminStatus } from '@/lib/auth-utils';

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAdminStatus().then((adminStatus) => {
      if (!adminStatus) {
        router.push('/'); // Redirect non-admins
      } else {
        setIsAdmin(true);
      }
      setLoading(false);
    });
  }, [router]);

  if (loading) return <div>Checking permissions...</div>;
  if (!isAdmin) return null;
  
  return <>{children}</>;
}
```

## Step 5: Running the Admin Script

```bash
# Install firebase-admin if not already installed
npm install firebase-admin

# Run the script
node scripts/set-admin-claims.js
```

## Security Best Practices

1. **Service Account Key Security**:
   - Never commit service account keys to git
   - Store in secure environment variables for production
   - Rotate keys regularly

2. **Admin User Management**:
   - Keep a record of all admin users
   - Regularly audit admin access
   - Remove admin privileges when no longer needed

3. **Token Refresh**:
   - Always force token refresh after changing claims
   - Implement proper error handling for expired tokens

## Testing Admin Access

1. Set admin claim for a test user
2. Have the user sign out and sign in again
3. Check Firestore rules work correctly:
   ```javascript
   // Should succeed for admin
   await addDoc(collection(db, 'products'), {
     name: 'New Chandelier',
     price: 50000
   });
   ```

## Troubleshooting

**Issue**: Admin claim not working
- Solution: Ensure user signed out/in after setting claim
- Check: `await user.getIdTokenResult(true)` to see claims

**Issue**: Cannot set custom claims
- Solution: Verify service account has proper permissions
- Check: Firebase project IAM settings

## Production Deployment

For production, consider using:
- Firebase Functions to set admin claims securely
- Environment variables for service account credentials
- Audit logging for admin actions

## Next Steps

1. Implement admin dashboard at `/admin`
2. Add product management interface
3. Create order management system
4. Set up admin activity logging