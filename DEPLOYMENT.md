# Deployment Setup

This project uses GitHub Actions to automatically deploy to Firebase App Hosting when code is pushed to the `main` branch.

## Required GitHub Secrets

To enable automatic deployment, you need to set up the following secrets in your GitHub repository:

### 1. Firebase Service Account

1. Go to the [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to **Project Settings** → **Service Accounts**
4. Click **Generate New Private Key**
5. Download the JSON file
6. Copy the entire contents of the JSON file
7. In GitHub, go to **Settings** → **Secrets and Variables** → **Actions**
8. Create a new secret named `FIREBASE_SERVICE_ACCOUNT` and paste the JSON content

### 2. Firebase Project ID

1. In the Firebase Console, note your Project ID
2. Create a GitHub secret named `FIREBASE_PROJECT_ID` with your project ID as the value

### 3. Firebase Configuration (Optional)

If your app requires Firebase client configuration, uncomment and set these secrets in the workflow file:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

You can find these values in your Firebase project settings under **General** → **Your apps** → **Firebase SDK snippet**.

## How it Works

The workflow:

1. **Triggers** on pushes to `main` branch and pull requests
2. **Checks out** your code
3. **Sets up** Node.js 18 with npm caching
4. **Installs** dependencies with `npm ci`
5. **Type checks** your code with `npm run typecheck`
6. **Lints** your code with `npm run lint`
7. **Builds** your application with `npm run build`
8. **Deploys** to Firebase App Hosting using the official Firebase action

## Local Development

For local development, make sure you have:

- Node.js 18+ installed
- Firebase CLI installed: `npm install -g firebase-tools`
- Firebase project initialized: `firebase init hosting`

## Manual Deployment

If you need to deploy manually:

```bash
npm run build
firebase deploy --only hosting
```

## Troubleshooting

1. **Build fails**: Check that all environment variables are properly set
2. **Deployment fails**: Verify that the Firebase service account has the necessary permissions
3. **Environment variables not working**: Make sure they're uncommented in the workflow file and properly set in GitHub secrets

## Security Notes

- Never commit Firebase service account keys to your repository
- Use GitHub secrets for all sensitive configuration
- The `GITHUB_TOKEN` is automatically provided by GitHub Actions