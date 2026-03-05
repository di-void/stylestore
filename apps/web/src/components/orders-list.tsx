export function OrdersList() {
  // if (orders.length === 0) {
  return (
    <div className="bg-white min-h-[60vh]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 text-center">
        <img
          src="/icons/package.svg"
          alt="Orders"
          className="w-16 h-16 mx-auto mb-6 opacity-20"
        />
        <h1 className="text-4xl font-black uppercase tracking-tight mb-4">
          No Orders Yet
        </h1>
        <p className="text-sm opacity-60 mb-12">
          Start shopping to see your orders here
        </p>
        <a
          href="/"
          className="inline-block h-[50px] px-12 bg-black text-white font-medium text-sm uppercase tracking-wide hover:bg-gray-800 transition leading-[50px]"
        >
          Start Shopping
        </a>
      </div>
    </div>
  );
  // }

  // return (
  //   <div className="bg-white">
  //     <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-12">
  //       <h1 className="text-4xl font-black uppercase tracking-tight mb-12">
  //         My Orders
  //       </h1>

  //       <div className="space-y-8">
  //         {orders.map((order) => (
  //           <div key={order.id} className="border border-gray-200">
  //             <div className="bg-surface border-b border-gray-200 px-8 py-6">
  //               <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
  //                 <div>
  //                   <p className="text-[10px] tracking-[0.4px] uppercase opacity-40 mb-2 font-medium">
  //                     Order Number
  //                   </p>
  //                   <p className="font-medium text-sm">{order.id}</p>
  //                 </div>
  //                 <div>
  //                   <p className="text-[10px] tracking-[0.4px] uppercase opacity-40 mb-2 font-medium">
  //                     Date Placed
  //                   </p>
  //                   <p className="font-medium text-sm">
  //                     {new Date(order.date).toLocaleDateString("en-US", {
  //                       year: "numeric",
  //                       month: "long",
  //                       day: "numeric",
  //                     })}
  //                   </p>
  //                 </div>
  //                 <div>
  //                   <p className="text-[10px] tracking-[0.4px] uppercase opacity-40 mb-2 font-medium">
  //                     Total Amount
  //                   </p>
  //                   <p className="font-medium text-sm">
  //                     ${order.total.toFixed(2)}
  //                   </p>
  //                 </div>
  //                 <div>
  //                   <p className="text-[10px] tracking-[0.4px] uppercase opacity-40 mb-2 font-medium">
  //                     Status
  //                   </p>
  //                   <span className="inline-block bg-black text-white px-4 py-1 text-xs font-medium uppercase tracking-wide">
  //                     {order.status}
  //                   </span>
  //                 </div>
  //               </div>
  //             </div>

  //             <div className="p-8">
  //               <div className="space-y-6 mb-8">
  //                 {order.items.map((item, index) => (
  //                   <div
  //                     key={`${item.product.id}-${item.size}-${item.color}-${index}`}
  //                     className="flex gap-6"
  //                   >
  //                     <div className="w-24 h-32 bg-gray-100 border border-line overflow-hidden flex-shrink-0">
  //                       <a href={`/product/${item.product.id}`}>
  //                         <img
  //                           src={item.product.image ?? ""}
  //                           alt={item.product.name}
  //                           className="w-full h-full object-cover hover:scale-105 transition duration-300"
  //                         />
  //                       </a>
  //                     </div>
  //                     <div className="flex-1">
  //                       <a
  //                         href={`/product/${item.product.id}`}
  //                         className="font-medium hover:opacity-60 transition inline-block mb-2 capitalize"
  //                       >
  //                         {item.product.name}
  //                       </a>
  //                       <p className="text-xs opacity-60 uppercase tracking-wide mb-2">
  //                         {item.product.category ?? "Uncategorized"}
  //                       </p>
  //                       <p className="text-sm opacity-60 mb-3">
  //                         Size: <span className="uppercase">{item.size}</span> |
  //                         Color: <span className="uppercase">{item.color}</span>{" "}
  //                         | Quantity: {item.quantity}
  //                       </p>
  //                       <p className="font-medium">
  //                         ${(item.product.price * item.quantity).toFixed(2)}
  //                       </p>
  //                     </div>
  //                   </div>
  //                 ))}
  //               </div>

  //               <div className="border-t border-gray-200 pt-6">
  //                 <h3 className="text-xs uppercase tracking-wide font-medium mb-4 opacity-60">
  //                   Shipping Address
  //                 </h3>
  //                 <div className="text-sm opacity-60 space-y-1">
  //                   <p>{order.shippingAddress.name}</p>
  //                   <p>{order.shippingAddress.address}</p>
  //                   <p>
  //                     {order.shippingAddress.city},{" "}
  //                     {order.shippingAddress.zipCode}
  //                   </p>
  //                   <p>{order.shippingAddress.country}</p>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         ))}
  //       </div>

  //       <a
  //         href="/"
  //         className="inline-block mt-12 text-sm opacity-60 hover:opacity-100 transition uppercase tracking-wide"
  //       >
  //         ← Continue Shopping
  //       </a>
  //     </div>
  //   </div>
  // );
}
