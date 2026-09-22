# MANAK AI Data Model & Schema Specification

## Core Data Entities

### 1. Source
- `id`: string (e.g. `src-bis-portal`)
- `name`: string
- `organization`: string
- `authorityLevel`: 'Official BIS' | 'Government Notification' | 'Empanelled Portal' | 'Secondary Reference'
- `url`: string
- `lastVerifiedAt`: ISO Date
- `isVerified`: boolean

### 2. Standard
- `id`: string (e.g. `std-is-3042`)
- `isNumber`: string (e.g. `IS 3042:1990`)
- `title`: string
- `description`: string
- `sector`: string
- `productCategories`: string[]
- `status`: 'Active' | 'Under Revision' | 'Withdrawn'
- `edition`: string
- `publicationDate`: ISO Date
- `isMandatory`: boolean (QCO mandatory ISI mark)
- `sourceDocumentId`: string
- `sourceUrl`: string

### 3. DocumentChunk
- `id`: string
- `documentId`: string
- `sourceId`: string
- `documentTitle`: string
- `content`: string
- `section`: string
- `tags`: string[]
- `relevanceScore`: number

### 4. Laboratory
- `id`: string
- `name`: string
- `location`: string
- `city`: string
- `state`: string
- `lat`: number
- `lng`: number
- `testingScopes`: string[]
- `standardsSupported`: string[]
- `contactEmail`: string
- `contactPhone`: string

### 5. HallmarkingCentre
- `id`: string
- `name`: string
- `location`: string
- `city`: string
- `state`: string
- `centreCode`: string
- `services`: string[]
- `recognizedStatus`: string
