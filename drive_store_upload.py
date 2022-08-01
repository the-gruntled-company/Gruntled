# drive_store_upload.py
# this file is an example to upload crap to the gdrive account
# follows this tut: https://www.thepythoncode.com/article/using-google-drive--api-in-python

# from __future__ import print_function
import pickle
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.http import MediaFileUpload
from datetime import datetime

# TODO: figure out where the list of scopes can be found & comment the link here
# SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly', 'https://www.googleapis.com/auth/drive.file']

# NOTE: SCOPES can be a single string for the first token request
# BUT the refresh function requires it to be a list object ... thanks google docs 
# (https://stackoverflow.com/questions/60329078/gmail-api-google-auth-exceptions-refresherror-invalid-scope)
SCOPES = ['https://www.googleapis.com/auth/drive']

def get_gdrive_service():
    creds = None
    # The file token.pickle stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file('client_secrets.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)
    # return Google Drive API service
    return build('drive', 'v3', credentials=creds)

def upload_files(fname = "test.txt",upload_folder="1QiVjETYMJNp3i-yENfwR_rUwK_GQdGHi"):
    """
    Creates a folder and upload a file to it
    """
    # authenticate account
    service = get_gdrive_service()
    # folder details we want to make
    folder_metadata = {
        "name": str(datetime.now())[:-7],
        "mimeType": "application/vnd.google-apps.folder",
        "parents": [upload_folder]
    }
    # create the folder
    file = service.files().create(body=folder_metadata, fields="id").execute()
    # get the folder id
    folder_id = file.get("id")
    print("Folder ID:", folder_id)
    # upload a file text file
    # first, define file metadata, such as the name and the parent folder ID
    file_metadata = {
        "name": fname,
        "parents": [folder_id]
    }
    # upload
    media = MediaFileUpload(fname, resumable=True)
    file = service.files().create(body=file_metadata, media_body=media, fields='id').execute()
    print("File created, id:", file.get("id"))

upload_files(fname = "drive_store_upload.py")