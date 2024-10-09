import { useState } from 'react';
import { Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function BattingOrder() {
  const [numBatsmen, setNumBatsmen] = useState<number>(0);
  const [names, setNames] = useState<string[]>([]);
  const [order, setOrder] = useState<{name: string, position: number}[]>([]);
  const [showOrder, setShowOrder] = useState<boolean>(false);

  const handleNumBatsmenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 0 && value <= 11) {
      setNumBatsmen(value);
      setNames(new Array(value).fill(''));
      setShowOrder(false);
    }
  };

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...names];
    newNames[index] = value;
    setNames(newNames);
  };

  const generateOrder = () => {
    const positions = Array.from({length: names.length}, (_, i) => i + 1);
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }
    
    const newOrder = names.map((name, index) => ({
      name,
      position: positions[index]
    }));
    
    newOrder.sort((a, b) => a.position - b.position);
    setOrder(newOrder);
    setShowOrder(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 sm:p-6 md:p-8">
      <Card className="w-full max-w-lg mx-auto shadow-lg">
        <CardHeader className="space-y-2">
          <CardTitle className="text-center text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Cricket Batting Order
          </CardTitle>
          <p className="text-center text-gray-500 text-sm sm:text-base">
            Generate random batting orders for your cricket team
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Number Input Section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium mb-2">
              Enter Number of Batsmen (Max 11)
            </label>
            <Input
              type="number"
              min={0}
              max={11}
              value={numBatsmen || ''}
              onChange={handleNumBatsmenChange}
              className="w-full text-lg p-6 h-auto"
            />
          </div>

          {/* Name Input Section */}
          {numBatsmen > 0 && (
            <div className="space-y-4">
              <div className="grid gap-3 sm:gap-4">
                {names.map((name, index) => (
                  <div key={index} 
                    className="flex items-center gap-2 sm:gap-3 animate-fadeIn"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-primary text-primary-foreground rounded-full font-bold">
                      {index + 1}
                    </div>
                    <Input
                      value={name}
                      onChange={(e) => handleNameChange(index, e.target.value)}
                      placeholder={`Batsman ${index + 1}`}
                      className="flex-1 text-base sm:text-lg p-5 h-auto"
                    />
                  </div>
                ))}
              </div>
              
              <Button 
                onClick={generateOrder}
                className="w-full p-6 text-lg font-semibold transition-all hover:scale-105"
                disabled={names.some(name => !name.trim())}
              >
                <Shuffle className="mr-2 h-5 w-5" />
                Generate Order
              </Button>
            </div>
          )}

          {/* Order Display Section */}
          {showOrder && (
            <div className="mt-6 animate-fadeIn">
              <h3 className="font-bold text-xl mb-4">Batting Order:</h3>
              <div className="grid gap-2">
                {order.map((player, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 p-4 bg-secondary rounded-lg transition-all hover:scale-[1.02]"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground rounded-full font-bold">
                      {player.position}
                    </div>
                    <span className="text-lg">{player.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {numBatsmen > 11 && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>
                Maximum 11 players allowed in a cricket team.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Add these styles to your global CSS file
