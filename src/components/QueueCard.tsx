import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Book, Clock, LogOut } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import waitingIllustration from "@/assets/waiting-illustration.jpg";

interface QueueCardProps {
  customerName: string;
  position: number;
  totalInQueue: number;
  estimatedWaitTime: string;
}

const QueueCard = ({ customerName, position, totalInQueue, estimatedWaitTime }: QueueCardProps) => {
  const [hasLeft, setHasLeft] = useState(false);

  const handleLeaveQueue = () => {
    toast.error("Você saiu da fila", {
      description: "Esperamos vê-lo em breve!",
    });
    setHasLeft(true);
  };

  const handleOpenMaps = () => {
    // Exemplo com coordenadas genéricas - substituir com as coordenadas reais do restaurante
    const restaurantAddress = "Restaurante Delícia";
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurantAddress)}`;
    window.open(mapsUrl, "_blank");
    toast.success("Abrindo Google Maps...");
  };

  const handleViewMenu = () => {
    toast.success("Abrindo cardápio...");
    // Aqui você pode adicionar um link para o cardápio ou abrir um modal
  };

  if (hasLeft) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-secondary/20 to-background">
        <Card className="w-full max-w-md p-8 text-center animate-fade-in">
          <h2 className="text-2xl font-bold mb-4">Você saiu da fila</h2>
          <p className="text-muted-foreground">Esperamos vê-lo novamente em breve!</p>
        </Card>
      </div>
    );
  }

  const progressPercentage = ((totalInQueue - position) / totalInQueue) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="w-full max-w-md space-y-6 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Fila de Espera
          </h1>
          <p className="text-muted-foreground">Restaurante Delícia</p>
        </div>

        {/* Main Card */}
        <Card className="p-6 space-y-6 shadow-xl animate-slide-up">
          {/* Customer Info */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Bem-vindo(a)</p>
            <h2 className="text-2xl font-bold">{customerName}</h2>
          </div>

          {/* Position Badge */}
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground px-8 py-6 rounded-2xl shadow-lg animate-pulse-glow">
              <p className="text-sm font-medium mb-1">Sua posição</p>
              <p className="text-5xl font-bold">{position}</p>
              <p className="text-sm mt-1 opacity-90">de {totalInQueue} na fila</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="h-3 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Tempo estimado: {estimatedWaitTime}</span>
            </div>
          </div>

          {/* Waiting Illustration */}
          <div className="rounded-xl overflow-hidden shadow-md">
            <img
              src={waitingIllustration}
              alt="Pessoa aguardando no restaurante"
              className="w-full h-48 object-cover"
            />
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button onClick={handleViewMenu} className="w-full" size="lg">
              <Book className="w-5 h-5" />
              Ver Cardápio
            </Button>
            
            <Button onClick={handleOpenMaps} variant="outline" className="w-full" size="lg">
              <MapPin className="w-5 h-5" />
              Como Chegar
            </Button>
            
            <Button
              onClick={handleLeaveQueue}
              variant="destructive"
              className="w-full"
              size="lg"
            >
              <LogOut className="w-5 h-5" />
              Desistir da Fila
            </Button>
          </div>
        </Card>

        {/* Footer Info */}
        <div className="text-center text-sm text-muted-foreground animate-fade-in">
          <p>Você receberá uma notificação quando sua mesa estiver pronta</p>
        </div>
      </div>
    </div>
  );
};

export default QueueCard;
