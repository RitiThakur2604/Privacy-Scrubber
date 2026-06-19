Privacy Scrubber (PII Redactor)
A stateless, memory-safe backend microservice built using Node.js and Express that instantly identifies, censors, and sanitizes Personally Identifiable Information (PII) from unformatted text documents using advanced Regular Expressions.

Features
In-Memory Sanitization: Documents are processed entirely in RAM and never touch a hard drive or database, nullifying the risk of data leaks.

Advanced Pattern Matching: Utilizes highly optimized, custom Regular Expressions to catch difficult edge cases (e.g., international phone numbers, plus-addressed emails, varied credit card formats).

Zero Data Retention: By design, the application completely "forgets" the data the millisecond the HTTP request resolves, ensuring absolute privacy compliance.

O(N) Time Complexity: Efficient string traversal allows for real-time redaction of large text blocks without server timeouts.

Usage Guide
1. Input Sensitive Data
Users paste a raw, unformatted document containing private information (such as SSNs, Phone Numbers, Emails, and Credit Cards) into the frontend portal.

2. The Redaction Engine
Upon submission, the Express backend catches the payload and routes it through a gauntlet of algorithmic filters.

3. Data Neutralization
The engine mathematically isolates sensitive string patterns. Instead of deleting the data and ruining the document's formatting, it replaces the precise targets with standardized [REDACTED] tags.

4. Safe Handoff
The sanitized text is instantly rendered back to the user via a split-screen UI, complete with a one-click clipboard export, ready to be safely shared or stored.

Security Design & Real-World Use Cases
The Security Architecture
Privacy Scrubber operates on a Stateless Pipeline model:

The DB-Void Protocol: Unlike traditional CRUD applications, this microservice explicitly omits a database. By never writing to a disk, it guarantees that no hacker or unauthorized admin can ever query past user inputs.

Algorithmic Precision: The Regex engine is engineered to prevent both False Positives and False Negatives. For example, it utilizes OR pipe operators (|) to differentiate between a standard 16-digit Visa card and a 15-digit American Express card, ensuring non-PII numerical data remains intact.

Where It Can Be Used
HR & Recruiting (Blind Screening): Automatically scrubbing candidate names, phone numbers, and emails from resumes to eliminate unconscious bias before the hiring committee reviews them.

Legal & Compliance (E-Discovery): Law firms can use the engine to rapidly sanitize thousands of pages of discovery documents before making them public records.

Customer Support Logs: Sanitizing live chat transcripts to remove customer credit card numbers and passwords before sending the logs to the engineering team for bug fixing.

File Structure
The application is purposefully lightweight, utilizing a monolithic, single-file server architecture to maximize execution speed.

server.js: The core engine. It initializes the Express server, parses URL-encoded payloads, and houses the primary Regular Expression state-machine logic.

views/ (Presentation Layer)

index.ejs: The primary UI. A responsive, split-screen dashboard that injects the Node.js output directly into the DOM upon successful redaction.

(Note: There is no models/ directory or database configuration file, as the strict adherence to a stateless architecture is the application's primary security feature).

Technologies Used
Backend Architecture
Node.js: Chosen as the core runtime environment. Its non-blocking, V8 engine processes complex string replacements incredibly fast in memory.

Express.js: Provides the lightweight routing framework necessary to handle the POST payloads and serve the dynamic EJS views without unnecessary overhead.

Database & Data Management
None (By Design): To achieve true "Zero Data Retention," the system intentionally bypasses database integration, acting strictly as a pass-through processing filter.

Frontend & UI
EJS (Embedded JavaScript): A server-side templating engine that allows the Express server to inject the sanitized text directly into the HTML payload, avoiding the need for heavy client-side React/Vue bundles.

Vanilla CSS3: The dashboard features a clean, responsive, enterprise-style UI built entirely from scratch without relying on external libraries like Bootstrap or Tailwind.

Acknowledgments
Inspired by enterprise data compliance tools and the strict requirements of GDPR and CCPA data privacy laws.