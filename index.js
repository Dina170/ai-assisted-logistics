const {
  readJsonFile,
  writeJsonFile,
  readCSVFile,
} = require("./utils/fileHandlers");

const { convertZonestoMap, normalizeOrders } = require("./utils/normalize");
const mergeOrders = require("./utils/merge");
const planCourier = require("./utils/planCourier");
const reconcileLogs = require("./utils/reconcileLogs");

async function loadFiles() {
  try {
    const orders = await readJsonFile("./data/orders.json");
    const couriers = await readJsonFile("./data/couriers.json");
    const zones = await readCSVFile("./data/zones.csv", true);
    const logs = await readCSVFile("./data/log.csv", [
      "orderId",
      "courierId",
      "deliveredAt",
    ]);

    return { orders, couriers, zones, logs };
  } catch (error) {
    console.log("error loading files", error);
    throw new Error(error);
  }
}

(async () => {
  const { orders, couriers, zones, logs } = await loadFiles();
  const zonesMap = convertZonestoMap(zones);
  const normalizedOrders = normalizeOrders(orders, zonesMap);
  const { mergedOrders } = mergeOrders(normalizedOrders);
  // await writeJsonFile("./output/clean_orders.json", mergedOrders);
  const plan = planCourier(mergedOrders, couriers);
  // await writeJsonFile("./output/plan.json", plan);
  const reconciliation = reconcileLogs(mergedOrders, plan, logs, couriers);
  await writeJsonFile("./output/reconciliation.json", reconciliation);

  // console.log(mergedOrders);
})();
