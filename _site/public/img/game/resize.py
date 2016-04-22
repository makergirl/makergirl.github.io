import os, sys, fnmatch
from PIL import Image

size = 281, 281
matches = []

for root, dirnames, filenames in os.walk(sys.argv[1]):
    for filename in fnmatch.filter(filenames, '*.jpg'):
        matches.append(os.path.join(root, filename))
print matches

for infile in matches:
    outfile = os.path.splitext(infile)[0].strip() + ".png"
    if infile != outfile:
        try:
            # im = Image.open(infile)
            # im.thumbnail(size, Image.ANTIALIAS)
            # im.save(outfile, "JPEG")

            img = Image.open(infile)
            img = img.convert("RGBA")
            datas = img.getdata()

            newData = []
            for item in datas:
                if item[0] == 255 and item[1] == 255 and item[2] == 255:
                    newData.append((255, 255, 255, 0))
                else:
                    newData.append(item)

            img.putdata(newData)
            img.save(outfile, "JPEG")

        except IOError:
            print "Cannot create thumbnail for '%s'" % infile

# Deleting files: find public -type f -name '*_thumbnail.jpg' -exec rm {} +
