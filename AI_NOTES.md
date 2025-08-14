# AI_NOTES

## How AI Usage Improved My Solution

1. **Prevented Analysis Paralysis:** AI helped me break down the complex task into manageable steps instead of trying to solve everything at once.
2. **Library Selection:** AI provided comparisons between different CSV parsing options, helping me choose the most appropriate tool.
3. **Code Review:** AI caught potential bugs and suggested more efficient data structures for lookups.
4. **Validation:** AI confirmed my approaches were sound, giving me confidence to proceed with implementation.
5. **Documentation**
   - AI-assisted drafting of `README.md` and `ASSUMPTIONS.md` to meet submission format and clarity requirements.

## Prompts Used with GPT

### 1. Task Understanding and Approach

**Prompt:** "break down this task into smaller steps"

**AI Response:** Confirmed this was a good approach for clarifying requirements before starting implementation.

**What I used:** Used AI to break down the complex task into manageable steps and validate my step-by-step approach.

### 2. Technical Implementation Guidance

**Prompt:** "how to use fs/promises with json files" and "how to use csv parse"

**AI Response:** Provided multiple options for file I/O and CSV parsing libraries with code examples.

**What I changed:** Originally tried csv-parse but got a Parser object instead of data. AI suggested csv-parse/sync or papaparse. I chose papaparse for better error handling.

### 3. Data Structure Design

**Prompt:** "does that mean i should store it in an object like {"6th of October": [6 October, 6th of Oct.], ...}"

**AI Response:** Suggested reversing the structure to use raw values as keys pointing to canonical values for O(1) lookup.

**What I implemented:** Used the suggested structure which made zone normalization much more efficient.

## Changes I Made and Why

- **Duplicate Merging**: GPT’s initial approach merged weights by adding them. I changed it to keep the base order’s weight only, because the task description required preferring a single order’s values, not summing.
- **Order Sorting**: Added an explicit sort by earliest `deadline` before planning assignments to ensure time-sensitive orders get capacity first — GPT initially applied deadline tie-breaker only between couriers, not between orders.
- **Case-insensitive Matching**: Normalized `orderId` and `courierId` to uppercase before comparisons in all steps to prevent mismatches from mixed casing.

## One Thing GPT Got Wrong That I Fixed

- **Duplicate Detection Scope**: GPT’s first duplicate detection example kept `seenOrdersIds` inside the loop, which resets on every iteration and never flags duplicates.  
  I moved `seenOrdersIds` outside the loop so that it persists across all iterations.
