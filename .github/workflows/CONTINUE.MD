echo "# Home-Sofa" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/salimkhandev/Home-Sofa.git
git push -u origin main ALSO MAKE IT READY FOR DEPLYMENT  ON THE GITBUB PAGES WITH ALL THE REQURED CHANGES SHOULD WORKS SEAMLESSLY THERE


Command echo in …/Home-Sofa

echo "# Home-Sofa" >> README.md
Exited with code 0

Command git in …/Home-Sofa

git init
Initialized empty Git repository in D:/Downloads/Home-Sofa/.git/

Command git in …/Home-Sofa

git add .
warning: in the working copy of '.env.example', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of '.gitignore', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'CMS_SETUP.md', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'DEPLOYMENT.md', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'admin/assets/css/admin.css', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'admin/assets/js/dashboard.js', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'admin/assets/js/login.js', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'admin/dashboard.html', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'admin/functions/api.js', LF will be replaced by CRLF the next time Git touches...

Command git in …/Home-Sofa

git commit -m "first commit"
[main (root-commit) e73ea2d] first commit
 29 files changed, 12614 insertions(+)
 create mode 100644 .env.example
 create mode 100644 .gitignore
 create mode 100644 CMS_SETUP.md
 create mode 100644 DEPLOYMENT.md
 create mode 100644 README.md
 create mode 100644 admin/assets/css/admin.css
 create mode 100644 admin/assets/js/dashboard.js
 create mode 100644 admin/assets/js/login.js
 create mode 100644 admin/dashboard.html
 create mode 100644 admin/functions/api.js
 create mode 100644 admin/index.html
 create mode 100644 assets/css/admin.css
 create mode 100644 assets/css/main.css
 create mode 100644 assets/css/products.css
 create mode 100644 assets/css/responsive.css
 create mode 100644 assets/images/.gitkeep
 create mode 100644 assets/js/dashboard.js
 create mode 100644 assets/js/login.js
 create mode 100644 assets/js/main.js
 create mode 100644 assets/js/products.js
 create mode 100644 assets/js/router.js
 create mode 100644 index.html
 create mode 100644 package.json
 create mode 100...

package.json
+3
-1
  "main": "index.html",
  "homepage": "https://salimkhandev.github.io/Home-Sofa/",
  "scripts": {
1 hidden line
    "build": "echo 'Static SPA - no build needed'",
    "deploy": "gh-pages -d ."
    "deploy": "gh-pages -d .",
    "predeploy": "echo 'Deploying to GitHub Pages...'"
  },

Command git in …/Home-Sofa

git add package.json
warning: in the working copy of 'package.json', LF will be replaced by CRLF the next time Git touches it

Command git in …/Home-Sofa

git commit -m "Add homepage for GitHub Pages deployment"
[main e0d45e4] Add homepage for GitHub Pages deployment
 1 file changed, 3 insertions(+), 1 deletion(-)

.nojekyll
Command git in …/Home-Sofa

git add .nojekyll
Exited with code 0

Command git in …/Home-Sofa

git commit -m "Add .nojekyll for GitHub Pages"
[main f883b72] Add .nojekyll for GitHub Pages
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 .nojekyll

Command New-Item in …/Home-Sofa

New-Item -ItemType Directory -Force -Path .github\workflows


    Directory: D:\Downloads\Home-Sofa\.github


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----         8/18/2026  11:58 PM                workflows

deploy.yml
+37
          path: '.'
 
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4

deploy.yml
+1
-4
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
  build:
    runs-on: ubuntu-latest

Command git in …/Home-Sofa

git add .github
warning: in the working copy of '.github/workflows/deploy.yml', LF will be replaced by CRLF the next time Git touches it

Command git in …/Home-Sofa

git commit -m "Add GitHub Actions workflow for Pages deployment"
[main b27d046] Add GitHub Actions workflow for Pages deployment
 1 file changed, 34 insertions(+)
 create mode 100644 .github/workflows/deploy.yml

404.html
+16
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home Sofa - Page Not Found</title>
    <script>
        // SPA routing - redirect all 404s to index.html
        // This enables client-side routing on GitHub Pages
        window.location.href = '/';
    </script>
</head>
<body>
    <p>Redirecting...</p>
</body>
</html>

Command git in …/Home-Sofa

git add 404.html
warning: in the working copy of '404.html', LF will be replaced by CRLF the next time Git touches it





