# This parses and finds luau code in inputted files and make it support vanilla lua
import re
import os

fixes = {
    r'\bcontinue\b': "return",   # replace continue with return
}

compound_re = re.compile(
    r'(?P<lhs>[A-Za-z_][A-Za-z0-9_]*(?:\s*\.\s*[A-Za-z_][A-Za-z0-9_]*|\s*\[[^\]]+\])*)'  # lhs
    r'\s*(?P<op>\+=|-=|\*=|/=|%=)\s*'                                                    # operator
    r'(?P<rhs>[^;]+)'                                                                    # rhs
)

retards = {
    "+=": "+",
    "-=": "-",
    "*=": "*",
    "/=": "/",
    "%=": "%",
}

def compound_replacer(match):
    lhs = match.group("lhs").strip()
    op = match.group("op")
    rhs = match.group("rhs").strip()
    symbol = retards.get(op, op[0])
    return f"{lhs} = {lhs} {symbol} {rhs}"

def fix_compound_assignments(code_part: str) -> str:
    # repeatedly apply replacement until no more matches 
    prev = None
    while prev != code_part:
        prev = code_part
        code_part = compound_re.sub(compound_replacer, code_part)
    return code_part


def fix_backtick_strings(line):
    backtick_pattern = r'`([^`]*)`'

    def replacer(match):
        content = match.group(1)
        new_content = re.sub(r'\{([^}]+)\}', r'" .. tostring(\1) .. "', content)
        new_content = f'"{new_content}"'
        new_content = re.sub(r'"" \.\. ', '', new_content)
        new_content = re.sub(r' \.\. ""', '', new_content)
        return new_content

    return re.sub(backtick_pattern, replacer, line)

def fix_lua_line(line):
    # Fix template strings
    line = fix_backtick_strings(line)

    # Split comment part (if any)
    if "--" in line:
        code, comment = line.split("--", 1)
        code_fixed = fix_compound_assignments(code)
        line = code_fixed + "--" + comment
    else:
        line = fix_compound_assignments(line)

    # Apply keyword fixes
    for pattern, replacement in fixes.items():
        line = re.sub(pattern, replacement, line)

    return line


def fix_lua_file(input_file, output_file):
    with open(input_file, "r", encoding="utf-8") as f:
        lines = f.readlines()

    fixed_lines = [fix_lua_line(line) for line in lines]

    with open(output_file, "w", encoding="utf-8") as f:
        f.writelines(fixed_lines)

    print(f"Fixed Lua file saved as {output_file}")


if __name__ == "__main__":
    while True:
        input_file = input("Path: ").strip()
        if os.path.isfile(input_file):
            break
        print("File not found. Try again.")

    output_file = input("Output Path: ").strip()
    if output_file == "":
        output_file = "output.lua"

    fix_lua_file(input_file, output_file)
