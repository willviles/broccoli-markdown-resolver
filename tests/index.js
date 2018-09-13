'use strict';

import { expect } from 'chai';
import MarkdownResolver from '../index'
import fs from 'fs';
import path from 'path';

describe('MarkdownResolver', function () {
  // inputNode is directory
  describe('should read directory path as input', function () {
    let filePath;

    before(function () {
      let pathList = ['tests/fixtures'];
      let markdown = new MarkdownResolver(pathList, {
        outputFile: 'tests/markdown-file-data.js'
      });
      markdown.outputPath = process.cwd();
      markdown.build();
      filePath = path.join(markdown.outputPath, 'tests/markdown-file-data.js');
    });

    after(function () {
      fs.unlinkSync(filePath);
    })

    it('should create files', function () {
      expect(fs.existsSync(filePath)).to.equal(true);
    });

    it('should match the file content in trees', function () {
      let { trees } = require(filePath);
      expect(trees['tests/fixtures'][0].path).to.equal('tests/fixtures/TEST_1');
      let content = fs.readFileSync('tests/fixtures/TEST_1.md', { encoding: 'utf8' });
      expect(trees['tests/fixtures'][0].content).to.equal(content);

      expect(trees['tests/fixtures'][1].path).to.equal('tests/fixtures/TEST_2');
      content = fs.readFileSync('tests/fixtures/TEST_2.md', { encoding: 'utf8' });
      expect(trees['tests/fixtures'][1].content).to.equal(content);
    });

    it('should match the file content in files', function () {
      let { files } = require(filePath);
      expect(files[0].path).to.equal('tests/fixtures/TEST_1');
      let content = fs.readFileSync('tests/fixtures/TEST_1.md', { encoding: 'utf8' });
      expect(files[0].content).to.equal(content);

      expect(files[1].path).to.equal('tests/fixtures/TEST_2');
      content = fs.readFileSync('tests/fixtures/TEST_2.md', { encoding: 'utf8' });
      expect(files[1].content).to.equal(content);
    });
  });
});
