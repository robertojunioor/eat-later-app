import QueueCard from "@/components/QueueCard";

const Index = () => {
  // Dados de exemplo - em produção, viriam de uma API ou estado global
  const customerData = {
    customerName: "Maria Silva",
    position: 3,
    totalInQueue: 12,
    estimatedWaitTime: "15-20 minutos",
  };

  return (
    <QueueCard
      customerName={customerData.customerName}
      position={customerData.position}
      totalInQueue={customerData.totalInQueue}
      estimatedWaitTime={customerData.estimatedWaitTime}
    />
  );
};

export default Index;
