# MANAK AI Security & Data Privacy Framework

## Security Principles
1. **Zero Secret Exposure**: API keys (OpenAI / Gemini) and JWT secrets are kept exclusively on the Node.js backend server inside `.env`. Never exposed to client bundles.
2. **Input Validation**: All incoming query strings, standard IDs, and product recommendation forms undergo strict type sanitization.
3. **No Executable Ingestion**: Document chunks uploaded to the knowledge base are processed strictly as text strings, preventing arbitrary code execution.
4. **Trust Disclaimer**: Subtle regulatory disclaimer attached to every synthesized response advising users to verify with official BIS portals before making legal or compliance commitments.
