# AI-Assisted Logistics Cleanup & Reconciliation

This project processes messy order data, plans courier assignments under given constraints, and reconciles the planned deliveries with the actual delivery logs.

## Features

- **Clean & normalize** messy orders
- **Merge duplicates** by `orderId` (keeping earliest deadlines, preferring non-empty fields)
- **Normalize addresses** and map zones
- **Plan courier assignments** respecting capacity, exclusions, payment types, and tie-breakers
- **Reconcile plan vs. delivery log** to detect missing, unexpected, duplicate, late, misassigned orders, and overloaded couriers

---

## 📦 Dependencies

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [csv-parse](https://www.npmjs.com/package/csv-parse) — for reading CSV files
- [leven](https://www.npmjs.com/package/leven) — for address similarity
- [fs/promises](https://nodejs.org/api/fs.html) — for reading/writing JSON files

Install all dependencies:

````bash
npm install

## 🚀 How to Run

1. **Clone this repository**:

```bash
git clone <YOUR_REPO_URL>
cd <YOUR_REPO_NAME>

````

1. **Install dependencies**:

```bash
npm install

```

1. **Prepare the data**

   Place your input files in the `data/` directory:

   - `orders.json`
   - `couriers.json`
   - `zones.csv`
   - `log.csv`

2. **Run the processing script**:

```bash
node index.js

```

1. **Check the output**

   The following files will be generated in the `output/` directory:

   - `clean_orders.json` — normalized and merged orders
   - `plan.json` — courier assignments
   - `reconciliation.json` — plan vs. delivery log analysis

## 📄 Documentation

- [**ASSUMPTIONS.md**](ASSUMPTIONS.md) — details of the assumptions made during cleaning, merging, assignment, and reconciliation.
- [**AI_NOTES.md**](AI_NOTES.md) — summary of AI-assisted steps and decisions.
