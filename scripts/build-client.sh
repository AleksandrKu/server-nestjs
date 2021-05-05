#! /bin/bash -e

zip_file='client-app.zip';
zip_folder='../dist';
zip_path="${zip_folder}/${zip_file}";
build_command=$ENV_CONFIGURATION;

if [ -z "$build_command" ]; then 
  build_command='npm run build';
fi

cd ../client && `echo $build_command`;

if [[ -f $zip_path ]]; then 
  rm $zip_path;
fi

zip -r $zip_path "${zip_folder}/client"