Param(
  [string]$RepoUrl = "https://github.com/vicky-a1/zivikalabs.git",
  [string]$UserName = "vicky-a1",
  [string]$Token = ""
)

if (-not $Token) {
  if ($Env:GITHUB_TOKEN) {
    $Token = $Env:GITHUB_TOKEN
  } else {
    $secure = Read-Host "Enter your GitHub PAT" -AsSecureString
    $Token = (New-Object System.Net.NetworkCredential("", $secure)).Password
  }
}

if (!(Test-Path ".git")) { git init }
git add .
$status = git status --porcelain
if ($status) { git commit -m "Deploy-ready: backend + AI + tests + docs" }
git branch -M main
$remotes = git remote
if (-not ($remotes -match "^origin$")) {
  git remote add origin $RepoUrl
} else {
  git remote set-url origin $RepoUrl
}

$cleanRepo = ($RepoUrl.Trim() -replace '[`"]','').TrimEnd('/')
$authUrl = $cleanRepo.Replace("https://", "https://${UserName}:${Token}@")

git remote set-url origin $cleanRepo
git push $authUrl main
git branch --set-upstream-to=origin/main main
