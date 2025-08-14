# AI_NOTES

## AI Assistance Used

1. **Code Structure & Planning**

   - Consulted AI to outline the overall architecture: separate modules for file handling, normalization, merging, planning, and reconciliation.
   - Discussed data flow between stages (load → clean/merge → plan → reconcile → output).

2. **Implementation Guidance**

   - Received suggestions for:
     - Regex patterns for `orderId` normalization.
     - Address normalization heuristics.
     - Tie-breaker ordering in courier selection.
     - Safe CSV and JSON file reading/writing without caching issues.

3. **Problem Solving**

   - Debugged incorrect duplicate detection in logs (`seenOrdersIds` scope issue).
   - Clarified edge cases for courier capacity and assignment.
   - Addressed Node.js `require()` caching for JSON files.

4. **Documentation**
   - AI-assisted drafting of `README.md` and `ASSUMPTIONS.md` to meet submission format and clarity requirements.

## Limits of AI Involvement

- All final code was written, reviewed, and tested manually by the developer.
- AI provided examples, explanations, and suggestions but did not produce a fully functional end-to-end solution without developer input.
- Data files, business logic details, and final implementation decisions were handled manually to fit the task’s constraints.
