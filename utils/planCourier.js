function planCourier(orders, couriers) {
  const capacityUsage = couriers.map((courier) => ({
    courierId: courier.courierId,
    totalWeight: 0,
  }));
  const assignments = [];
  const unassigned = [];

  orders.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  orders.forEach((order) => {
    const matchedCouriers = couriers.filter((courier) => {
      const coversZone =
        courier.zonesCovered.includes(order.city) ||
        courier.zonesCovered.includes(order.zoneHint);

      const acceptPayment =
        order.paymentType === "COD" ? courier.acceptsCOD : true;
      const notExcluded = !courier.exclusions.includes(order.productType);
      const totalWeight = capacityUsage.find(
        (c) => c.courierId === courier.courierId
      ).totalWeight;
      const hasCapacity = courier.dailyCapacity - totalWeight >= order.weight;

      return coversZone && acceptPayment && notExcluded && hasCapacity;
    });
    if (matchedCouriers.length === 0) {
      unassigned.push({
        orderId: order.orderId,
        reason: "no_supported_courier_or_capacity",
      });
      return;
    }

    matchedCouriers.sort((c1, c2) => {
      if (c1.priority !== c2.priority) return c1.priority - c2.priority;
      const c1Weight = capacityUsage.find(
        (c) => c.courierId === c1.courierId
      ).totalWeight;
      const c2Weight = capacityUsage.find(
        (c) => c.courierId === c2.courierId
      ).totalWeight;
      if (c1Weight !== c2Weight) return c1Weight - c2Weight;
      return c1.courierId
        .toLowerCase()
        .localeCompare(c2.courierId.toLowerCase());
    });

    const chosenCourier = matchedCouriers[0];
    assignments.push({
      orderId: order.orderId,
      courierId: chosenCourier.courierId,
    });
    const chosenCap = capacityUsage.find(
      (c) => c.courierId === chosenCourier.courierId
    );
    chosenCap.totalWeight += order.weight;
  });
  return { assignments, unassigned, capacityUsage };
}

module.exports = planCourier;
