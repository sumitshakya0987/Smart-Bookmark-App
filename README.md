
# Smart Bookmark App

A modern, real-time bookmark manager built with **Next.js 15 (App Router)** and **Supabase**. Securely save your favorite links, access them from anywhere, and see updates instantly across devices.

## 🚀 Features

-   **Google Authentication**: Secure and easy login with your Google account.
-   **Real-time Sync**: Bookmarks appear instantly on all open tabs/devices without refreshing (powered by Supabase Realtime).
-   **Dashboard Layout**: A productive side-by-side view for adding and managing links.
-   **Modern UI**: Beautiful, animated interface using `Framer Motion` and `Tailwind CSS`.
-   **responsive Design**: Works perfectly on desktops, tablets, and mobile phones.

## 🛠️ Tech Stack

-   **Frontend**: Next.js 15, TypeScript, Tailwind CSS
-   **Backend**: Supabase (PostgreSQL, Auth, Realtime)
-   **Animations**: Framer Motion
-   **Icons**: Lucide React

## 🧩 Challenges we ran into & Solutions

During the development of this application, we encountered a few interesting challenges. Here is how we solved them:

### 1. Real-time Updates Not Triggering
**Problem**: After setting up the Supabase client, adding a bookmark in one tab did not update the list in the other tab, even though the code for `subscription` was correct.
**Solution**: We discovered that the `bookmarks` table was not added to the `supabase_realtime` publication in the database. We fixed this by running the following SQL command:
```sql
alter publication supabase_realtime add table bookmarks;
```

### 2. Styles & Visibility Issues
**Problem**: The input fields for "Title" and "URL" appeared empty or invisible because the text color defaulted to white on a white background in the early version.
**Solution**: We explicitly added `text-gray-900` to the input classes to ensure high contrast and readability.

### 3. Next.js Development Server Lock
**Problem**: We encountered an `Unable to acquire lock` error when trying to run `npm run dev`, preventing the server from starting.
**Solution**: This was caused by a background node process that didn't shut down correctly. We manually terminated the process using the terminal to free up the port and lock file.

### 4. Layout Optimization
**Problem**: The initial single-column layout was not efficient for desktop users who wanted to add links quickly while viewing their list.
**Solution**: We refactored the `page.tsx` to use a **CSS Grid** layout. On large screens (`lg:`), it displays the "Add Bookmark" form as a sticky sidebar on the left and the list on the right. On mobile, it gracefully stacks vertically.

## 📦 Getting Started

1.  **Clone the repository**
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Set up Environment Variables**:
    Create a `.env.local` file and add your Supabase credentials:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```
4.  **Run the development server**:
    ```bash
    npm run dev
    ```
5.  Open [Deployment](https://smart-bookmark-app-fawn.vercel.app/) in your browser.
