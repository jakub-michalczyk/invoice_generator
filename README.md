
# Invoice Generator

This is an **Angular-based Invoice Generator** application that allows users to dynamically create and manage a list of products. The app consists of two main pages: a product input form and a summary page that displays the added products along with company information.

## Features

- **Dynamic Product Form**:
  - Add, remove, and update an unlimited number of product items.
  - Each product consists of:
    - **Name**: Required field, 3-30 characters.
    - **Count**: Required field, integer between 1 and 100.
    - **Price**: Required field, integer between 1 and 1,000,000.
  - Active "Submit" button:
    - Displays errors if there are invalid fields.
    - Shows a message "Please add items" for an empty form.
    - If at least one valid item exists, redirects to the summary page.
  
- **Summary Page**:
  - Displays company information fetched from a backend JSON file.
  - Lists all valid product items with total calculated price.
  - If accessed directly without any items, it shows a message: "No items".

- **Persistent Storage**:
  - Uses **SessionStorage** to store form data temporarily, ensuring data is available during navigation but cleared after closing the app or navigating out of the summary page.

## Prerequisites

- **Node.js** and **npm** installed
- **Angular CLI** installed globally (`npm install -g @angular/cli`)

## Installation

**1. Clone the repository:**
   ```
   git clone <repository_url>
   cd invoice-generator
   ```

**2. Install dependencies:**
   ```
   npm install
   ```

**3. Start the development server:**

```
ng serve
```

**4. Open your browser and navigate to:**

```
http://localhost:4200/
```
