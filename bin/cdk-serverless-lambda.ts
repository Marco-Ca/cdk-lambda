#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { CdkServerlessLambdaStack } from '../lib/cdk-serverless-lambda-stack';

const app = new cdk.App();
new CdkServerlessLambdaStack(app, 'CdkServerlessLambdaStack');
