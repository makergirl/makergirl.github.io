import os, sys, fnmatch
from PIL import Image

size = 281, 281
matches = []

for root, dirnames, filenames in os.walk(sys.argv[1]):
    for filename in fnmatch.filter(filenames, '*.jpg'):
        matches.append(os.path.join(root, filename))
print matches

for infile in matches:
    outfile = os.path.splitext(infile)[0].strip() + ".jpg"
    if infile != outfile:
        try:
            im = Image.open(infile)
            im.thumbnail(size, Image.ANTIALIAS)
            im.save(outfile, "JPEG")
        except IOError:
            print "Cannot create thumbnail for '%s'" % infile

# Deleting files: find public -type f -name '*_thumbnail.jpg' -exec rm {} +
