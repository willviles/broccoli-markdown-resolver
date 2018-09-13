/* eslint-env node */
'use strict';

const Plugin = require('broccoli-plugin');
const frontmatter = require('front-matter');
const mkdirp = require('mkdirp');
const fs = require('fs');
const path = require('path');

MarkdownResolver.prototype = Object.create(Plugin.prototype);
MarkdownResolver.prototype.constructor = MarkdownResolver;

function MarkdownResolver(inputNodes, options) {
  options = options || {};
  Plugin.call(this, inputNodes, options);
  this.options = options;
}

MarkdownResolver.prototype.readDirectory = function(srcPath, allFiles) {
  let files = fs.readdirSync(srcPath);

  return Array.prototype.reduce.call(files, (tree, file) => {
    let entry,
        fileExt = path.extname(file),
        fileName = file.replace(/\.[^/.]+$/, ''),
        relativePath = this.relativePath(path.join(srcPath, fileName)),
        isDirectory = fs.lstatSync(path.join(srcPath, file)).isDirectory();

    if (!isDirectory && fileExt !== '.md') { return [...tree]; }

    let index;

    let existingTreeNode = Array.prototype.find.call(tree, (file, i) => {
      index = i;
      return file.path === relativePath;
    });

    if (existingTreeNode) {
      entry = existingTreeNode;
    } else {
      entry = { path: relativePath };
    }

    if (isDirectory) {
      entry.children = this.readDirectory(path.join(srcPath, file), allFiles);
    } else {
      let content = fs.readFileSync(path.join(srcPath, file), { encoding: 'utf8' });
      content = frontmatter(content);
      entry.content = content.body;
      entry.attributes = content.attributes;
      allFiles.push(entry);
    }

    if (existingTreeNode) {
      tree[index] = entry;
    }

    return existingTreeNode ? [...tree] : [...tree, entry];

  }, []);
}

MarkdownResolver.prototype.readFile = function (srcPath, allFiles) {
  let content = fs.readFileSync(srcPath, { encoding: 'utf8' });
  content = frontmatter(content);
  let entry = { path: srcPath };
  entry.content = content.body;
  entry.attributes = content.attributes;
  allFiles.push(entry);
  return [entry];
}

MarkdownResolver.prototype.relativePath = function(srcDir) {
  let relPath = srcDir.replace(this.options.basePath, '');
  return relPath.replace(/^\/|\/$/g, '');
}

MarkdownResolver.prototype.build = function() {
  let output = { files: [] };

  output.trees = Array.prototype.reduce.call(this._inputNodes, (trees, srcDir) => {
    let isFile = fs.statSync(srcDir).isFile();
    trees[this.relativePath(srcDir)] = isFile ? this.readFile(srcDir, output.files) : this.readDirectory(srcDir, output.files);
    return trees;
  }, {});

  let outputBuffer = `
export let trees = ${JSON.stringify(output.trees, null, 2)};
export let files = ${JSON.stringify(output.files, null, 2)};
export default {
  trees, files
};
  `;

  mkdirp.sync(path.join(this.outputPath, path.dirname(this.options.outputFile)));
  fs.writeFileSync(path.join(this.outputPath, this.options.outputFile), outputBuffer);

};

module.exports = MarkdownResolver;
