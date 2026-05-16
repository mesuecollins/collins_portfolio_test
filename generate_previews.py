import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_preview_image(background_path, output_path, title, author, twitter, linkedin, fa_icons=None):
    # Load background
    bg = Image.open(background_path).convert('RGBA')
    bg = bg.resize((1200, 630), Image.Resampling.LANCZOS)
    
    # Darken and blur background more for better contrast
    bg = bg.filter(ImageFilter.GaussianBlur(8))
    overlay = Image.new('RGBA', bg.size, (0, 0, 0, 180))
    img = Image.alpha_composite(bg, overlay)
    
    draw = ImageDraw.Draw(img)
    
    # Load bolder fonts
    try:
        title_font = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', 76)
        meta_font = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', 40)
        social_font = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf', 32)
    except IOError:
        title_font = ImageFont.load_default()
        meta_font = ImageFont.load_default()
        social_font = ImageFont.load_default()
        
    try:
        fa_brands = ImageFont.truetype('fa-brands-400.ttf', 120)
        fa_solid = ImageFont.truetype('fa-solid-900.ttf', 120)
    except IOError:
        fa_brands = ImageFont.load_default()
        fa_solid = ImageFont.load_default()

    # Draw Title (handling text wrap)
    margin = 80
    max_width = 1200 - 2 * margin
    
    words = title.split(' ')
    lines = []
    current_line = []
    for word in words:
        current_line.append(word)
        try:
            w = draw.textlength(' '.join(current_line), font=title_font)
        except AttributeError:
            w, _ = draw.textsize(' '.join(current_line), font=title_font)
        
        if w > max_width:
            current_line.pop()
            lines.append(' '.join(current_line))
            current_line = [word]
    lines.append(' '.join(current_line))
    
    y_text = 120
    for line in lines:
        draw.text((margin, y_text), line, font=title_font, fill=(255, 255, 255, 255))
        try:
            _, h = draw.textsize(line, font=title_font)
        except AttributeError:
            bbox = draw.textbbox((0,0), line, font=title_font)
            h = bbox[3] - bbox[1]
        y_text += h + 20
        
    # Draw separator line
    y_text += 40
    draw.line((margin, y_text, margin + 120, y_text), fill=(66, 133, 244, 255), width=10)
    
    # Draw Author and Socials
    y_bottom = 460
    
    # Author
    draw.text((margin, y_bottom), author, font=meta_font, fill=(240, 240, 240, 255))
    
    # Socials
    social_text = f"X (Twitter): {twitter}   |   LinkedIn: {linkedin}"
    draw.text((margin, y_bottom + 65), social_text, font=social_font, fill=(180, 180, 180, 255))

    # Draw FontAwesome Icons if any
    if fa_icons:
        icon_x = 1200 - margin - 120
        icon_y = y_bottom - 20
        for icon_data in reversed(fa_icons):
            code = icon_data["code"]
            font_type = icon_data["type"]
            font = fa_brands if font_type == "brands" else fa_solid
            
            # Colors: we can draw them with a nice gradient or just white with an orange/blue glow
            draw.text((icon_x, icon_y), code, font=font, fill=icon_data.get("color", (255, 255, 255, 255)))
            icon_x -= 150

    img.convert('RGB').save(output_path)
    print(f"Saved {output_path}")

articles = [
    {
        "bg": "public/images/k8s_terraform.png",
        "out": "public/images/k8s_terraform_preview.png",
        "title": "Deploy Kubernetes Load Balancer Service with Terraform on GCP",
        "author": "Mesue Collins Asibong",
        "twitter": "@mesuecollins",
        "linkedin": "in/mesuecollins",
        "icons": [
            {"code": "\uf1a0", "type": "brands", "color": (66, 133, 244, 255)}, # Google
            {"code": "\uf395", "type": "brands", "color": (36, 150, 237, 255)}  # Docker
        ]
    },
    {
        "bg": "public/images/wp_gcp.png",
        "out": "public/images/wp_gcp_preview.png",
        "title": "Deploying a Highly Available WordPress Website on GCP",
        "author": "Mesue Collins Asibong",
        "twitter": "@mesuecollins",
        "linkedin": "in/mesuecollins",
        "icons": [
            {"code": "\uf1a0", "type": "brands", "color": (66, 133, 244, 255)}, # Google
            {"code": "\uf411", "type": "brands", "color": (33, 117, 155, 255)}  # WordPress
        ]
    },
    {
        "bg": "public/images/gke_orchestration.png",
        "out": "public/images/gke_orchestration_preview.png",
        "title": "Advanced Container Orchestration with GKE & GitOps",
        "author": "Mesue Collins Asibong",
        "twitter": "@mesuecollins",
        "linkedin": "in/mesuecollins",
        "icons": [
            {"code": "\uf395", "type": "brands", "color": (36, 150, 237, 255)}, # Docker
            {"code": "\uf0c2", "type": "solid", "color": (255, 255, 255, 255)}   # Cloud
        ]
    },
    {
        "bg": "public/images/compute_startup.png",
        "out": "public/images/compute_startup_preview.png",
        "title": "Deploying Compute Instances with Remote Startup Scripts",
        "author": "Mesue Collins Asibong",
        "twitter": "@mesuecollins",
        "linkedin": "in/mesuecollins",
        "icons": [
            {"code": "\uf1a0", "type": "brands", "color": (66, 133, 244, 255)}, # Google
            {"code": "\uf120", "type": "solid", "color": (255, 255, 255, 255)}   # Terminal
        ]
    }
]

for a in articles:
    create_preview_image(a["bg"], a["out"], a["title"], a["author"], a["twitter"], a["linkedin"], a.get("icons"))
