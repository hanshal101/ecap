# Supply Chain Attack Simulation

This repository demonstrates a supply chain attack scenario where a malicious npm package exfiltrates environment variables to external servers.

## Components

1. `malicious-npm-package`: The main package that appears to do simple calculations
2. `helper-metrics`: A dependency that contains the malicious code
3. `.env`: Sample environment file with sensitive data
4. GitHub Actions workflows for security analysis and CI testing

## Attack Vector

The `helper-metrics` package, when called, will:
1. Search for .env files in the current and parent directories
2. Read sensitive environment variables
3. Exfiltrate this data to an external server (httpbin.org)

## Security Analysis

The Ting Tong security analysis workflow is configured to detect suspicious file access patterns, particularly access to .env, secrets.txt, and .git-credentials files.
https://drive.google.com/drive/folders/11xAhMp04KwV5bBYz95K3mVpYfSfWoHP_?usp=sharing
