const { formatDate } = require("./normalize");

function reconcileLogs(orders, plan, logs, couriers) {
  const reconciliation = {
    missing: [],
    unexpected: [],
    duplicate: [],
    late: [],
    misassigned: [],
    overloadedCouriers: [],
  };

  const couriersLoads = {};

  const logOrdersIds = logs.map((log) => log.orderId.trim().toUpperCase());
  const ordersIds = orders.map((order) => order.orderId);

  plan.assignments.forEach((order) => {
    if (!logOrdersIds.includes(order.orderId)) {
      reconciliation.missing.push(order.orderId);
    }
  });

  logOrdersIds.forEach((orderId) => {
    const seenOrdersIds = [];

    if (seenOrdersIds.includes(orderId)) reconciliation.duplicate.push(orderId);
    else seenOrdersIds.push(orderId);

    if (!ordersIds.includes(orderId)) {
      reconciliation.unexpected.push(orderId);
      return;
    }

    const log = logs.find((l) => l.orderId.trim().toUpperCase() === orderId);

    const order = orders.find((o) => o.orderId === orderId);

    const deliveredAt = formatDate(log.deliveredAt);

    if (new Date(deliveredAt) > new Date(order.deadline)) {
      reconciliation.late.push(orderId);
    }

    const planned = plan.assignments.find((p) => orderId === p.orderId);

    if (
      planned &&
      planned.courierId.toUpperCase() !== log.courierId.trim().toUpperCase()
    )
      reconciliation.misassigned.push(orderId);

    const courier = log.courierId.trim().toUpperCase();
    couriersLoads[courier] = (couriersLoads[courier] || 0) + order.weight;
  });

  reconciliation.overloadedCouriers = couriers
    .filter(
      (c) =>
        c.dailyCapacity < (couriersLoads[c.courierId.trim().toUpperCase()] || 0)
    )
    .map((c) => c.courierId);

  for (const arr of Object.values(reconciliation)) {
    arr.sort();
  }

  return reconciliation;
}

module.exports = reconcileLogs;
