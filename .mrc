# ScholarHub Research Management Platform

## Release Configuration

version: 1.0.0
release_type: semantic
changelog_type: conventional

## Build Configuration

build:
  command: npm run build
  output: dist

## Dependencies

node_version: ">=18"
npm_version: ">=9"

## Features

- Research project management
- Note-taking with rich text editor
- Reference management
- File storage (PDF, DOCX, EPUB)
- Task and deadline tracking
- Dark/Light theme support

## Database

database:
  type: mysql
  version: ">=8.0"
  setup: npm run db:setup