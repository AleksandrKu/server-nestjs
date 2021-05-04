#! /bin/bash 

arg=$1
database_folder='../data';
database_file='users.db'
database="${database_folder}/${database_file}";
function help() {
  echo "Help"
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
      mkdir $database_folder;
      touch $database;
      echo "File was created.";
    else
      echo "Close script!";
      exit 0;  
    fi
  fi

  echo "Enter Username:";
  readInput username;

  echo "Enter Role:";
  readInput role;

  echo "$username, $role" >> $database;
}

function backup() {
  echo "Backup"
}

function restore() {
  echo "Restore"
}

function find() {
  echo "Find"
}

function list() {
  echo "List"
}

case  $arg in
'') help;;
help) help;;
backup) backup;;
add) add;;
restore) restore;;
find) find;;
list) list;;
*) echo "ERROR! No this command";;  
esac
     

