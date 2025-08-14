# ASSUMPTIONS

## Data Cleaning & Normalization

- **Order IDs** are case-insensitive.
  - Trim whitespace, convert to uppercase, remove leading/trailing non-alphanumeric characters.
  - `ORD001`, `ord-001` → `ORD001`.
- **Duplicate Orders**:
  - Identified by normalized `orderId`.
  - If addresses match (Levenshtein similarity ≥ 0.75):
    - Keep earliest `deadline` if conflicting.
    - Prefer non-empty fields over empty ones.
    - Do **not** sum weights — keep the weight from the base order.
  - If addresses differ beyond threshold → treat as separate orders and log a warning.
- **Address Normalization**:
  - Lowercase, strip punctuation, collapse multiple spaces.
  - Common aliases mapped to canonical zones:  
    `"6 Oct"`, `"6th of Oct."`, `"6 October"` → `"6th of October"`.

## Courier Assignment

- Couriers must:
  1. Cover the order’s `city` or `zoneHint`.
  2. Accept the payment type (`COD` check).
  3. Not exclude the product type.
  4. Have enough capacity:  
     `dailyCapacity - currentLoad >= order.weight`.
- **Tie-breaker order**:
  1. Lower `priority` value wins.
  2. Orders processed by earliest `deadline` first.
  3. Lowest current assigned load.
  4. Lexicographical `courierId`.

## Reconciliation

- **Missing**: in plan but not in logs.
- **Unexpected**: in logs but not in orders.
- **Duplicate**: same `orderId` appears more than once in logs.
- **Late**: `deliveredAt` strictly later than `deadline`.
- **Misassigned**: courier in logs differs from planned courier (case-insensitive match).
- **Overloaded Couriers**: total delivered weight in logs exceeds `dailyCapacity`.

## General

- All comparisons for `orderId` and `courierId` are case-insensitive.
- CSV and JSON files are assumed to be UTF-8 encoded without BOM.
