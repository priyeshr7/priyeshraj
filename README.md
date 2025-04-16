# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/ca324a1f-23f5-444a-a7b6-725a826910de

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**
(https://lovable.dev/projects/ca324a1f-23f5-444a-a7b6-725a826910de) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

### Option 1: Deploy via Lovable
Simply open [Lovable](https://lovable.dev/projects/ca324a1f-23f5-444a-a7b6-725a826910de) and click on Share -> Publish.

### Option 2: Deploy to GitHub Pages

To deploy this project to GitHub Pages:

1. Create a new repository on GitHub
2. Push your code to the repository:
```sh
git remote add origin <your-github-repo-url>
git push -u origin main
```

3. Install gh-pages as a dev dependency:
```sh
npm install --save-dev gh-pages
```

4. Add these scripts to your package.json:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

5. Update vite.config.ts to add your repository base URL:
```ts
export default defineConfig({
  base: '/your-repo-name/',
  // ... other config
})
```

6. Deploy your site:
```sh
npm run deploy
```

7. On GitHub, go to Settings -> Pages:
   - Set source to "gh-pages" branch
   - Save the changes

Your site will be available at `https://yourusername.github.io/your-repo-name/`

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
