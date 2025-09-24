# Living Gold Store Scripts

This directory contains utility scripts for managing and testing the Living Gold Store application.

## Available Scripts

### 1. Set Admin Claims (`set-admin-claims.js`)

**Purpose**: Grant or revoke admin privileges for users in Firebase Authentication.

**Prerequisites**:
- Firebase Admin SDK service account key
- Node.js environment

**Setup**:
1. Download your service account key from Firebase Console
2. Save it as `serviceAccountKey.json` in this directory
3. Ensure it's in `.gitignore` (security!)

**Usage**:
```bash
# First create the script from the documentation
node scripts/set-admin-claims.js
```

### 2. Test Firestore Rules (`test-firestore-rules.js`)

**Purpose**: Comprehensive testing of Firestore security rules to ensure proper access control.

**Features**:
- Tests anonymous access to public collections
- Tests authenticated user permissions
- Tests admin user capabilities
- Validates catch-all deny rules

**Usage**:
```bash
node scripts/test-firestore-rules.js
```

**Test Accounts**:
- Regular user: `test-user@livinggold.com` (password: `testPassword123!`)
- Admin user: `test-admin@livinggold.com` (password: `adminPassword123!`)

**Before Running Tests**:
1. Create the test user accounts in Firebase Auth
2. Set admin claims for the admin test account using the admin script

## Security Notes

⚠️ **IMPORTANT**: Never commit these files to version control:
- `serviceAccountKey.json`
- Any file containing API keys or credentials
- Test user passwords in production code

## Adding New Scripts

When adding new scripts:
1. Document the purpose clearly
2. Include usage examples
3. List any prerequisites
4. Handle errors gracefully
5. Use meaningful console output

## Troubleshooting

**Issue**: "Cannot find module 'firebase/app'"
- Solution: Run `npm install firebase` in the project root

**Issue**: "Permission denied" errors in tests
- Solution: Check that Firestore rules are deployed
- Verify: `firebase deploy --only firestore:rules`

**Issue**: Admin tests failing
- Solution: Ensure admin claims are set for test admin user
- Check: User has signed out/in after claims were set