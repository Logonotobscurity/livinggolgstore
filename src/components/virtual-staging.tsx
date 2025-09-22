
'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/icons';
import { enhanceImage } from '@/ai/flows/enhance-image';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from './ui/card';

interface VirtualStagingProps {
  productName: string;
  imageUrl: string;
}

// Helper function to convert image URL to Data URI
async function toDataUri(url: string): Promise<string> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}


export function VirtualStaging({ productName, imageUrl }: VirtualStagingProps) {
  const [prompt, setPrompt] = useState('');
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [isEnhancing, startEnhancing] = useTransition();
  const { toast } = useToast();

  const handleEnhance = async () => {
    if (!prompt) {
      toast({
        variant: 'destructive',
        title: 'Prompt is required',
        description: 'Please describe how you want to enhance the image.',
      });
      return;
    }

    startEnhancing(async () => {
      try {
        setEnhancedImage(null);
        const dataUri = await toDataUri(imageUrl);
        const result = await enhanceImage({
          photoDataUri: dataUri,
          prompt: prompt,
        });

        if (result.enhancedImageUri) {
          setEnhancedImage(result.enhancedImageUri);
        } else {
          throw new Error('The AI did not return an image.');
        }
      } catch (error) {
        console.error('Image enhancement failed:', error);
        toast({
          variant: 'destructive',
          title: 'Enhancement Failed',
          description:
            'The AI could not enhance the image at this time. Please try a different prompt or try again later.',
        });
      }
    });
  };
  
  return (
    <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
            <h3 className="font-headline text-2xl font-bold mb-2">Virtual Staging</h3>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                Use AI to visualize this product in a different setting. Describe the scene, and our AI will generate a new image. For example: "in a cozy reading nook" or "as a centerpiece in a grand hotel lobby".
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
            
            <div className="space-y-6">
                <Card>
                    <CardContent className="p-4 aspect-square flex items-center justify-center bg-secondary">
                        <Image
                            src={imageUrl}
                            alt={productName}
                            width={400}
                            height={400}
                            className="object-contain"
                        />
                    </CardContent>
                </Card>
                <div className="flex gap-2">
                    <Input 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe the new scene..."
                        className="bg-background"
                        disabled={isEnhancing}
                    />
                    <Button onClick={handleEnhance} disabled={isEnhancing}>
                        {isEnhancing ? (
                            <Icons.loader className="w-4 h-4 animate-spin" />
                        ) : (
                           'Enhance'
                        )}
                    </Button>
                </div>
            </div>

            <div className="space-y-6">
                 <Card>
                    <CardContent className="p-4 aspect-square flex items-center justify-center bg-secondary">
                        {isEnhancing && (
                            <div className="text-center text-muted-foreground">
                                <Icons.loader className="w-8 h-8 animate-spin mx-auto mb-4" />
                                <p>Generating new image...</p>
                            </div>
                        )}
                        {!isEnhancing && enhancedImage && (
                             <Image
                                src={enhancedImage}
                                alt={`AI enhanced image of ${productName}`}
                                width={400}
                                height={400}
                                className="object-contain"
                            />
                        )}
                         {!isEnhancing && !enhancedImage && (
                            <div className="text-center text-muted-foreground p-8">
                               <p>Your enhanced image will appear here.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
                {enhancedImage && (
                     <Button variant="outline" asChild className="w-full">
                        <a href={enhancedImage} download={`enhanced-${productName.toLowerCase().replace(/\s/g, '-')}.png`}>
                            <Icons.download className="w-4 h-4 mr-2" />
                            Download Image
                        </a>
                    </Button>
                )}
            </div>
        </div>
    </div>
  );
}
