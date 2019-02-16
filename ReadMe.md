## To make a project global:

step:1 Change directory
cd <ProjectDirectory>

step:2 Add below line as first line of index.js
#!/usr/bin/env node

step:3 Add below lines to package.json
{
  "bin": {
    "installDep": "./installDep.js"
  }
}

step:4
npm link

============================================

## To change global path:

step 1: Change node path using below command
npm config set prefix "~/.npm-global"

step 2: Open profile file using below command.
sudo nano ~/.profile

step 3: Append below given line to profile file
export PATH=~/.npm-global/bin:$PATH

step 4:
source .profile
