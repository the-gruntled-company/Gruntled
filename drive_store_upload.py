# drive_store_upload.py
# this file is an example to upload crap to the gdrive account

from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive

gauth = GoogleAuth()           
drive = GoogleDrive(gauth)

upload_file_list = ['drive_store_upload.py']
for upload_file in upload_file_list:
	gfile = drive.CreateFile({'parents': [{'id': '1QiVjETYMJNp3i-yENfwR_rUwK_GQdGHi'}]})
	# Read file and set it as the content of this instance.
	gfile.SetContentFile(upload_file)
	gfile.Upload() # Upload the file.