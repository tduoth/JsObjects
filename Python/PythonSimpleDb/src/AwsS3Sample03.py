#!/usr/bin/python

import os
import threading
import sys
import boto3 as boto
from boto3.s3.transfer import S3Transfer


class ProgressPercentage(object):
    def __init__(self, filename):
        self._filename = filename
        self._size = float(os.path.getsize(filename))
        self._seen_so_far = 0
        self._lock = threading.Lock()

    def __call__(self, bytes_amount):
        # To simplify we'll assume this is hooked up
        # to a single filename.
        with self._lock:
            self._seen_so_far += bytes_amount
            percentage = (self._seen_so_far / self._size) * 100
            sys.stdout.write(
                "\r%s  %s / %s  (%.2f%%)" % (
                    self._filename, self._seen_so_far, self._size,
                    percentage))
            sys.stdout.flush()


class S3Buckets():
    def __init__(self):
        self.bucketName = 's3bucket01.elvenware.com'
        self.keyName = 'test/test01.csv'
        self.localFileName = os.environ['ELF_WRITE_DATA'] + '/Presidents.csv'

    def transferFile(self):
        """
        This method is safest because it handles large and small files, 
        resuming uploads, etc
        """
        client = boto.client('s3', 'us-west-2')
        transfer = S3Transfer(client)
        result = transfer.upload_file(self.localFileName, self.bucketName, self.keyName,
                                      extra_args={'ACL': 'public-read'},
                                      callback=ProgressPercentage(self.localFileName))
        print(result)

    def CreateBucketAndFile(self):
        s3 = boto.resource('s3')
        # bucket = s3.create_bucket(Bucket=self.bucketName, CreateBucketConfiguration={'LocationConstraint': 'us-west-2'})
        # s3.Object(self.bucketName, self.bucketKeyName).put(Body=open(self.localFileName, 'r', encoding='utf-8'))
        # foo = s3.Object(self.bucketName, self.keyName).put(Body=self.localFileName)
        foo = s3.Bucket(self.bucketName).upload_file(self.localFileName, self.keyName)
        print(foo)
        # key = bucket.new_key(self.bucketFileName)
        # key.set_contents_from_filename(self.localFileName)
        # key.set_acl('public-read')

    def GetFile(self):
        client = boto.client('s3', 'us-west-2')
        transfer = S3Transfer(client)
        transfer.download_file(self.bucketName, self.keyName, 'foo.csv')

    def deleteKey(self, keyName):
        s3 = boto.resource('s3')
        key = s3.Object(self.bucketName, self.keyName)
        print(key)
        key.delete()
        # bucket = s3.Bucket(self.bucketName)
        # print(bucket)
        # for key in bucket:
        #    print(key)

        # for obj in bucket.objects.filter(Prefix='test/'):
        #    print(obj)
        # s3.Object(bucket.name, obj.key).delete()


s3Buckets = S3Buckets()
# s3Buckets.CreateBucketAndFile()
# s3Buckets.transferFile()
# s3Buckets.GetFile()
s3Buckets.deleteKey('foo')

tag = {
    'ETag': '"57e2095a3ba1d838130370460df86289"',
    'ResponseMetadata': {
        'HTTPHeaders': {
            'x-amz-request-id': '75812B436CDCD026',
            'date': 'Tue, 19 Jul 2016 15:34:08 GMT',
            'content-length': '0',
            'etag': '"57e2095a3ba1d838130370460df86289"',
            'server': 'AmazonS3',
            'x-amz-id-2': 'mMxPQvkrtDg1Vpt41voJdXyKIhYW14APTlZLE9njyMAtHaxjM24nDkynJEMbHcKJdMZLeMK3rls='
        },
        'HTTPStatusCode': 200,
        'RequestId': '75812B436CDCD026',
        'HostId': 'mMxPQvkrtDg1Vpt41voJdXyKIhYW14APTlZLE9njyMAtHaxjM24nDkynJEMbHcKJdMZLeMK3rls='
    }
}
