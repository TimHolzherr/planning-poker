$heroku = "$PSScriptRoot/../planning-poker-heroku"
$root = $PSScriptRoot

# Clear
Remove-Item -r $heroku/*

# Build Client
Push-Location $root/Client
npm run build
Pop-Location

# Inline Critical CSS
Push-Location $root/Server
npm run inline-critical-css
Pop-Location

# Gzip all assets
Push-Location $root/Server/dist
gzip -r *
Pop-Location

# Add robots.txt
Copy-Item $root/Server/robots.txt $root/Server/dist/robots.txt

# Copy to heroku Repo
Copy-Item  $root/Server/* $heroku/
Copy-Item -Recurse  $root/Server/dist/* $heroku/dist

# Deploy to Heroku
Push-Location $heroku
Remove-Item .gitignore
git add .
git status
git commit -m "Deploy"
git push heroku master
Pop-Location
