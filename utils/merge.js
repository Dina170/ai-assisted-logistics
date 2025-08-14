function mergeOrders(orders) {
  const ordersMap = new Map();
  const warnings = [];

  orders.forEach(async (order) => {
    const orderId = order.orderId;
    if (!ordersMap.has(orderId)) {
      ordersMap.set(orderId, order);
    } else {
      const existingOrder = ordersMap.get(orderId);
      const add1 = normalizeAddress(existingOrder.address);
      const add2 = normalizeAddress(order.address);

      if ((await compareSimilarity(add1, add2)) >= 0.7) {
        for (const key of Object.keys(order)) {
          if (!existingOrder[key] && order[key])
            existingOrder[key] = order[key];
        }
      } else {
        warnings.push(
          `conflict happened, order ${orderId} has different addresses ("${add1}" vs "${add2}`
        );
      }
      if (
        existingOrder.deadline &&
        order.deadline &&
        new Date(order.deadline) < new Date(existingOrder.deadline)
      ) {
        existingOrder.deadline = order.deadline;
      }

      ordersMap.set(orderId, existingOrder);
    }
  });

  return { mergedOrders: Array.from(ordersMap.values()), warnings };
}

function normalizeAddress(address) {
  return address
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s]+/g, "")
    .replace(/\s+/g, " ");
}

async function compareSimilarity(str1, str2) {
  const { default: leven } = await import("leven");
  const maxLength = Math.max(str1.length, str2.length);
  if (!maxLength) return 1;
  const distance = leven(str1, str2);
  return 1 - distance / maxLength;
}

module.exports = mergeOrders;
