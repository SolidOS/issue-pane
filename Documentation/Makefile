
# Make HTML from githublike markdown

.SUFFIXES: .html .md

# https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/3.0.1/
.md.html:
	echo > $@ '<head><link rel="stylesheet" href="github-markdown.css" /></head><body class="markdown-body">'

	md2html --dialect Maruku $< >> $@
	tidy -asxml -m $@ || echo ignore tidy error
