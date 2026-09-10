from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import hashlib, json, random, re

OUT = Path('public/generated/cards')
W, H = 960, 600
RATIO = W / H
KEYS = json.load(open('scripts/card-visual-keys.json'))['keys']
LOGO = Path('/mnt/data/afyra_logo_extract/Logo/Afyra Digital Name & Logo for GPT.png')
SALT = 'afyra-sitewide-context-visuals-v7'

C = {
    'mint': (222, 241, 240),
    'teal': (0, 187, 160),
    'deep': (0, 68, 62),
    'orange': (255, 150, 13),
    'white': (255, 255, 255),
}

try:
    FONT_BOLD = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 27)
    FONT_MED = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 16)
    FONT_SM = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 14)
except Exception:
    FONT_BOLD = FONT_MED = FONT_SM = ImageFont.load_default()

BASES = {
    'creative': ['/mnt/data/afyra_digital_creative_studio_branding.png', '/mnt/data/afyra_digital_brand_workspace.png', '/mnt/data/afyra_digital_healthcare_storytelling_workspace.png'],
    'strategy': ['/mnt/data/afyra_digital_growth_partnership_meeting.png', '/mnt/data/afyra_digital_healthcare_strategy_session.png', '/mnt/data/afyra_digital_teamwork_session.png', '/mnt/data/afyra_digital_partnership_meeting.png', '/mnt/data/afyra_digital_strategy_workspace.png'],
    'lead': ['/mnt/data/afyra_digital_consultation_in_a_modern_clinic.png', '/mnt/data/afyra_digital_clinic_consultation.png', '/mnt/data/doctor_patient_consultation_at_afyra_digital.png', '/mnt/data/afyra_digital_clinic_welcome.png', '/mnt/data/afyra_digital_partnership_meeting.png'],
    'social': ['/mnt/data/afyra_digital_brand_workspace.png', '/mnt/data/afyra_digital_healthcare_storytelling_workspace.png', '/mnt/data/afyra_digital_teamwork_session.png', '/mnt/data/afyra_digital_consultation_in_a_modern_clinic.png'],
    'search': ['/mnt/data/local_visibility_for_clinic_growth.png', '/mnt/data/afyra_digital_clinic_welcome.png', '/mnt/data/afyra_digital_modern_office_lobby.png'],
    'web': ['/mnt/data/afyra_digital_creative_studio_branding.png', '/mnt/data/afyra_digital_modern_office_lobby.png', '/mnt/data/afyra_digital_growth_workspace.png', '/mnt/data/local_visibility_for_clinic_growth.png'],
    'health': ['/mnt/data/afyra_digital_healthcare_consultation.png', '/mnt/data/afyra_digital_healthcare_collaboration.png', '/mnt/data/afyra_digital_healthcare_team.png', '/mnt/data/afyra_digital_hospital_partnership.png', '/mnt/data/afyra_digital_clinic_welcome.png', '/mnt/data/afyra_digital_luxury_beauty_clinic.png', '/mnt/data/afyra_digital_skin_consultation.png'],
    'program': ['/mnt/data/afyra_digital_strategy_showcase.png', '/mnt/data/afyra_digital_authority_workspace.png', '/mnt/data/afyra_digital_growth_partnership_meeting.png', '/mnt/data/afyra_digital_partnership_meeting.png'],
    'trust': ['/mnt/data/afyra_digital_authority_workspace.png', '/mnt/data/afyra_digital_healthcare_team.png', '/mnt/data/afyra_digital_hospital_partnership.png', '/mnt/data/afyra_digital_clinic_consultation.png'],
    'generic': ['/mnt/data/afyra_digital_growth_partnership_meeting.png', '/mnt/data/afyra_digital_partnership_meeting.png', '/mnt/data/afyra_digital_modern_office_lobby.png', '/mnt/data/afyra_digital_teamwork_session.png'],
}

LABELS = {
    'creative': 'Brand & Creative',
    'strategy': 'Growth Strategy',
    'lead': 'Patient Acquisition',
    'social': 'Social & Communication',
    'search': 'Search & Local Visibility',
    'web': 'Website & Digital Presence',
    'health': 'Healthcare Marketing',
    'program': 'Programs & Pricing',
    'trust': 'Trust & Authority',
    'generic': 'Afyra Digital',
}

STOP = {'about','solutions','service','feature','detail','process','program','proof','showcase','crosslink','outcome','principle','healthcare','programs','plan','term','vision','positioning','journey','need','audience','note','decision','insight','placeholder','website','development','approved','afyra','digital','solution','for','the','and'}

# Preload source images for speed
CACHE = {p: Image.open(p).convert('RGB') for group in BASES.values() for p in group}
LOGO_IMG = Image.open(LOGO).convert('RGBA') if LOGO.exists() else None
if LOGO_IMG:
    LOGO_IMG.thumbnail((56,56), Image.Resampling.LANCZOS)

# Precompute overlay assets
TOP_GRAD = Image.new('RGBA', (W, H), (0,0,0,0))
for y in range(H):
    a = int(95 * (1 - y / H))
    ImageDraw.Draw(TOP_GRAD).line((0,y,W,y), fill=C['deep'] + (a,))
