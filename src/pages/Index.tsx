import QueueCard from "@/components/QueueCard";

const Index = () => {
  // Dados de exemplo - em produção, viriam de uma API ou estado global
  const customerData = {
    customerName: "Maria Silva",
    position: 3,
    totalInQueue: 12,
    estimatedWaitTime: "15-20 minutos",
    consumerCode: "857",
    restaurantName: "Restaurante Delícia",
  };

  return (
    <QueueCard
      customerName={customerData.customerName}
      position={customerData.position}
      totalInQueue={customerData.totalInQueue}
      estimatedWaitTime={customerData.estimatedWaitTime}
      consumerCode={customerData.consumerCode}
      restaurantName={customerData.restaurantName}
    />
  );
};

export default Index;
