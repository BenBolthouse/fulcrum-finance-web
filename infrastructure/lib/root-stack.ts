import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {CertificatesStack} from './certificates-stack';
import {WebStack} from './web-stack';

export interface SiteStackConfig {
    certificatesStack: CertificatesStack;
}

export class SiteStack extends cdk.Stack {

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const certificatesStack = new CertificatesStack(this, 'CertificatesStack', {
            crossRegionReferences: true,
            env: {
                region: "us-east-1",
                account: "715914088149",
            },
        });

        const webStack = new WebStack(this, 'WebStack', {
            certificatesStack,
        }, {
            crossRegionReferences: true,
            env: {
                region: "us-west-1",
                account: "715914088149",
            },
        });
    }

}
