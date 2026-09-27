"""Gera os ícones vetoriais do Android a partir da geometria do logotipo (docs/design/logo/icon-a-direto.svg).

Uso: pip install shapely && python3 docs/design/src/generate_android_icons.py

Tudo é convertido para o sistema de coordenadas final de cada drawable (sem transformações de grupo), para que
os gradientes fiquem idênticos em qualquer versão do Android.
"""

from pathlib import Path

from shapely import affinity
from shapely.geometry import LineString, Polygon, box
from shapely.ops import unary_union

RES = Path(__file__).resolve().parents[3] / 'android/app/src/main/res'

# Geometria do logotipo no espaço 1024×1024 do SVG.
BUBBLE = unary_union([
    box(380, 390, 644, 554).buffer(168, quad_segs=32),
    Polygon([(300, 660), (236, 846), (470, 712)]).buffer(14, join_style='round', quad_segs=16),
])
ARROW_LINES = [[(404, 580), (620, 364)], [(456, 364), (620, 364), (620, 528)]]
ARROW_WIDTH = 80
ARROW = unary_union([
    LineString(line).buffer(ARROW_WIDTH / 2, cap_style='round', join_style='round', quad_segs=16)
    for line in ARROW_LINES
])

BUBBLE_START, BUBBLE_END = (212, 222), (812, 842)
MINT, GREEN, INK = '#FF5CF0B4', '#FF16C47F', '#FF062017'
BG_TOP, BG_BOTTOM = '#FF12402F', '#FF061A13'


def fmt(value):
    return f'{value:.2f}'.rstrip('0').rstrip('.')


def ring(coords):
    points = list(coords)[:-1]
    head = f'M{fmt(points[0][0])},{fmt(points[0][1])}'
    return head + ''.join(f'L{fmt(x)},{fmt(y)}' for x, y in points[1:]) + 'Z'


def path_data(geometry):
    polygons = getattr(geometry, 'geoms', [geometry])
    return ''.join(
        ring(p.exterior.coords) + ''.join(ring(i.coords) for i in p.interiors) for p in polygons
    )


def transform(scale, offset):
    def apply(geometry):
        return affinity.translate(affinity.scale(geometry, scale, scale, origin=(0, 0)), offset, offset)

    def point(x, y):
        return scale * x + offset, scale * y + offset

    return apply, point


def gradient(start, end, first, last):
    return f'''
            <aapt:attr name="android:fillColor">
                <gradient
                    android:type="linear"
                    android:startX="{fmt(start[0])}"
                    android:startY="{fmt(start[1])}"
                    android:endX="{fmt(end[0])}"
                    android:endY="{fmt(end[1])}">
                    <item android:offset="0" android:color="{first}" />
                    <item android:offset="1" android:color="{last}" />
                </gradient>
            </aapt:attr>'''


def arrow(point, scale):
    data = ''.join(
        f'M{fmt(point(*line[0])[0])},{fmt(point(*line[0])[1])}'
        + ''.join(f'L{fmt(point(x, y)[0])},{fmt(point(x, y)[1])}' for x, y in line[1:])
        for line in ARROW_LINES
    )
    return f'''
    <path
        android:pathData="{data}"
        android:strokeColor="{INK}"
        android:strokeWidth="{fmt(ARROW_WIDTH * scale)}"
        android:strokeLineCap="round"
        android:strokeLineJoin="round" />'''


def mark(scale, offset):
    apply, point = transform(scale, offset)
    return f'''
    <path android:pathData="{path_data(apply(BUBBLE))}">{gradient(point(*BUBBLE_START), point(*BUBBLE_END), MINT, GREEN)}
    </path>{arrow(point, scale)}'''


def vector(size, body):
    return f'''<?xml version="1.0" encoding="utf-8"?>
<!-- Gerado por docs/design/src/generate_android_icons.py. Não edite à mão. -->
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:aapt="http://schemas.android.com/aapt"
    android:width="{size}dp"
    android:height="{size}dp"
    android:viewportWidth="{size}"
    android:viewportHeight="{size}">{body}
</vector>
'''


def write(name, content):
    target = RES / name
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(content)
    print('wrote', target.relative_to(RES.parents[3]))


# Ícone adaptativo: canvas de 108 dp, área segura de 66 dp (raio 33). O ponto mais distante do logotipo
# (a ponta do balão) fica a ~433 unidades do centro, então a escala 0,075 o mantém dentro da área segura.
LAUNCHER_SCALE = 0.075
LAUNCHER_OFFSET = 54 - 512 * LAUNCHER_SCALE

write('drawable/ic_launcher_background.xml', vector(108, f'''
    <path android:pathData="M0,0H108V108H0Z">{gradient((0, 0), (108, 108), BG_TOP, BG_BOTTOM)}
    </path>'''))

write('drawable/ic_launcher_foreground.xml', vector(108, mark(LAUNCHER_SCALE, LAUNCHER_OFFSET)))

apply, _ = transform(LAUNCHER_SCALE, LAUNCHER_OFFSET)
write('drawable/ic_launcher_monochrome.xml', vector(108, f'''
    <path
        android:fillColor="#FFFFFFFF"
        android:fillType="evenOdd"
        android:pathData="{path_data(apply(BUBBLE.difference(ARROW)))}" />'''))

adaptive = '''<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@drawable/ic_launcher_background" />
    <foreground android:drawable="@drawable/ic_launcher_foreground" />
    <monochrome android:drawable="@drawable/ic_launcher_monochrome" />
</adaptive-icon>
'''
write('mipmap-anydpi-v26/ic_launcher.xml', adaptive)
write('mipmap-anydpi-v26/ic_launcher_round.xml', adaptive)

# Splash (Android 12+ / core-splashscreen): ícone "sem fundo" de 288 dp, visível dentro de um círculo de 192 dp.
SPLASH_SCALE = 0.18
SPLASH_OFFSET = 144 - 512 * SPLASH_SCALE
write('drawable/splash_icon.xml', vector(288, f'''
    <path android:pathData="M144,48A96,96 0 1 1 144,240A96,96 0 1 1 144,48Z">{gradient((48, 48), (240, 240), BG_TOP, BG_BOTTOM)}
    </path>{mark(SPLASH_SCALE, SPLASH_OFFSET)}'''))
