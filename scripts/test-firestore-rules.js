/**
 * Firestore Security Rules Test Script
 * Tests the security rules for the Living Gold Store
 * 
 * Usage: node scripts/test-firestore-rules.js
 */

const { initializeApp } = require('firebase/app');
const { 
  getAuth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut 
} = require('firebase/auth');
const { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  addDoc,
  collection,
  updateDoc,
  deleteDoc 
} = require('firebase/firestore');

// Firebase config
const firebaseConfig = {
  projectId: "studio-4348954439-4c75c",
  appId: "1:399935237992:web:37dfc560f67b747720f0dd",
  apiKey: "AIzaSyD2_tIV4q4sCsyAamp95GKG4oC0ga29lXw",
  authDomain: "studio-4348954439-4c75c.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "399935237992"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Test results collector
const testResults = {
  passed: 0,
  failed: 0,
  tests: []
};

// Helper function to run a test
async function runTest(testName, testFn, shouldPass = true) {
  try {
    await testFn();
    if (shouldPass) {
      testResults.passed++;
      testResults.tests.push({ name: testName, status: 'PASSED', expected: 'Success' });
      console.log(`✅ ${testName}: PASSED`);
    } else {
      testResults.failed++;
      testResults.tests.push({ name: testName, status: 'FAILED', expected: 'Should have thrown error' });
      console.log(`❌ ${testName}: FAILED (Expected to throw error)`);
    }
  } catch (error) {
    if (!shouldPass) {
      testResults.passed++;
      testResults.tests.push({ name: testName, status: 'PASSED', expected: 'Error thrown as expected' });
      console.log(`✅ ${testName}: PASSED (Error thrown as expected)`);
    } else {
      testResults.failed++;
      testResults.tests.push({ name: testName, status: 'FAILED', error: error.message });
      console.log(`❌ ${testName}: FAILED - ${error.message}`);
    }
  }
}

// Test user credentials (you'll need to create these users)
const TEST_USER = {
  email: 'test-user@livinggold.com',
  password: 'testPassword123!'
};

const TEST_ADMIN = {
  email: 'test-admin@livinggold.com',
  password: 'adminPassword123!'
};

async function runAllTests() {
  console.log('🧪 Starting Firestore Security Rules Tests...\n');
  
  // Test 1: Anonymous access to public collections
  console.log('📋 Testing public read access...');
  await signOut(auth);
  
  await runTest('Anonymous can read products', async () => {
    const productRef = doc(db, 'products', 'test-product');
    await getDoc(productRef);
  });
  
  await runTest('Anonymous can read categories', async () => {
    const categoryRef = doc(db, 'categories', 'test-category');
    await getDoc(categoryRef);
  });
  
  await runTest('Anonymous can read content', async () => {
    const contentRef = doc(db, 'content', 'test-content');
    await getDoc(contentRef);
  });
  
  await runTest('Anonymous cannot write to products', async () => {
    const productRef = doc(db, 'products', 'test-product-2');
    await setDoc(productRef, { name: 'Test Product' });
  }, false);
  
  // Test 2: Regular user access
  console.log('\n📋 Testing regular user access...');
  
  // Create or sign in test user
  try {
    await createUserWithEmailAndPassword(auth, TEST_USER.email, TEST_USER.password);
    console.log('Created test user');
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      await signInWithEmailAndPassword(auth, TEST_USER.email, TEST_USER.password);
      console.log('Signed in test user');
    } else {
      throw error;
    }
  }
  
  const userId = auth.currentUser.uid;
  
  await runTest('User can create their own profile', async () => {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, { 
      email: TEST_USER.email,
      createdAt: new Date()
    });
  });
  
  await runTest('User can read their own profile', async () => {
    const userRef = doc(db, 'users', userId);
    await getDoc(userRef);
  });
  
  await runTest('User cannot read other user profiles', async () => {
    const otherUserRef = doc(db, 'users', 'other-user-id');
    await getDoc(otherUserRef);
  }, false);
  
  await runTest('User can create their own cart', async () => {
    const cartRef = doc(db, 'users', userId, 'carts', 'test-cart');
    await setDoc(cartRef, { 
      items: [],
      createdAt: new Date()
    });
  });
  
  await runTest('User can create their own order', async () => {
    const orderRef = await addDoc(collection(db, 'users', userId, 'orders'), {
      items: [],
      total: 0,
      createdAt: new Date()
    });
  });
  
  await runTest('User cannot update their own order', async () => {
    const orderRef = doc(db, 'users', userId, 'orders', 'test-order');
    await updateDoc(orderRef, { status: 'completed' });
  }, false);
  
  // Test 3: Admin access
  console.log('\n📋 Testing admin access...');
  console.log('⚠️  Note: Admin tests will fail unless you have set admin claims for the test admin user');
  
  // Sign in as admin (assuming admin claims are already set)
  try {
    await signInWithEmailAndPassword(auth, TEST_ADMIN.email, TEST_ADMIN.password);
    console.log('Signed in admin user');
  } catch (error) {
    console.log('⚠️  Could not sign in admin user. Admin tests will be skipped.');
    console.log('   To run admin tests, create the admin user and set admin claims first.');
  }
  
  if (auth.currentUser?.email === TEST_ADMIN.email) {
    await runTest('Admin can write to products', async () => {
      const productRef = doc(db, 'products', 'admin-test-product');
      await setDoc(productRef, { 
        name: 'Admin Test Product',
        price: 100000
      });
    });
    
    await runTest('Admin can update categories', async () => {
      const categoryRef = doc(db, 'categories', 'test-category');
      await setDoc(categoryRef, { name: 'Updated Category' });
    });
    
    await runTest('Admin can read any user profile', async () => {
      const userRef = doc(db, 'users', userId);
      await getDoc(userRef);
    });
    
    await runTest('Admin can update any order', async () => {
      const orderRef = doc(db, 'users', userId, 'orders', 'test-order');
      await setDoc(orderRef, { status: 'processing' });
    });
  }
  
  // Test 4: Catch-all rule
  console.log('\n📋 Testing catch-all deny rule...');
  
  await runTest('Cannot access unknown collection', async () => {
    const unknownRef = doc(db, 'unknown-collection', 'test-doc');
    await getDoc(unknownRef);
  }, false);
  
  // Summary
  console.log('\n📊 Test Summary:');
  console.log(`Total Tests: ${testResults.passed + testResults.failed}`);
  console.log(`Passed: ${testResults.passed}`);
  console.log(`Failed: ${testResults.failed}`);
  
  if (testResults.failed > 0) {
    console.log('\nFailed Tests:');
    testResults.tests
      .filter(t => t.status === 'FAILED')
      .forEach(t => console.log(`  - ${t.name}: ${t.error || t.expected}`));
  }
  
  // Clean up
  await signOut(auth);
  console.log('\n✨ Testing complete!');
  
  process.exit(testResults.failed > 0 ? 1 : 0);
}

// Run tests
runAllTests().catch(error => {
  console.error('Fatal error running tests:', error);
  process.exit(1);
});