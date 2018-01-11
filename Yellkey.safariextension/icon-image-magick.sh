convert w.png -colorspace gray w.png
convert w.png -alpha copy -channel alpha -negate +channel -fx '#000' w-g.png