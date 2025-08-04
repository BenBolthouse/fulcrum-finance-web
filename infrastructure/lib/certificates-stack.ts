import * as cdk from 'aws-cdk-lib';
import * as certificatemanager from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
import {Construct} from 'constructs';

export class CertificatesStack extends cdk.Stack {

    public readonly fulcrumFinanceSiteCertificate: certificatemanager.ICertificate;
    
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const environment = this.node.tryGetContext("@cforge/app-environment");

        if (!environment) {
            throw new Error("Environment context variable '@cforge/app-environment' is required.");
        }

        this.fulcrumFinanceSiteCertificate = new certificatemanager.Certificate(this, "fulcrum_finance_benbolt_house_Certificate", {
            domainName: environment !== "prod"
                ? `fulcrum-finance.${environment}.benbolt.house`
                : "fulcrum-finance.benbolt.house",
            validation: {
                method: certificatemanager.ValidationMethod.DNS,
                props: {
                    hostedZone: route53.HostedZone.fromLookup(this, "benbolt_house_HostedZone", {
                        domainName: "benbolt.house",
                    }),
                },
            },
        });
    }

}
