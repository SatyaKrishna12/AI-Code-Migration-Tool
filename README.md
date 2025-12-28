# AI-Assisted Code Migration Tool



---

## Key Features

### 1. In-Browser Code Editor

The application uses **Monaco Editor**, the same editor that powers Visual Studio Code. This provides a familiar and powerful coding experience directly in the browser, including syntax highlighting and structured formatting.

Developers can paste legacy JavaScript code and review or edit it before starting the migration.

---

### 2. AI-Powered Code Migration

The core functionality of the system is powered by the **Gemini API**, which is used to intelligently transform legacy JavaScript into:

- Modern ES6+ JavaScript
- Strictly typed TypeScript

The AI is guided using structured prompts to:
- Preserve original logic and behavior
- Replace outdated patterns with modern syntax
- Convert CommonJS modules to ES modules
- Add meaningful TypeScript typings when required

The output is returned as clean, production-ready code rather than explanatory text.

---

### 3. Side-by-Side Diff Viewer

To make changes transparent, the tool uses **Monaco Diff Viewer** to display the original and migrated code side by side.

This allows users to:
- Clearly see what changed
- Understand modernization decisions
- Build trust in the AI-generated output

The diff viewer ensures that migration is not a “black box” process.

---

### 4. Editable Migrated Code

After migration, the generated code remains fully editable inside the editor. Developers are free to make manual adjustments, refine typings, or apply custom formatting before accepting the final version.

This keeps humans in control of the final output instead of forcing automated decisions.

---

### 5. Code Export

Once satisfied with the migration, users can export the result as:
- A JavaScript file (ES6+)
- A TypeScript file

This makes it easy to directly integrate the migrated code into existing projects.

---

### 6. Migration History

Each migration session is stored and can be revisited later. This allows users to:
- Review previous migrations
- Reload older versions
- Track modernization progress over time

This feature reflects real developer workflows where experimentation and revision are common.

---


## Setup Instructions

### Prerequisites

- Node.js (v18 or above recommended)

- npm or yarn

- MongoDB (local or Atlas)

---

## Backend Setup

1. Navigate to the backend directory:

```

cd Backend
```

Install dependencies:
```
npm install
```

Create a .env file in the server directory with the following content:

```
PORT=5000

NODE_ENV=production

MONGODB_URI=

GEMINI_API_KEY=

ALLOWED_ORIGINS=
```
Notes:

MONGODB_URI: MongoDB connection string

GEMINI_API_KEY: API key for Gemini

ALLOWED_ORIGINS: Comma-separated list of allowed frontend origins (for CORS)

Start the backend server:
```
npm run dev
```
## Frontend Setup

Navigate to the frontend directory:

```
cd Frontend
```
Install dependencies:
```
npm install
```
Create a .env file in the client directory with the following content:
```
VITE_API_BASE_URL=http://localhost:5000/api/migrate
```
Start the frontend development server:
```

npm run dev
```
Open the application in your browser at:
```
http://localhost:5173
```
### How It Works (High Level)

- The user pastes legacy JavaScript code into the Monaco Editor.

- The code is sent to the backend through a REST API.

- The backend sends the code to the Gemini API with controlled prompts.

- The AI returns modernized ES6+ or TypeScript code.

- The frontend displays a side-by-side diff using Monaco Diff Viewer.

- The user can edit, accept, and export the migrated code.

- Migration sessions are stored for future reference.


---

## Conclusion

The AI-Assisted Code Migration Tool combines modern frontend tooling with AI-driven transformation to create a developer-centric experience. By integrating Monaco Editor, Monaco Diff Viewer, and the Gemini API, the project showcases how AI can be used responsibly to enhance productivity while maintaining code quality and developer trust.

This project reflects real-world engineering practices and demonstrates a thoughtful approach to AI-assisted software development.
