# Some example scripts to upload crap to gdrive using a credential store

run:
```
mamba env create -f environment.yml
mamba activate drive_upload_demo
python drive_store_upload.py
```

It should create a copy of the `drive_store_upload.py` file in the upload directory to the Gruntled gacct.

It will create a subfolder for the upload time.