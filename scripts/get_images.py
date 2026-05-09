#!/usr/bin/env python3
"""
Gina 学英语 - 获取单词配图
使用 Pexels API 为每个单词搜索配图

用法:
  python3 get_images.py <pexels_api_key>

API key 申请: https://www.pexels.com/api/
免费额度: 200 次/天
"""

import json
import time
import sys
import os
import urllib.request
import urllib.error

def search_image(word, api_key, max_results=3):
    """使用 Pexels API 搜索图片"""
    url = f"https://api.pexels.com/v1/search?query={word}&per_page={max_results}"
    
    req = urllib.request.Request(url)
    req.add_header('Authorization', api_key)
    req.add_header('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)')
    
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read().decode())
            if data.get('photos'):
                photo = data['photos'][0]
                return {
                    'url': photo['src']['large'],
                    'thumb': photo['src']['medium'],
                    'photographer': photo['photographer'],
                    'link': photo['url']
                }
    except Exception as e:
        print(f"  ⚠️  {word}: {e}")
    
    return None

def main():
    if len(sys.argv) < 2:
        print("用法: python3 get_images.py <pexels_api_key>")
        print("API key 申请: https://www.pexels.com/api/")
        sys.exit(1)
    
    api_key = sys.argv[1]
    
    # 读取词库数据
    base_dir = os.path.dirname(os.path.abspath(__file__))
    parent_dir = os.path.dirname(base_dir)
    
    sql_files = [
        os.path.join(parent_dir, 'data', 'seed_down.sql'),
        os.path.join(parent_dir, 'data', 'seed_up.sql')
    ]
    
    # 解析 SQL 获取单词
    import re
    words = []
    for sql_file in sql_files:
        if os.path.exists(sql_file):
            with open(sql_file, 'r', encoding='utf-8') as f:
                content = f.read()
            pattern = r"INSERT INTO word_list.*?VALUES\s*\((.*?)\);"
            matches = re.findall(pattern, content)
            for match in matches:
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
                    if word['word'] and word['word'] != '------':
                        words.append(word)
    
    print(f"📚 共 {len(words)} 个单词，开始获取配图...\n")
    
    # 为每个单词获取配图
    images = {}
    for i, word in enumerate(words):
        word_str = word['word']
        print(f"[{i+1}/{len(words)}] {word_str}...", end=' ')
        
        # 搜索图片
        result = search_image(word_str, api_key)
        
        if result:
            images[word_str] = result
            print(f"✅ {result['photographer']}")
        else:
            print("⚠️ 未找到")
        
        # Pexels 限流: 200次/天 ≈ 2次/秒
        time.sleep(0.5)
    
    # 保存结果
    output_file = os.path.join(parent_dir, 'data', 'word_images.json')
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(images, f, ensure_ascii=False, indent=2)
    
    found = len(images)
    print(f"\n✅ 完成! 找到 {found}/{len(words)} 个配图")
    print(f"结果已保存: {output_file}")

if __name__ == '__main__':
    main()
