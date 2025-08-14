function normalizeOrders(orders, zonesMap) {
  return orders.map((order) => ({
    ...order,
    orderId: normalizeId(order.orderId),
    city: normalizeZone(order.city, zonesMap),
    zoneHint: normalizeZone(order.zoneHint, zonesMap),
    paymentType:
      order.paymentType.trim().toUpperCase() === "COD" ? "COD" : "Prepaid",
    productType: order.productType.trim().toLowerCase(),
    weight: Number(order.weight),
    deadline: formatDate(order.deadline),
  }));
}

function normalizeId(orderId) {
  const newId = orderId
    .trim()
    .toUpperCase()
    .replace(/^[^A-Z0-9]+|[^A-Z0-9]+$/g, "");

  return newId.replace(/^([A-Z]+)(\d+)$/, "$1-$2");
}

function normalizeZone(zoneRaw, zonesMap) {
  return zonesMap[zoneRaw.trim().toLowerCase()] || zoneRaw.trim();
}

function convertZonestoMap(zones) {
  const zonesMap = {};
  zones.forEach((zone) => {
    zonesMap[zone.raw.trim().toLowerCase()] = zone.canonical.trim();
  });
  return zonesMap;
}

function formatDate(date) {
  const normalized = date.replace(/\//g, "-") + "Z";
  const newDate = new Date(normalized);

  if (isNaN(newDate.getTime())) throw new Error("invalid date");

  return newDate.toISOString();
}

module.exports = {
  convertZonestoMap,
  normalizeZone,
  normalizeOrders,
};
