# AI Testing Guide for Living Gold Store

## Prerequisites

1. Ensure Node.js and npm are installed
2. Install dependencies if not already done:
   ```bash
   npm install
   ```

## Starting the Development Server

Run the development server on port 9002:
```bash
npm run dev
```

The application will be available at: http://localhost:9002

## Testing the Enhanced AI Consultant

### 1. Accessing the AI Consultant

1. Open http://localhost:9002 in your browser
2. Look for the **floating AI button** (lightbulb icon) in the bottom-right corner
3. Click the button to open the AI Consultant

### 2. Testing Progressive Disclosure

#### A. Welcome Screen
- **Expected**: See welcome screen with AI icon animation
- **Test**: 
  - Verify "AI Lighting Consultant" title
  - Check for two cards: "Quick Search" and "Expert Consultation"
  - Confirm Nigerian market mention in description

#### B. Simple Mode
1. Click "Quick Search" from welcome screen
2. **Test Natural Language Search**:
   - Type: "modern chandelier for living room"
   - Press Enter or click "Get Smart Recommendations"
   - **Expected**: AI thinking animation, then results

3. **Test Quick Filters**:
   - Select "Modern & Contemporary" from Style dropdown
   - Select "Living Room" from Room Type dropdown
   - Click "Get Smart Recommendations"
   - **Expected**: Filtered results based on preferences

4. **Test Intelligence Level**:
   - Watch the progress bar as you add inputs
   - **Expected**: Level increases from 1-5 based on input completeness

#### C. Expert Mode
1. Click "Switch to Expert Mode" from Simple Mode
2. **Test Tabbed Interface**:
   
   **Preferences Tab**:
   - Select "Ultra-Luxury" from Design Style
   - Select "Chandeliers" from Lighting Type
   - Type description: "I need something grand for my mansion"
   
   **Space Details Tab**:
   - Select "Commercial Lobby" from Room/Space Type
   - Select "Hospitality" from Project Type
   
   **Budget Tab**:
   - Enter Min: 500000, Max: 2000000
   - Or click "₦500k - ₦1M" badge
   
3. Click "Get Expert Recommendations"

### 3. Testing Intent Detection

Test different query types to verify intent classification:

#### A. Product Search Intent
- Query: "LED ceiling lights"
- **Expected**: Search results with product grid

#### B. Quote Request Intent
- Query: "I need a quote for office lighting"
- **Expected**: Quote-ready products with "Generate Quote" button

#### C. Expert Consultation Intent
- Query: "Help me design lighting for my restaurant"
- **Expected**: Expert recommendations with consultation advice

#### D. Availability Check Intent
- Query: "Do you have outdoor lights in stock?"
- **Expected**: Products with availability information

### 4. Testing Nigerian Market Intelligence

For each product result, verify:
- **Price**: Shows in Naira (₦) with proper formatting
- **Delivery**: Shows "3-7 days express delivery" for major cities
- **Power**: Shows "Compatible with 220-240V" or similar
- **Segment Badge**: Shows "budget", "mid-range", "premium", or "luxury"

### 5. Testing Results Display

#### A. Product Cards
Each product should show:
- Product image
- Title and description
- Price in Naira
- Delivery time with truck icon
- Power compatibility with zap icon
- Segment badge (top-right)
- AI reason (if from recommendations)

#### B. Results Header
- Intent-based title (Quote-Ready Products, Expert Recommendations, etc.)
- Confidence badge (e.g., "85% Confidence")
- AI suggestions/insights below title
- Market trends badges (if available)

#### C. Action Buttons
Based on intent, verify buttons appear:
- "Generate Quote" (for quote requests)
- "Schedule Consultation" (for expert queries)
- "Share via WhatsApp" (for all results)

### 6. Testing Error Handling

#### A. Empty Query
- Leave all fields empty and try to submit
- **Expected**: Button disabled or error message

#### B. No Results
- Search for: "xyz123nonsense"
- **Expected**: "No products found" message with "Try Different Search" button

#### C. Network Error (Simulate)
- Disconnect internet and try a search
- **Expected**: Error toast notification

### 7. Testing Context Preservation

1. Make a search in Simple Mode
2. Note the "Session: X interactions" indicator
3. Switch to Expert Mode
4. Make another search
5. **Expected**: Session count increases

### 8. Testing Mobile Responsiveness

1. Open browser developer tools (F12)
2. Toggle device toolbar
3. Select mobile device (e.g., iPhone 12)
4. Test all modes
5. **Expected**: 
   - AI consultant opens as drawer from bottom
   - All features work on mobile
   - Touch-friendly interface

## Common Issues & Solutions

### Issue: AI Service Not Responding
- **Check**: Is the Genkit AI service configured correctly?
- **Solution**: Ensure environment variables are set, especially Google AI API key

### Issue: No Products Showing
- **Check**: Are placeholder images loading?
- **Solution**: Check if `src/lib/placeholder-images.json` exists

### Issue: Icons Not Displaying
- **Check**: Are all icons added to the Icons component?
- **Solution**: We've already added missing icons (brain, sparkles, etc.)

## Performance Testing

### Expected Performance Metrics
- Initial load: < 3s
- AI response time: < 2s
- Product render: < 500ms
- Smooth animations throughout

### Check Console
Open browser console (F12) and look for:
- No red errors
- AI intent classification logs
- Performance warnings

## Testing Checklist

- [ ] Welcome screen displays correctly
- [ ] Simple mode search works
- [ ] Expert mode tabs function
- [ ] Natural language queries process
- [ ] Filter dropdowns work
- [ ] Intelligence level updates
- [ ] Nigerian insights display
- [ ] Intent detection works (test all 8 types)
- [ ] Results show appropriate actions
- [ ] Error handling works gracefully
- [ ] Mobile interface responsive
- [ ] Session context persists
- [ ] Performance is acceptable

## Reporting Issues

If you encounter issues:
1. Note the exact steps to reproduce
2. Check browser console for errors
3. Take screenshots if visual issues
4. Note which mode/intent was being tested

## Success Indicators

The implementation is working correctly when:
- ✅ All three modes (Welcome, Simple, Expert) display properly
- ✅ Natural language and structured inputs both work
- ✅ Results include Nigerian market insights
- ✅ Different intents produce different result types
- ✅ UI is responsive and smooth
- ✅ Errors are handled gracefully
- ✅ The experience feels intelligent and helpful