#!/usr/bin/env bash
set -u
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SPEC_DIR="$(dirname "$SCRIPT_DIR")"
echo "Script: $0"
echo "SCRIPT_DIR: $SCRIPT_DIR"
echo "SPEC_DIR: $SPEC_DIR"
ls "$SPEC_DIR/src/"
