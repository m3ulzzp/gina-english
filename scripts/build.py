#!/usr/bin/env python3
"""
Gina 学英语 - 构建脚本
1. 读取 SQL 种子数据
2. 读取配图数据（如果有）
3. 运行 Vite build
4. 生成 dist/words.json（前端词库）
5. 生成 _headers（防止 SPA fallback 拦截 JSON）
6. 生成 API 模板文件
7. 生成占位图标
"""

import json
import re
import sys
import os
import subprocess
from pathlib import Path


def parse_sql(sql_file):
    """解析 SQL 文件，提取单词数据"""
    words = []
    with open(sql_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 匹配 INSERT 语句
    pattern = r"INSERT INTO word_list.*?VALUES\s*\((.*?)\);"
    matches = re.findall(pattern, content)
    
    for match in matches:
        # 解析值
        values = []
        current = ''
        in_string = False
        i = 0
        while i < len(match):
            char = match[i]
            if char == "'" and not in_string:
                in_string = True
                i += 1
                continue
            elif char == "'" and in_string:
                # 检查是否是 '' (转义)
                if i + 1 < len(match) and match[i + 1] == "'":
                    current += "'"
                    i += 2
                    continue
                else:
                    in_string = False
                    values.append(current if current else None)
                    current = ''
                    i += 1
                    continue
            elif in_string:
                current += char
            i += 1
        
        if len(values) >= 8:
            word = {
                'word': values[0] if values[0] else '',
                'phonetic': values[1] if values[1] else '',
                'pos': values[2] if values[2] else '',
                'meaning': values[3] if values[3] else '',
                'example': values[4] if values[4] else '',
                'unit': values[5] if values[5] else '',
                'grade': values[6] if values[6] else '',
                'level': values[7] if values[7] else ''
            }
            # 跳过无效的（如分隔线）
            if word['word'] and word['word'] != '------':
                words.append(word)
    
    return words


def load_images(images_file):
    """加载配图数据"""
    if os.path.exists(images_file):
        with open(images_file, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {}


def generate_api(words_with_images, template_file, output_file):
    """生成 API 文件"""
    with open(template_file, 'r', encoding='utf-8') as f:
        template = f.read()
    
    # 转换为 JSON 格式
    words_json = json.dumps(words_with_images, ensure_ascii=False, indent=2)
    
    # 注入到模板
    content = template.replace('{{WORDS_JSON}}', words_json)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ 已生成 {output_file}，共 {len(words_with_images)} 个单词")


def generate_words_json(words_with_images, dist_dir):
    """生成 dist/words.json 供前端直接读取"""
    json_path = dist_dir / 'words.json'
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(words_with_images, f, ensure_ascii=False, indent=2)
    print(f"✅ 已生成 {json_path}，共 {len(words_with_images)} 个单词")


def generate_headers(dist_dir):
    """生成 _headers 文件，防止 SPA fallback 拦截 JSON"""
    headers_path = dist_dir / '_headers'
    headers_content = """/words.json
  Content-Type: application/json
  Cache-Control: public, max-age=3600
"""
    with open(headers_path, 'w', encoding='utf-8') as f:
        f.write(headers_content)
    print(f"✅ 已生成 {headers_path}")


def generate_icons():
    """生成占位图标（简单的彩色方块）"""
    try:
        from PIL import Image
    except ImportError:
        print("⚠️  Pillow 未安装，跳过图标生成")
        return
    
    icon_dir = Path(__file__).parent / 'public'
    icon_dir.mkdir(exist_ok=True)
    
    # 生成 192x192 图标
    img = Image.new('RGB', (192, 192), '#667eea')
    img.save(icon_dir / 'icon-192.png')
    
    # 生成 512x512 图标
    img = Image.new('RGB', (512, 512), '#667eea')
    img.save(icon_dir / 'icon-512.png')
    
    print("✅ 已生成占位图标")


def main():
    base_dir = Path(__file__).parent.resolve().parent
    dist_dir = base_dir / 'dist'
    
    # ========== 第一步：解析词库数据 ==========
    sql_files = [
        base_dir / 'data' / 'seed_down.sql',
        base_dir / 'data' / 'seed_up.sql'
    ]
    
    all_words = []
    for sql_file in sql_files:
        if sql_file.exists():
            words = parse_sql(str(sql_file))
            all_words.extend(words)
            print(f"📚 {sql_file.name}: {len(words)} 个单词")
    
    if not all_words:
        print("❌ 未找到词库数据")
        sys.exit(1)
    
    print(f"\n总计：{len(all_words)} 个单词")
    
    # 加载配图
    images_file = base_dir / 'data' / 'word_images.json'
    images = load_images(str(images_file))
    
    if images:
        print(f"🖼️  已加载 {len(images)} 个配图")
    else:
        print("⚠️  未找到配图数据（运行 get_images.py 获取）")
    
    # 合并数据
    words_with_images = []
    for word in all_words:
        w = dict(word)
        img = images.get(word['word'])
        if img:
            w['image'] = img['url']
            w['photographer'] = img['photographer']
        else:
            w['image'] = None
            w['photographer'] = None
        words_with_images.append(w)
    
    # ========== 第二步：运行 Vite build ==========
    print("\n🔨 运行 Vite build...")
    result = subprocess.run(
        ['npx', 'vite', 'build'],
        cwd=str(base_dir),
        capture_output=True,
        text=True
    )
    if result.returncode == 0:
        print("✅ Vite build 成功")
    else:
        print(f"⚠️  Vite build 有警告/错误:\n{result.stderr}")
        print("继续执行（可能部分失败）...")
    
    # ========== 第三步：生成词库 JSON ==========
    generate_words_json(words_with_images, dist_dir)
    
    # ========== 第四步：生成 _headers ==========
    generate_headers(dist_dir)
    
    # ========== 第五步：生成 API 模板 ==========
    template_file = base_dir / 'functions' / 'api' / 'words.ts.template'
    output_file = base_dir / 'functions' / 'api' / 'words.ts'
    if template_file.exists():
        generate_api(words_with_images, str(template_file), str(output_file))
    else:
        print("⚠️  未找到 API 模板，跳过")
    
    # ========== 第六步：生成图标 ==========
    generate_icons()
    
    print(f"\n🎉 构建完成！部署命令: wrangler pages deploy dist --project-name gina-english")


if __name__ == '__main__':
    main()
