import { Client } from "../../types/Client"

import { Badge } from "../ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"



interface CardProps {
  client: Client
}


const ClientPreviewCard = ({ client }: CardProps) => {
  return (
    <Card className="bg-[#1a0b2e] text-white border border-[#5a2d82] shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{client.userName}</CardTitle>
        <p className="text-gray-400">{client.email}</p>
        <p className="text-gray-400">{client.phone}</p>

      </CardHeader>
      <CardContent>
        <div className="mb-3">
          <p className="text-sm text-gray-300">Адрес: {client.address}</p>
          <p className="text-sm text-gray-300">Дата регистрации: {new Date(client.createdAt).toLocaleDateString()}</p>
        </div>

        <div>
          <h3 className="text-md font-medium text-gray-300 mb-2">Заказы:</h3>
          {client.orders.length > 0 ? (
            client.orders.map((order) => (
              <div key={order.orderId} className="p-2 bg-[#2a1042] rounded-md mb-2">
                <p className="text-sm">ID заказа: {order.orderId}</p>
                <p className="text-sm">Сумма: {order.totalAmount} ₽</p>
                <p className="text-sm">Создан: {new Date(order.createdAt).toLocaleDateString()}</p>
                <div className="flex gap-2 mt-2">
                  {order.tasks && (
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        order.tasks.status === 0
                          ? "bg-blue-500"
                          : order.tasks.status === 1
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    >
                      {order.tasks.status === 0
                        ? "Новая"
                        : order.tasks.status === 1
                        ? "В работе"
                        : "Завершена"}
                    </Badge>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400">Заказов пока нет</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default ClientPreviewCard
