import { Button } from "@/components/ui/button";
import { MapPin, Book, Share2, LogOut, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import restaurantHeader from "@/assets/restaurant-header.jpg";
import restaurantLogo from "@/assets/restaurant-logo.jpg";

interface QueueCardProps {
  customerName: string;
  position: number;
  totalInQueue: number;
  estimatedWaitTime: string;
  consumerCode: string;
  restaurantName: string;
}

const QueueCard = ({ 
  customerName, 
  position, 
  totalInQueue, 
  estimatedWaitTime,
  consumerCode,
  restaurantName
}: QueueCardProps) => {
  const [hasLeft, setHasLeft] = useState(false);

  const handleLeaveQueue = () => {
    toast.error("Você saiu da fila", {
      description: "Esperamos vê-lo em breve!",
    });
    setHasLeft(true);
  };

  const handleOpenMaps = () => {
    const restaurantAddress = restaurantName;
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurantAddress)}`;
    window.open(mapsUrl, "_blank");
    toast.success("Abrindo Google Maps...");
  };

  const handleViewMenu = () => {
    toast.success("Abrindo cardápio...");
  };

  const handleShare = async () => {
    const shareData = {
      title: `${restaurantName} - Fila de Espera`,
      text: `Estou na posição ${position} da fila do ${restaurantName}!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast.success("Compartilhado com sucesso!");
      } else {
        // Fallback para copiar link
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copiado para área de transferência!");
      }
    } catch (err) {
      console.error("Erro ao compartilhar:", err);
    }
  };

  if (hasLeft) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <div className="w-full max-w-md p-8 text-center animate-fade-in">
          <h2 className="text-2xl font-bold mb-4">Você saiu da fila</h2>
          <p className="text-muted-foreground">Esperamos vê-lo novamente em breve!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header com saudação */}
      <div className="px-4 pt-6 pb-4 space-y-2 animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground">
          Seja bem vindo ao restaurante Benedito
        </h1>
        <p className="text-lg font-semibold text-foreground mt-1">
          {customerName}, você entrou na fila
        </p>
        <p className="text-muted-foreground text-sm">
          Fique tranquilo, enviaremos uma mensagem quando chegar a sua vez.
        </p>
      </div>

      {/* Card principal com foto e posição */}
      <div className="px-4 mb-4 animate-slide-up">
        <div className="relative rounded-2xl overflow-hidden shadow-lg">
          {/* Foto do restaurante com efeito glass */}
          <div className="relative h-64">
            <img
              src={restaurantHeader}
              alt={restaurantName}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay com efeito glass/blur */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
            
            {/* Badge de posição com relógio circular */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <div className="relative">
                {/* Círculo animado do relógio */}
                <svg className="absolute -inset-8 w-40 h-40 animate-pulse-glow" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="283"
                    strokeDashoffset="70"
                    className="text-white/30"
                    transform="rotate(-90 50 50)"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray="283"
                    strokeDashoffset="70"
                    className="text-primary"
                    transform="rotate(-90 50 50)"
                    style={{ 
                      animation: 'countdown 60s linear infinite',
                      strokeLinecap: 'round'
                    }}
                  />
                </svg>
                
                <div className="text-7xl font-bold drop-shadow-2xl relative z-10">{position}°</div>
              </div>
              
              <div className="text-lg font-medium drop-shadow-md mt-6">
                Posição na fila de espera
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Informações do restaurante */}
      <div className="px-4 mb-4 animate-fade-in">
        <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
          <div className="flex items-center gap-3">
            {/* Logo do restaurante */}
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-primary/10">
              <img
                src={restaurantLogo}
                alt={`Logo ${restaurantName}`}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Nome e código */}
            <div className="flex-1">
              <h3 className="font-bold text-foreground">{restaurantName}</h3>
              <p className="text-sm text-muted-foreground">
                Código de consumo: <span className="font-semibold text-foreground">{consumerCode}</span>
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <Users className="w-3 h-3" />
                <span className="font-semibold text-foreground">{totalInQueue} pessoas na fila</span>
              </p>
            </div>
          </div>

          {/* Tempo estimado */}
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Tempo estimado:</span>
              <span className="font-semibold text-primary">{estimatedWaitTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Botões de ação */}
      <div className="px-4 space-y-3 animate-fade-in">
        {/* Compartilhar e Desistir - Layout lado a lado como no exemplo */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            onClick={handleShare} 
            variant="default" 
            size="lg"
            className="w-full"
          >
            <Share2 className="w-4 h-4" />
            Compartilhar
          </Button>
          
          <Button
            onClick={handleLeaveQueue}
            variant="outline"
            size="lg"
            className="w-full"
          >
            Desistir da fila
          </Button>
        </div>

        {/* Ver Cardápio */}
        <Button 
          onClick={handleViewMenu} 
          variant="secondary" 
          size="lg"
          className="w-full"
        >
          <Book className="w-4 h-4" />
          Ver Cardápio
        </Button>
        
        {/* Como Chegar */}
        <Button 
          onClick={handleOpenMaps} 
          variant="secondary" 
          size="lg"
          className="w-full"
        >
          <MapPin className="w-4 h-4" />
          Como Chegar
        </Button>
      </div>

      {/* Footer fixo */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t border-border py-3">
        <p className="text-center text-xs text-muted-foreground">
          Feito com ❤️ por <span className="font-semibold text-foreground">Restaurante Delícia</span>
        </p>
      </div>
    </div>
  );
};

export default QueueCard;
