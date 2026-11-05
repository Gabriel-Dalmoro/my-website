import numpy as np
from PIL import Image
from skimage import measure, filters
from fontTools.fontBuilder import FontBuilder
from fontTools.pens.ttGlyphPen import TTGlyphPen

def pip(pt, poly):
    x,y=pt; inside=False; n=len(poly)
    for i in range(n-1):
        x1,y1=poly[i]; x2,y2=poly[i+1]
        if (y1>y)!=(y2>y) and x < (x2-x1)*(y-y1)/(y2-y1+1e-12)+x1: inside=not inside
    return inside
import json, sys

W=1404
def boxes(chars, cols, top, bh):
    bw=(W-140)//cols; out=[]
    for i,c in enumerate(chars):
        x=70+(i%cols)*bw; y=top+(i//cols)*bh; out.append((c,x,y,bw-14,bh-16))
    return out
P=[('ink-1.png', boxes(list('abcdefghijklmnopqrstuvwxyz'),6,200,228)),
   ('ink-2.png', boxes(list('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'),6,200,228)),
   ('ink-3.png', boxes(list('áàâãçéèêíóôõúüñœ.,;:!?\'"()-–/&@#%+=€°→←↑↓'),7,200,200))]
UP=4; SCALE=7.6  # font units per sheet px
glyphs={}; info={}
for fn, bx in P:
    A=np.array(Image.open(fn))[...,3].astype(float)/255
    for c,x,y,w,h in bx:
        base_y=y+int(h*.72)
        reg=A[y+2:y+h-2, x+2:x+w-2]
        if reg.max()<.3: print('MISSING',repr(c)); continue
        big=np.kron(reg, np.ones((UP,UP)))
        big=filters.gaussian(big, sigma=1.6)
        big=np.pad(big,4)
        cs=measure.find_contours(big,.42)
        polys=[]
        for cc in cs:
            if len(cc)<12: continue
            ap=measure.approximate_polygon(cc, tolerance=1.1)
            if len(ap)<4: continue
            # to sheet px coords
            px=(ap[:,1]-4)/UP + x+2; py=(ap[:,0]-4)/UP + y+2
            fx=px; fy=(base_y-py)*SCALE  # y up
            polys.append(np.stack([px, fy],1))
        if not polys: print('NOPOLY',repr(c)); continue
        allx=np.concatenate([p[:,0] for p in polys])
        x0,x1=allx.min(),allx.max()
        polys=[np.stack([(p[:,0]-x0)*SCALE+22, p[:,1]],1) for p in polys]
        adv=int((x1-x0)*SCALE+44)
        # orientation by nesting depth
        out=[]
        for i,p in enumerate(polys):
            depth=sum(1 for j,q in enumerate(polys) if j!=i and pip(p[0],q))
            area=0.5*np.sum(p[:-1,0]*p[1:,1]-p[1:,0]*p[:-1,1])
            want_cw = depth%2==0   # TrueType outer = clockwise (negative area in y-up)
            if (area<0)!=want_cw: p=p[::-1]
            out.append(p)
        glyphs[c]=(out,adv)
print(len(glyphs),'glyphs')
names=['.notdef','space']; cmap={32:'space'}; adv={'.notdef':500,'space':250}; G={}
pen=TTGlyphPen(None); G['.notdef']=pen.glyph(); pen=TTGlyphPen(None); G['space']=pen.glyph()
for c,(polys,a) in glyphs.items():
    n='uni%04X'%ord(c); names.append(n); cmap[ord(c)]=n; adv[n]=a
    pen=TTGlyphPen(None)
    for p in polys:
        pts=[(int(round(px)),int(round(py))) for px,py in p[:-1]]
        pen.moveTo(pts[0])
        for q in pts[1:]: pen.lineTo(q)
        pen.closePath()
    G[n]=pen.glyph()
# fallbacks: curly quotes, middle dot
for src,dst in [("'",'’'),("'",'‘'),('"','“'),('"','”'),('.','·'),('-','—')]:
    if src in glyphs: cmap[ord(dst)]='uni%04X'%ord(src)
fb=FontBuilder(1000,isTTF=True)
fb.setupGlyphOrder(names); fb.setupCharacterMap(cmap); fb.setupGlyf(G)
fb.setupHorizontalMetrics({n:(adv[n],0) for n in names})
fb.setupHorizontalHeader(ascent=900,descent=-300)
fb.setupNameTable({'familyName':'Gabriel Hand','styleName':'Regular'})
fb.setupOS2(sTypoAscender=900,sTypoDescender=-300,usWinAscent=1000,usWinDescent=350)
fb.setupPost()
fb.font['glyf'].glyphs  # noop
for g in fb.font['glyf'].glyphs.values(): g.recalcBounds(fb.font['glyf'])
fb.save('GabrielHand.ttf')
fb.font.flavor='woff'; fb.save('GabrielHand.woff')
print('saved')
