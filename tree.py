import os

def generate_tree(startpath, ignore_dirs=None, ignore_files=None):
    if ignore_dirs is None:
        ignore_dirs = {'.git', '.github', '.vscode', '.astro', 'node_modules', '.history', 'dist'}
    if ignore_files is None:
        ignore_files = {'.DS_Store', '.gitignore', 'package-lock.json', 'pnpm-lock.yaml', 'tree.py'}
    
    def should_ignore(path, name):
        return (os.path.isdir(os.path.join(path, name)) and name in ignore_dirs) or \
               (os.path.isfile(os.path.join(path, name)) and name in ignore_files)

    tree_str = []
    for root, dirs, files in os.walk(startpath):
        # 过滤掉要忽略的目录和文件
        dirs[:] = [d for d in dirs if not should_ignore(root, d)]
        files = [f for f in files if not should_ignore(root, f)]
        
        level = root.replace(startpath, '').count(os.sep)
        indent = '│   ' * level
        tree_str.append(f'{indent}{os.path.basename(root)}/')
        
        for f in files:
            tree_str.append(f'{indent}│   {f}')
    
    return '\n'.join(tree_str)

if __name__ == '__main__':
    print(generate_tree('.')) 