#! /bin/bash -e

arg=$1
database_folder='../data';
database_file='users.db'
database="${database_folder}/${database_file}";

function help() {
text="$(cat <<-EOF
  ./db.sh script support the following commands:

  add - Adds a new line to the users.db (username – Latin letters only, role – Latin letters only)

  backup - Creates a new file, named %timestamp%-users.db.backup which is a copy of current users.db
  
  restore - Takes last created backup file and replaces users.db with it

  find -  Prompts user to type a username, then prints username and role if such exists in users.db

  list - Prints contents of users.db in format: N. username, role

  list inverse - Prints contents of users.db in format: N. username, role in an opposite order
EOF
)";
echo "$text";
}

function readInput() {
  if [ "$1" == "username" ]; then 
    read username;
    while [[ "$username" =~ [^A-z$] ]]
    do
      echo "Error! Only latin letters. Enter again:";
      readInput username;
    done

  elif [ "$1" == "role" ]; then 
    read role;
    while [[ "$role" =~ [^A-z$] ]]
    do
      echo "Error! Only latin letters. Enter again:";
      readInput role;
    done
  else 
    echo "Error! Only 'username' or 'role'.";
  fi
}

function add() {
  if [[ ! -f  $database ]]; then 
    echo "No database! Do you want to create database? [y/n]";
    read is_create_file;
    if [[ "$is_create_file"  == "y" ]]; then
      mkdir -p $database_folder;
      touch $database;
      echo "Database was created.";
    else
      echo "Close script!";
      exit;  
    fi
  fi

  echo "Enter Username:";
  readInput username;

  echo "Enter Role:";
  readInput role;

  echo "$username, $role" >> $database;
  echo "User was created!"
}

function backup() {
  if [[ -f $database ]]; then
    date=`date +"%s"`;
    backup_path="${database_folder}/${date}-users.db.backup";
    cp  $database $backup_path;
    echo "Backup was created.";
  else
    echo "No database for backup!";
  fi
}

function restore() {
  latest_timestamp=0;
  for file in "${database_folder}"/*
  do
    timestamp=$( echo $file | awk '$1 ~ /[0-9]/ {print}' |  awk -F '/' '{print $3}' | awk -F '-' '{print $1}');
    if [ "$timestamp" > "$latest_timestamp" ]; then 
      latest_timestamp=$timestamp;
    fi
  done

  if [ "$latest_timestamp" == 0 ]; then
    echo "No backup file found";
    exit;
  fi

  backup_path="${database_folder}/${latest_timestamp}-users.db.backup";
  cp  $backup_path $database;
  echo "Successful restore database.";
}

function find() {
  if [[ ! -f $database ]]; then
    echo "No database!";
    exit;
  fi
  echo 'Enter Username:';
  readInput username;
  timestamp=$(( `date +"%s%N"` / 1000000 ));
  tempfile=temp-${timestamp}.txt;
  grep -i -n $username $database | sed 's/:/. /g' > $tempfile;
  if [ ! -s "$tempfile" ]; then 
    echo "User not found";
  fi
  cat $tempfile;
  rm $tempfile;
}

function list() {
  timestamp=$(( `date +"%s%N"` / 1000000 ));
  tempfile=temp-list-${timestamp}.txt;
  grep -i -n '' $database | sed 's/:/. /g' > $tempfile;
  if [[ "$1" == "inverse" ]]; then 
    tac -r $tempfile;
  else 
    cat $tempfile;
  fi
  rm $tempfile;
}

case  $arg in
'') help;;
help) help;;
backup) backup;;
add) add;;
restore) restore;;
find) find;;
list) list $2;;
*) echo "ERROR! No this command";;  
esac
     

