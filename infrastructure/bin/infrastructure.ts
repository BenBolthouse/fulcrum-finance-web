#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {SiteStack} from '../lib/root-stack';

const app = new cdk.App();

new SiteStack(app, 'SiteStack',
  {
    env: {
      region: "us-west-1",
      account: "715914088149",
    }
  }
);
