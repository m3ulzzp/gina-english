#!/usr/bin/env python3
"""
Gina 学英语 — 词表解析脚本
将 Markdown 词表文件解析为 SQL 种子数据

用法:
  python3 parse_wordlist.py <markdown_file> [--output output.sql]
  
输出格式:
  - 每个单词一条 INSERT 语句
  - 字段: word, phonetic, pos, meaning, example, unit, grade, level
"""

import re
import sys
import argparse
from dataclasses import dataclass
from typing import List, Optional


@dataclass
class Word:
    word: str
    phonetic: str
    pos: str  # part of speech
    meaning: str
    example: Optional[str]
    unit: str
    grade: str
    level: str  # n/v/adj/etc


def parse_table_format(content: str, grade: str = "二年级", level: str = "下册") -> List[Word]:
    """解析表格格式的 Markdown（如"词表 - 沪教版二年级下册.md"）"""
    words = []
    current_unit = ""
    
    # 匹配 Unit 标题
    unit_pattern = re.compile(r'^## (Unit \d+ .+)$', re.MULTILINE)
    lines = content.split('\n')
    
    for i, line in enumerate(lines):
        # 检测 Unit 标题
        unit_match = unit_pattern.match(line)
        if unit_match:
            current_unit = unit_match.group(1).strip()
            continue
        
        # 跳过非表格行
        if not line.startswith('|'):
            continue
        
        # 解析表格行
        cells = [c.strip() for c in line.split('|') if c.strip()]
        
        # 第一行是表头，跳过
        if any(h in ('单词', '音标', '词性', '中文释义') for h in cells):
            continue
        
        # 跳过分隔线（全是 - 的行）
        if all(all(c in '- ' for c in cell) for cell in cells):
            continue
        
        # 解析数据行
        if len(cells) >= 4:
            word = cells[0]
            phonetic = cells[1] if len(cells) > 1 else ""
            pos = cells[2] if len(cells) > 2 else ""
            meaning = cells[3] if len(cells) > 3 else ""
            example = cells[4] if len(cells) > 4 else None
            
            words.append(Word(
                word=word,
                phonetic=phonetic,
                pos=pos,
                meaning=meaning,
                example=example,
                unit=current_unit,
                grade=grade,
                level=level
            ))
    
    return words


def parse_list_format(content: str, grade: str = "二年级", level: str = "上册") -> List[Word]:
    """解析列表格式的 Markdown（如"沪教牛津版 上海二年级英语 分单元单词+短语（完整版）.md"）"""
    words = []
    current_unit = ""
    current_section = ""  # 单词 or 短语
    
    lines = content.split('\n')
    i = 0
    
    while i < len(lines):
        line = lines[i]
        
        # 检测 Unit 标题
        unit_match = re.match(r'^## (Unit \d+ .+)$', line)
        if unit_match:
            current_unit = unit_match.group(1).strip()
            i += 1
            continue
        
        # 检测"### 单词"或"### 必会短语"
        section_match = re.match(r'^### (.+)$', line)
        if section_match:
            current_section = section_match.group(1).strip()
            i += 1
            continue
        
        # 解析列表项 "- word 释义"
        if line.startswith('- ') and current_section == '单词':
            item = line[2:].strip()
            # 解析 "word 释义" 格式
            match = re.match(r'^(\w+)\s+(.+)$', item)
            if match:
                word = match.group(1)
                meaning = match.group(2)
                words.append(Word(
                    word=word,
                    phonetic="",
                    pos="",
                    meaning=meaning,
                    example=None,
                    unit=current_unit,
                    grade=grade,
                    level=level
                ))
        
        i += 1
    
    return words


def generate_sql(words: List[Word], db_name: str = "gina_english") -> str:
    """生成 SQL 种子数据"""
    sql_lines = []
    
    # 创建表
    sql_lines.append(f"-- Gina 学英语词库种子数据")
    sql_lines.append(f"-- 生成时间：{__import__('datetime').datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    sql_lines.append(f"-- 词数：{len(words)}")
    sql_lines.append(f"")
    sql_lines.append(f"CREATE TABLE IF NOT EXISTS word_list (")
    sql_lines.append(f"    id INTEGER PRIMARY KEY AUTOINCREMENT,")
    sql_lines.append(f"    word TEXT NOT NULL,")
    sql_lines.append(f"    phonetic TEXT,")
    sql_lines.append(f"    pos TEXT,")
    sql_lines.append(f"    meaning TEXT NOT NULL,")
    sql_lines.append(f"    example TEXT,")
    sql_lines.append(f"    unit TEXT,")
    sql_lines.append(f"    grade TEXT,")
    sql_lines.append(f"    level TEXT,")
    sql_lines.append(f"    created_at DATETIME DEFAULT CURRENT_TIMESTAMP")
    sql_lines.append(f");")
    sql_lines.append(f"")
    
    # 插入数据
    for w in words:
        meaning_escaped = w.meaning.replace("'", "''")
        word_escaped = w.word.replace("'", "''")
        phonetic_escaped = w.phonetic.replace("'", "''") if w.phonetic else None
        pos_escaped = w.pos.replace("'", "''") if w.pos else None
        example_escaped = w.example.replace("'", "''") if w.example else None
        unit_escaped = w.unit.replace("'", "''") if w.unit else None
        grade_escaped = w.grade.replace("'", "''") if w.grade else None
        level_escaped = w.level.replace("'", "''") if w.level else None
        
        sql_lines.append(f"INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES")
        sql_lines.append(f"    ('{word_escaped}', '{phonetic_escaped}', '{pos_escaped}', '{meaning_escaped}', '{example_escaped}', '{unit_escaped}', '{grade_escaped}', '{level_escaped}');")
    
    sql_lines.append(f"")
    return '\n'.join(sql_lines)


def main():
    parser = argparse.ArgumentParser(description='解析 Gina 学英语词表')
    parser.add_argument('input', help='Markdown 词表文件路径')
    parser.add_argument('--output', '-o', help='输出 SQL 文件路径 (默认 stdout)')
    parser.add_argument('--grade', default='二年级', help='年级 (默认: 二年级)')
    parser.add_argument('--level', default='下册', help='级别 (默认: 下册)')
    parser.add_argument('--format', choices=['table', 'list', 'auto'], default='auto', help='解析格式')
    
    args = parser.parse_args()
    
    with open(args.input, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 自动检测格式
    fmt = args.format
    if fmt == 'auto':
        if '| 单词 |' in content or '单词 | 音标' in content:
            fmt = 'table'
        else:
            fmt = 'list'
    
    # 解析
    if fmt == 'table':
        words = parse_table_format(content, args.grade, args.level)
    else:
        words = parse_list_format(content, args.grade, args.level)
    
    # 生成 SQL
    sql = generate_sql(words)
    
    if args.output:
        with open(args.output, 'w', encoding='utf-8') as f:
            f.write(sql)
        print(f"✅ 已写入 {args.output}，共 {len(words)} 个单词")
    else:
        print(sql)
    
    return len(words)


if __name__ == '__main__':
    main()