BOT_GRAD = Image.new('RGBA', (W, H), (0,0,0,0))
for y in range(H):
    a = int(140 * max(0, (y/H - .55) / .45))
    ImageDraw.Draw(BOT_GRAD).line((0,y,W,y), fill=(8,15,14,a))
LEFT_WASH = Image.new('RGBA', (W, H), (0,0,0,0))
for x in range(W):
    a = int(45 * (1 - x / W))
    ImageDraw.Draw(LEFT_WASH).line((x,0,x,H), fill=C['teal'] + (a,))


def seed(key):
    return int(hashlib.sha256((SALT + key).encode()).hexdigest()[:16], 16)


def kind(key):
    k = key.lower()
    if any(x in k for x in ['local','search','visibility','google','discovery','seo']): return 'search'
    if any(x in k for x in ['brand-creative-communication','brand','creative','content','educational','identity','storytelling']):
        if not any(x in k for x in ['social-media','community-lead-communication','whatsapp','messenger','instagram','facebook','linkedin']):
            return 'creative'
    if any(x in k for x in ['social','community','whatsapp','messenger','instagram','facebook','linkedin']): return 'social'
    if 'communication' in k and any(x in k for x in ['lead','community','social']): return 'social'
    if any(x in k for x in ['website-development','website','digital-presence','advanced-systems','mobile','usability']): return 'web'
    if any(x in k for x in ['patient','lead','inquiry','conversion','appointment','acquisition']): return 'lead'
    if any(x in k for x in ['doctor','clinic','hospital','aesthetic','cosmetic','healthcare']): return 'health'
    if any(x in k for x in ['program','starter','authority-building','growth-plan','pricing','term']): return 'program'
    if any(x in k for x in ['trust','reputation','credibility','authority','proof','verified']): return 'trust'
    if any(x in k for x in ['strategy','growth','process','scale','vision','positioning','long-term','outcome','system','systems']): return 'strategy'
    return 'generic'


def human_subtitle(key):
    parts = [p for p in re.split(r'[-_]+', key.lower()) if p and p not in STOP]
    parts = parts[:4]
    txt = ' '.join(p.capitalize() for p in parts[1:4] or parts[:3])
    return txt or 'Growth System'


def crop(img, rng, detail=False):
    sw, sh = img.size
    scale = 0.82 if detail else 0.92
    scale -= rng.random() * 0.08
    if sw / sh > RATIO:
        ch = int(sh * scale)
        cw = int(ch * RATIO)
    else:
        cw = int(sw * scale)
        ch = int(cw / RATIO)
    max_x = max(0, sw - cw)
    max_y = max(0, sh - ch)
    x = int(max_x * rng.random())
    y = int(max_y * rng.random())
    return img.crop((x,y,x+cw,y+ch)).resize((W,H), Image.Resampling.LANCZOS)


def draw_panels(base, label, subtitle, detail=False):
    img = base.convert('RGBA')
    img.alpha_composite(TOP_GRAD)
    img.alpha_composite(BOT_GRAD)
    img.alpha_composite(LEFT_WASH)
    d = ImageDraw.Draw(img, 'RGBA')
    # Logo badge
    bx, by, bw, bh = 26, 24, 214, 72
    d.rounded_rectangle((bx,by,bx+bw,by+bh), radius=18, fill=(255,255,255,234), outline=(255,255,255,74), width=1)
    if LOGO_IMG:
        img.alpha_composite(LOGO_IMG, (bx+10, by+8))
    d.text((bx+78, by+18), 'AFYRA', font=FONT_BOLD, fill=C['deep'])
    d.text((bx+78, by+44), 'DIGITAL', font=FONT_BOLD, fill=C['deep'])
    # Content panel
    px0, py0, px1, py1 = 24, H-130, W-24, H-24
    d.rounded_rectangle((px0,py0,px1,py1), radius=24, fill=(7,21,20,175), outline=(255,255,255,34), width=1)
    chip_w = min(310, 26 + int(len(label) * 8.5))
    d.rounded_rectangle((46, H-118, 46+chip_w, H-86), radius=16, fill=C['teal'] + (210,))
    d.text((60, H-110), label, font=FONT_SM, fill=C['white'])
    d.text((48, H-78), subtitle[:34], font=FONT_BOLD, fill=(255,255,255,240))
    foot = 'Detail page visual' if detail else 'Card visual'
    d.text((W-150, H-52), foot, font=FONT_SM, fill=(222,241,240,195))
    return img.convert('RGB')


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for p in OUT.glob('*.webp'):
        p.unlink()
    for i, key in enumerate(KEYS, 1):
        rng = random.Random(seed(key))
        category = kind(key)
        pool = BASES[category]
        source = CACHE[pool[seed(key) % len(pool)]]
        panel = draw_panels(crop(source, rng, key.endswith('-detail')), LABELS[category], human_subtitle(key), key.endswith('-detail'))
        panel.save(OUT / f'{key}.webp', 'WEBP', quality=82, method=4)
        if i % 100 == 0:
            print('generated', i)
    print('generated total', len(KEYS))

if __name__ == '__main__':
    main()
