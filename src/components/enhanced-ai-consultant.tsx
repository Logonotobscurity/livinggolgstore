'use client';

import { useState, useTransition, useEffect, useCallback } from 'react';
import { processUnifiedAI, type UnifiedAIResponse } from '@/ai/unified-ai-service';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from './ui/button';
import { Icons } from './icons';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Separator } from './ui/separator';

interface EnhancedAIConsultantProps {
  onResults?: (results: UnifiedAIResponse) => void;
  initialMode?: 'simple' | 'expert';
}

// Progressive disclosure states
type ConsultantMode = 'welcome' | 'simple' | 'expert' | 'results';

export function EnhancedAIConsultant({ onResults, initialMode = 'simple' }: EnhancedAIConsultantProps) {
  const [isPending, startTransition] = useTransition();
  const [mode, setMode] = useState<ConsultantMode>('welcome');
  const [response, setResponse] = useState<UnifiedAIResponse | null>(null);
  const [sessionId] = useState(() => `session-${Date.now()}`);
  const [conversationHistory, setConversationHistory] = useState<string[]>([]);
  const { toast } = useToast();
  
  // Form state
  const [query, setQuery] = useState('');
  const [preferences, setPreferences] = useState({
    style: '',
    roomType: '',
    category: '',
    budget: { min: 0, max: 0 },
  });
  const [projectType, setProjectType] = useState<'residential' | 'commercial' | 'hospitality'>('residential');
  
  // Intelligence level indicator
  const [intelligenceLevel, setIntelligenceLevel] = useState(1);
  
  useEffect(() => {
    // Calculate intelligence level based on input completeness
    let level = 1;
    if (query || preferences.category) level++;
    if (preferences.style && preferences.roomType) level++;
    if (preferences.budget.max > 0) level++;
    if (mode === 'expert') level++;
    setIntelligenceLevel(Math.min(level, 5));
  }, [query, preferences, mode]);
  
  const handleSubmit = useCallback(async () => {
    startTransition(async () => {
      try {
        const result = await processUnifiedAI({
          query,
          preferences: preferences.budget.max > 0 ? preferences : 
            { ...preferences, budget: undefined },
          sessionId,
          mode: mode === 'expert' ? 'expert' : 'simple',
          projectType,
          location: 'Nigeria',
        });
        
        setResponse(result);
        setMode('results');
        
        // Update conversation history
        setConversationHistory(prev => [
          ...prev,
          query || `${preferences.style} ${preferences.roomType} ${preferences.category}`.trim()
        ]);
        
        if (onResults) {
          onResults(result);
        }
        
        // Show appropriate toast based on intent
        if (result.intent === 'request_quote' && result.products?.length) {
          toast({
            title: 'Quote Ready',
            description: 'Select products to generate your quote',
            action: <Button size="sm">View Cart</Button>
          });
        }
        
      } catch (error) {
        console.error('AI Consultant error:', error);
        toast({
          title: 'Error',
          description: 'Failed to get AI recommendations. Please try again.',
          variant: 'destructive'
        });
      }
    });
  }, [query, preferences, mode, projectType, sessionId, onResults, toast]);
  
  const renderWelcomeScreen = () => (
    <div className="text-center space-y-6 py-8">
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 bg-gradient-to-r from-primary/20 to-primary/5 rounded-full blur-3xl" />
        </div>
        <Icons.lightbulb className="relative mx-auto h-16 w-16 text-primary animate-pulse" />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-3xl font-headline font-bold">AI Lighting Consultant</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          I'm your intelligent lighting advisor, specialized in the Nigerian luxury market. 
          Let me help you find the perfect lighting for your space.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
        <Card 
          className="cursor-pointer hover:border-primary transition-colors"
          onClick={() => setMode('simple')}
        >
          <CardHeader>
            <CardTitle className="text-lg">Quick Search</CardTitle>
            <CardDescription>Get instant recommendations</CardDescription>
          </CardHeader>
        </Card>
        
        <Card 
          className="cursor-pointer hover:border-primary transition-colors"
          onClick={() => setMode('expert')}
        >
          <CardHeader>
            <CardTitle className="text-lg">Expert Consultation</CardTitle>
            <CardDescription>Detailed lighting design help</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
  
  const renderSimpleMode = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-headline">What are you looking for?</h3>
        <p className="text-sm text-muted-foreground">
          Select your preferences or type what you need
        </p>
      </div>
      
      <div className="space-y-4">
        {/* Natural language input */}
        <div className="relative">
          <Icons.search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="e.g., 'Modern chandelier for living room' or 'Outdoor lights'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary"
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          />
        </div>
        
        <div className="relative">
          <Separator className="my-4" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
            OR USE FILTERS
          </span>
        </div>
        
        {/* Quick filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Select onValueChange={(value) => setPreferences({...preferences, style: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select Style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="modern">Modern & Contemporary</SelectItem>
              <SelectItem value="traditional">Traditional & Classic</SelectItem>
              <SelectItem value="minimalist">Minimalist & Clean</SelectItem>
              <SelectItem value="luxury">Ultra-Luxury</SelectItem>
              <SelectItem value="industrial">Industrial Chic</SelectItem>
              <SelectItem value="african-inspired">African-Inspired</SelectItem>
            </SelectContent>
          </Select>
          
          <Select onValueChange={(value) => setPreferences({...preferences, roomType: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Room Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="living-room">Living Room</SelectItem>
              <SelectItem value="bedroom">Bedroom</SelectItem>
              <SelectItem value="dining-room">Dining Room</SelectItem>
              <SelectItem value="kitchen">Kitchen</SelectItem>
              <SelectItem value="office">Office/Study</SelectItem>
              <SelectItem value="outdoor">Outdoor Spaces</SelectItem>
              <SelectItem value="commercial">Commercial Space</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Intelligence indicator */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">AI Intelligence Level</span>
          <div className="flex items-center gap-2">
            <Progress value={intelligenceLevel * 20} className="w-24 h-2" />
            <span className="font-medium">{intelligenceLevel}/5</span>
          </div>
        </div>
      </div>
      
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={() => setMode('expert')}
          className="flex-1"
        >
          <Icons.sparkles className="mr-2 h-4 w-4" />
          Switch to Expert Mode
        </Button>
        
        <Button
          onClick={handleSubmit}
          disabled={isPending || (!query && !preferences.style && !preferences.roomType)}
          className="flex-1"
        >
          {isPending ? (
            <>
              <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
              AI Thinking...
            </>
          ) : (
            <>
              <Icons.brain className="mr-2 h-4 w-4" />
              Get Smart Recommendations
            </>
          )}
        </Button>
      </div>
    </div>
  );
  
  const renderExpertMode = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <h3 className="text-2xl font-headline">Expert Consultation Mode</h3>
          <Badge variant="secondary" className="animate-pulse">
            <Icons.sparkles className="mr-1 h-3 w-3" />
            Advanced AI
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Get personalized lighting design recommendations for your project
        </p>
      </div>
      
      <Tabs defaultValue="preferences" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="space">Space Details</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
        </TabsList>
        
        <TabsContent value="preferences" className="space-y-4">
          <Select value={preferences.style} onValueChange={(value) => setPreferences({...preferences, style: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Design Style *" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="modern">Modern & Contemporary</SelectItem>
              <SelectItem value="traditional">Traditional & Classic</SelectItem>
              <SelectItem value="minimalist">Minimalist & Clean</SelectItem>
              <SelectItem value="luxury">Ultra-Luxury</SelectItem>
              <SelectItem value="industrial">Industrial Chic</SelectItem>
              <SelectItem value="african-inspired">African-Inspired</SelectItem>
              <SelectItem value="eclectic">Eclectic Mix</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={preferences.category} onValueChange={(value) => setPreferences({...preferences, category: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Lighting Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="chandelier">Chandeliers</SelectItem>
              <SelectItem value="pendant">Pendant Lights</SelectItem>
              <SelectItem value="wall-sconce">Wall Sconces</SelectItem>
              <SelectItem value="table-lamp">Table Lamps</SelectItem>
              <SelectItem value="floor-lamp">Floor Lamps</SelectItem>
              <SelectItem value="ceiling-light">Ceiling Lights</SelectItem>
              <SelectItem value="outdoor">Outdoor Lighting</SelectItem>
              <SelectItem value="smart">Smart Lighting</SelectItem>
            </SelectContent>
          </Select>
          
          <textarea
            placeholder="Describe your vision or specific requirements..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-3 border rounded-lg h-24 resize-none"
          />
        </TabsContent>
        
        <TabsContent value="space" className="space-y-4">
          <Select value={preferences.roomType} onValueChange={(value) => setPreferences({...preferences, roomType: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Room/Space Type *" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="living-room">Living Room</SelectItem>
              <SelectItem value="master-bedroom">Master Bedroom</SelectItem>
              <SelectItem value="dining-room">Dining Room</SelectItem>
              <SelectItem value="kitchen">Kitchen</SelectItem>
              <SelectItem value="home-office">Home Office</SelectItem>
              <SelectItem value="outdoor-patio">Outdoor Patio</SelectItem>
              <SelectItem value="commercial-lobby">Commercial Lobby</SelectItem>
              <SelectItem value="restaurant">Restaurant</SelectItem>
              <SelectItem value="hotel-suite">Hotel Suite</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={projectType} onValueChange={(value: any) => setProjectType(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Project Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="hospitality">Hospitality</SelectItem>
            </SelectContent>
          </Select>
        </TabsContent>
        
        <TabsContent value="budget" className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Budget Range (₦)</label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="number"
                  placeholder="Min (optional)"
                  onChange={(e) => setPreferences({
                    ...preferences, 
                    budget: { ...preferences.budget, min: parseInt(e.target.value) || 0 }
                  })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Max (optional)"
                  onChange={(e) => setPreferences({
                    ...preferences, 
                    budget: { ...preferences.budget, max: parseInt(e.target.value) || 0 }
                  })}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </div>
          
          {/* Quick budget ranges */}
          <div className="flex flex-wrap gap-2">
            <Badge 
              variant="outline" 
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              onClick={() => setPreferences({...preferences, budget: { min: 0, max: 100000 }})}
            >
              Under ₦100k
            </Badge>
            <Badge 
              variant="outline" 
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              onClick={() => setPreferences({...preferences, budget: { min: 100000, max: 500000 }})}
            >
              ₦100k - ₦500k
            </Badge>
            <Badge 
              variant="outline" 
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              onClick={() => setPreferences({...preferences, budget: { min: 500000, max: 1000000 }})}
            >
              ₦500k - ₦1M
            </Badge>
            <Badge 
              variant="outline" 
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              onClick={() => setPreferences({...preferences, budget: { min: 1000000, max: 0 }})}
            >
              Over ₦1M
            </Badge>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={() => setMode('simple')}
        >
          <Icons.arrowLeft className="mr-2 h-4 w-4" />
          Simple Mode
        </Button>
        
        <Button
          onClick={handleSubmit}
          disabled={isPending}
          className="flex-1"
        >
          {isPending ? (
            <>
              <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
              Expert Analysis in Progress...
            </>
          ) : (
            <>
              <Icons.sparkles className="mr-2 h-4 w-4" />
              Get Expert Recommendations
            </>
          )}
        </Button>
      </div>
    </div>
  );
  
  const renderResults = () => {
    if (!response) return null;
    
    const products = response.products || response.recommendations || [];
    
    return (
      <div className="space-y-6">
        {/* Results header with intent */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <h3 className="text-2xl font-headline">
              {response.intent === 'request_quote' ? 'Quote-Ready Products' :
               response.intent === 'expert_consultation' ? 'Expert Recommendations' :
               response.intent === 'get_recommendation' ? 'Personalized Suggestions' :
               'Search Results'}
            </h3>
            <Badge variant="secondary">
              <Icons.brain className="mr-1 h-3 w-3" />
              {Math.round(response.confidence * 100)}% Confidence
            </Badge>
          </div>
          
          {/* Insights */}
          {response.insights && response.insights.suggestions && (
            <div className="max-w-2xl mx-auto">
              {response.insights.suggestions.map((suggestion, idx) => (
                <p key={idx} className="text-sm text-muted-foreground">
                  {suggestion}
                </p>
              ))}
            </div>
          )}
          
          {/* Market trends */}
          {response.insights?.marketTrends && (
            <div className="flex flex-wrap gap-2 justify-center mt-3">
              {response.insights.marketTrends.map((trend, idx) => (
                <Badge key={idx} variant="outline">
                  <Icons.trendingUp className="mr-1 h-3 w-3" />
                  {trend}
                </Badge>
              ))}
            </div>
          )}
        </div>
        
        {/* Products grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
            {products.map((product: any) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <Link href={`/products/${product.slug}`}>
                  <div className="aspect-square relative bg-secondary">
                    <Image
                      src={product.imageUrl}
                      alt={product.title || product.name || ''}
                      fill
                      className="object-contain p-4"
                    />
                    {product.priceAnalysis && (
                      <Badge 
                        className="absolute top-2 right-2"
                        variant={product.priceAnalysis.segment === 'luxury' ? 'default' : 'secondary'}
                      >
                        {product.priceAnalysis.segment}
                      </Badge>
                    )}
                  </div>
                </Link>
                
                <CardContent className="p-4">
                  <h4 className="font-semibold line-clamp-1">{product.title || product.name}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {product.description}
                  </p>
                  
                  {/* Nigerian insights */}
                  {product.nigerianInsights && (
                    <div className="mt-3 space-y-1">
                      <p className="text-lg font-bold text-primary">
                        {product.nigerianInsights.priceInNaira}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Icons.truck className="h-3 w-3" />
                        {product.nigerianInsights.deliveryTime}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Icons.zap className="h-3 w-3" />
                        {product.nigerianInsights.powerCompatibility}
                      </div>
                    </div>
                  )}
                  
                  {/* AI reason (for recommendations) */}
                  {product.reason && (
                    <p className="text-xs italic text-muted-foreground mt-2 p-2 bg-secondary rounded">
                      "{product.reason}"
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No products found matching your criteria.</p>
            <Button variant="outline" onClick={() => setMode('simple')} className="mt-4">
              Try Different Search
            </Button>
          </div>
        )}
        
        {/* Action buttons */}
        {response.suggestedActions && (
          <div className="flex flex-wrap gap-3 justify-center">
            {response.suggestedActions.requestQuote && (
              <Button>
                <Icons.fileText className="mr-2 h-4 w-4" />
                Generate Quote
              </Button>
            )}
            {response.suggestedActions.scheduleConsultation && (
              <Button variant="outline">
                <Icons.calendar className="mr-2 h-4 w-4" />
                Schedule Consultation
              </Button>
            )}
            {response.suggestedActions.shareViaWhatsApp && (
              <Button variant="outline">
                <Icons.share2 className="mr-2 h-4 w-4" />
                Share via WhatsApp
              </Button>
            )}
          </div>
        )}
        
        <div className="flex justify-center">
          <Button 
            variant="outline" 
            onClick={() => {
              setMode(initialMode);
              setResponse(null);
            }}
          >
            <Icons.search className="mr-2 h-4 w-4" />
            New Search
          </Button>
        </div>
      </div>
    );
  };
  
  // Render based on current mode
  const renderContent = () => {
    switch (mode) {
      case 'welcome':
        return renderWelcomeScreen();
      case 'simple':
        return renderSimpleMode();
      case 'expert':
        return renderExpertMode();
      case 'results':
        return renderResults();
      default:
        return renderSimpleMode();
    }
  };
  
  return (
    <div className={cn(
      "relative",
      mode === 'results' ? 'max-w-6xl mx-auto' : 'max-w-2xl mx-auto'
    )}>
      {/* Conversation history indicator */}
      {conversationHistory.length > 0 && mode !== 'results' && (
        <div className="absolute -top-6 right-0 text-xs text-muted-foreground">
          Session: {conversationHistory.length} interactions
        </div>
      )}
      
      {renderContent()}
    </div>
  );
}