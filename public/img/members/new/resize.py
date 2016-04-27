import os, sys, fnmatch
from PIL import Image

size = 250, 250
matches = []

for root, dirnames, filenames in os.walk(sys.argv[1]):
    for filename in fnmatch.filter(filenames, '*3.jpg'):
        matches.append(os.path.join(root, filename))
print matches

for infile in matches:
    outfile = os.path.splitext(infile)[0] + "s.jpg"
    if infile != outfile:
        try:
            im = Image.open(infile)
            im.thumbnail(size, Image.ANTIALIAS)
            im.save(outfile, "JPEG")

            # png = Image.open(infile)
            # png.load() # required for png.split()
            #
            # background = Image.new("RGB", png.size, (255, 255, 255))
            # background.paste(png, mask=png.split()[3]) # 3 is the alpha channel
            # background.thumbnail(size, Image.ANTIALIAS)
            #
            # background.save(outfile, "JPEG")
        except IOError:
            print "Cannot create thumbnail for '%s'" % infile

# Deleting files: find public -type f -name '*_thumbnail.jpg' -exec rm {} +
