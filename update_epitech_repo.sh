URL=${1:-"https://github.com/EpitechMscProPromo2023/T-ESP-800-19621-Fiches-Chips-2"}
LOCAL_BRANCH=${2:-"master:main"}

git fetch origin master:master
git push --force $URL $LOCAL_BRANCH
